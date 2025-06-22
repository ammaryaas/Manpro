/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import CategoriesController from '#controllers/categories_controller'
import OrdersController from '#controllers/orders_controller'
import ProductsController from '#controllers/products_controller'
import SuppliersController from '#controllers/suppliers_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import LogsController from '#controllers/logs_controller'

router.get('/', async (ctx) => {
    return ctx.view.render('home')
}).as('home')
router.on('/ex').render('contoh')

router.group(() => {
    router.get('/', [AuthController, 'show']).as('show')
    router.post('/login', [AuthController, 'login']).as('login')
})
.prefix('auth')
.as('auth')
.middleware(middleware.guest())


//Admin Route
router.group(() => {
    router.get('/', async (ctx) => {
        return ctx.view.render('dashboard')
    }).as('dashboard')

    router.post('/logout', [AuthController, 'logout']).as('logout')

    //Supplier Route
    router.group(() => {
        router.get('/', [SuppliersController, 'index']).as('index')
        router.get('/create', [SuppliersController, 'create']).as('create')
        router.post('/', [SuppliersController, 'store']).as('store')
        router.get('/:id/edit', [SuppliersController, 'edit']).as('edit')
        router.put('/:id', [SuppliersController, 'update']).as('update')
        router.delete('/:id/delete', [SuppliersController, 'destroy']).as('destroy')
    })
    .prefix('supplier')
    .as('supplier')

    //Product Route
    router.group(() => {
        router.get('/', [ProductsController, 'index']).as('index')
        router.get('/create', [ProductsController, 'create']).as('create')
        router.post('/', [ProductsController, 'store']).as('store')
        router.get('/:id/edit', [ProductsController, 'edit']).as('edit')
        router.post('/:id', [ProductsController, 'update']).as('update')
        router.delete('/:id/delete', [ProductsController, 'destroy']).as('destroy')
        router.patch('/restock/:id', [ProductsController, 'restock']).as('restock')
    })
    .prefix('product')
    .as('product')

    //Category Route
    router.group(() => {
        router.get('/', [CategoriesController, 'index']).as('index')
        router.get('/create', [CategoriesController, 'create']).as('create')
        router.post('/', [CategoriesController, 'store']).as('store')
        router.get('/:id/edit', [CategoriesController, 'edit']).as('edit')
        router.put('/:id', [CategoriesController, 'update']).as('update')
        router.delete('/:id/delete', [CategoriesController, 'destroy']).as('destroy')
    })
    .prefix('category')
    .as('category')

    //Order Route
    router.group(() => {
        router.get('/', [OrdersController, 'index']).as('index')
        router.get('/create', [OrdersController, 'create']).as('create')
        router.post('/', [OrdersController, 'store']).as('store')
        router.get('/:id/edit', [OrdersController, 'edit']).as('edit')
        router.put('/:id', [OrdersController, 'update']).as('update')
        router.delete('/:id/delete', [OrdersController, 'destroy']).as('destroy')
    })
    .prefix('order')
    .as('order')

    //Logs Route
    router.group(() => {
        router.get('/', [LogsController, 'index']).as('index')
    })
    .prefix('log')
    .as('log')
})
.prefix('admin')
.as('admin')
.middleware(middleware.auth())
