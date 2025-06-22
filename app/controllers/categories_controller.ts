import { type HttpContext } from '@adonisjs/core/http'
import Category from '#models/category_model'
import { creataCategoryValidator } from '#validators/create_category'
import { editCategoryValidator } from '#validators/edit_category'

export default class CategoriesController {
    async index({ request, view }: HttpContext) {
        const search = request.input('search', '')
        const page = request.input('page', 1)
        const limit = 10
        const category = await Category.query().
            if(search, (query) => {
                query.where('nama_jenis_buku', 'like', `%${search}%`)
                    .orWhere('keterangan', 'like', `%${search}%`)
            })
            .paginate(page, limit)
        return view.render('category/index', { category, search })
    }

    async create({ view }: HttpContext) {
        return view.render('category/create')
    }

    async store({ request, response, session }: HttpContext) {         
        try {             
            const payload = await request.validateUsing(creataCategoryValidator)            
            await Category.create({
                category_name: payload.category_name,
                description: payload.description,
                category_status: payload.category_status ?? 'inactive'            
            }) 
            session.flash('success','Category has been added')             
            return response.redirect().toRoute('admin.category.index')         
        } catch (error) {             
            if (error.messages) {                 
                session.flash('errors', error.messages)                 
                session.flash('old', request.all())             
            }             
            return response.redirect().back()         
        }     
    }
    
    async edit({ params, view }: HttpContext) {         
        const category = await Category.findOrFail(params.id)         
        return view.render('category/edit', { category })     
    } 

    async update({ params, request, response, session }: HttpContext) {         
        try {             
            const category = await Category.findOrFail(params.id)             
            const payload = await request.validateUsing(editCategoryValidator)             
            await category.merge(payload).save()             
            session.flash('success', 'Category has been updated')             
            return response.redirect().toRoute('admin.category.index')         
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
            const category = await Category.findOrFail(params.id)             
            await category.delete()             
            session.flash('notification', {                 
                type: 'success',                 
                message: 'Category has been deleted!'             
            })             
            return response.redirect().toRoute('admin.category.index')         
        } catch (error) {             
            session.flash('notification', {                 
                type: 'error',                 
                message: 'Failed to delete category!'             
            })             
            return response.redirect().back()         
        }     
    }
}