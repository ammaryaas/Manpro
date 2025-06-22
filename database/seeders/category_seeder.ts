import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category_model'

export default class category_seeder extends BaseSeeder {
  async run() {
    await Category.createMany([
      {
        category_name: 'Electronics',
        description: 'something zap and zap',
        category_status: 'active'
      },
      {
        category_name: 'Clothing',
        description: 'cover your body',
        category_status: 'active'
      },
      {
        category_name: 'Home & Garden',
        description: 'similiar like bricks and wall',
        category_status: 'inactive'
      },
      {
        category_name: 'Sports',
        description: 'going to be healthy',
        category_status: 'active'
      },
      {
        category_name: 'Beauty',
        description: 'got the minimum parameters of society standard',
        category_status: 'active'
      },
      {
        category_name: 'Toys',
        description: 'love your children',
        category_status: 'inactive'
      }
    ])
    // Write your database queries inside the run method
  }
}