import Order from '#models/order_model'
import Product from '#models/product_model'
import StockLog from '#models/stock_log'
import { OrderValidator } from '#validators/order'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
    async index({ view }: HttpContext) {
        const order = await Order.query().preload('product')
        return view.render('order/index', { order })
    }

    async create({ view }: HttpContext) {
        const product = await Product.query()
        return view.render('order/create', { product })
    }

    async store({ response, request, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(OrderValidator)
            var product = await Product.findByOrFail('id', payload.product_id)

            if (product.stock > payload.amount) {
                product.stock -= payload.amount
                await product.save()
                await Order.create(payload)
                await StockLog.create({
                    product_id: product.id,
                    type: 'Outbound',
                    quantity: payload.amount,
                    date: product.updatedAt.toJSDate()
                })
                session.flash('success', 'Order has been added')
                return response.redirect().toRoute('admin.order.index')
            } else {
                session.flash('error', 'Failed to store data')
            }
        }
        catch (error) {
            session.flash('error', error.message || 'Failed to store data')
            session.flash('old', request.all())
            return response.redirect().back()
        }
    }


    async edit({ params, view }: HttpContext) {
        const order = await Order.findByOrFail('id', params.id)
        const product = await Product.all()
        return view.render('order/edit', { product, order })
    }

    async update({ params, response, request, session }: HttpContext) {
        try {
            const order = await Order.findByOrFail('id', params.id)
            const payload = await request.validateUsing(OrderValidator)
            await order.merge(payload).save()
            session.flash('notification', {
                type: 'success',
                message: 'product has been update!'
            })
            return response.redirect().toRoute('admin.order.index')
        } catch (error) {
            if (error.messages) {
                session.flash('errors', error.messages)
                session.flash('old', request.all())
            }
            return response.redirect().back()
        }
    }

    async destroy({ params, response, session }: HttpContext) {
        try {
            const order = await Order.findOrFail(params.id)
            await order.delete()
            session.flash('notification', {
                type: 'success',
                message: 'Product has been deleted!'
            })
            return response.redirect().toRoute('admin.order.index')
        } catch (error) {
            session.flash('notification', {
                type: 'error',
                message: 'Failed to delete data!'
            })
            return response.redirect().back()
        }
    }
}