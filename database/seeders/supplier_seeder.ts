import Supplier from '#models/supplier_model'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Supplier.createMany([
      {
        name: 'Aliee',
        address: 'Garut',
        phone: '0833674578',
        status: 'inactive'
      },
      {
        name: 'Darrell',
        address: 'Bogor',
        phone: '08785566436',
        status: 'active'
      }
    ])
    // Write your database queries inside the run method
  }
}