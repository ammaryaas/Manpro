import Order from '#models/order_model'
import Product from '#models/product_model'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class DashboardController {
    async index({ view }: HttpContext) {
        const totalProduct = await Product.query().count('* as total')
        const countPr = Number(totalProduct[0].$extras.total)
        
        const totalOrder = await Order.query().count('* as total')
        const countOr = Number(totalOrder[0].$extras.total)

        const currentDate = DateTime.local().toFormat('yyyy-LL-dd')
        const todayOrder = await Order
            .query()
            .preload('product')
            .where('date', currentDate)

        let todayRevenue = 0
        todayOrder.forEach((item) => {
            todayRevenue += item.amount * item.product.price
        })

        return view.render('dashboard', { countPr, countOr, todayRevenue })
    }
}