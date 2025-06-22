import Product from '#models/product_model'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'egg',
        description: "watchout! it's fragile",
        price: 30,
        stock: 10,
        status: 'active'
      }
    ])
    // Write your database queries inside the run method
  }
}