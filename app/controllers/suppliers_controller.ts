import Supplier from '#models/supplier_model'
import { SupplierValidator } from '#validators/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class SuppliersController {
    async index({ view }: HttpContext) {
        const supplier = await Supplier.all()
        return view.render('supplier/index', { supplier })
    }

    async create({ view }: HttpContext) {
        return view.render('supplier/create')
    }

    async store({ response, request, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(SupplierValidator)
            await Supplier.create(payload)
            session.flash('notification', {
                type: 'success',
                message: 'Supplier has been added!'
            })
            return response.redirect().toRoute('admin.supplier.index')
        }
        catch (error) {
            if (error.messages) {
                session.flash('errors', error.messages)
                session.flash('old', request.all())
            }
            return response.redirect().back()
        }
    }

    async edit({ params, view }: HttpContext) {
        const supplier = await Supplier.findByOrFail('id', params.id)
        return view.render('supplier/edit', { supplier })
    }

    async update({ params, response, request, session }: HttpContext) {
        try {
            const supplier = await Supplier.findByOrFail('id', params.id)
            const payload = await request.validateUsing(SupplierValidator)
            await supplier.merge(payload).save()
            session.flash('notification', {
                type: 'success',
                message: 'supplier has been update!'
            })
            return response.redirect().toRoute('admin.supplier.index')
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
            const supplier = await Supplier.findOrFail(params.id)
            await supplier.delete()
            session.flash('notification', {
                type: 'success',
                message: 'supplier has been deleted!'
            })
            return response.redirect().toRoute('admin.supplier.index')
        } catch (error) {
            session.flash('notification', {
                type: 'success',
                message: 'Failed to delete data!'
            })
            return response.redirect().back()
        }
    }
}