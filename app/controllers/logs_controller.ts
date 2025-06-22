import StockLog from '#models/stock_log'
import type { HttpContext } from '@adonisjs/core/http'

export default class LogsController {
    async index({ view }: HttpContext) {
        const logs = await StockLog.query().preload('product')
        return view.render('stock_log', { logs })
    }
}