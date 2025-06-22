import Category from '#models/category_model'
import Product from '#models/product_model'
import StockLog from '#models/stock_log'
import Supplier from '#models/supplier_model'
import { ProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
    async index({ view }: HttpContext) {
        const product = await Product.query().preload('category').preload('supplier')
        const category = await Category.all()
        return view.render('product/index', { product, category })
    }

    async create({ view }: HttpContext) {
        const category = await Category.query()
        const supplier = await Supplier.query()
        return view.render('product/create', { category, supplier })
    }

    async store({ response, request, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(ProductValidator)
            await Product.create(payload)
            session.flash('success', 'Data has been added!')
            return response.redirect().toRoute('admin.product.index')
        }
        catch (error) {
            if (error.messages) {
                session.flash('error', error.messages)
                session.flash('old', request.all())
            }
            return response.redirect().back()
        }
    }

    async edit({ params, view }: HttpContext) {
        const product = await Product.findByOrFail('id', params.id)
        const category = await Category.all()
        const supplier = await Supplier.all()
        return view.render('product/edit', { product, category, supplier })
    }

    async update({ params, response, request, session }: HttpContext) {
        try {
            const product = await Product.findByOrFail('id', params.id)
            const payload = await request.validateUsing(ProductValidator)
            await product.merge(payload).save()
            session.flash('notification', {
                type: 'success',
                message: 'product has been update!'
            })
            return response.redirect().toRoute('admin.product.index')
        } catch (error) {
            if (error.messages) {
                session.flash('error', error.messages)
                session.flash('old', request.all())
            }
            return response.redirect().back()
        }
    }

    async destroy({ params, response, session }: HttpContext) {
        try {
            const product = await Product.findOrFail(params.id)
            await product.delete()
            session.flash('notification', {
                type: 'success',
                message: 'Product has been deleted!'
            })
            return response.redirect().toRoute('admin.product.index')
        } catch (error) {
            session.flash('notification', {
                type: 'error',
                message: 'Failed to delete data!'
            })
            return response.redirect().back()
        }
    }

    async restock({ params, response, request, session }: HttpContext) {
        try {
            const id = params.id
            const product = await Product.findOrFail(id)
            const qty = Number(request.input('quantity'))
            product.stock += qty
            await product.save()
            await StockLog.create({
                product_id: product.id,
                type: 'Inbound',
                quantity: qty,
                date: product.updatedAt.toJSDate()
            })
            session.flash('success', 'Restock data has been added')
            return response.redirect().toRoute('admin.product.index')
        } catch (error) {
            if (error.messages) {
                session.flash('errors', error.messages)
                session.flash('old', request.all())
            }
            return response.redirect().back()
        }
    }

}
