import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Admin Ganteng',
        email: 'admin@gmail.com',
        password: 'password'
      },
      {
        fullName: 'Admin Kurus',
        email: 'admin@unpad.com',
        password: 'password'
      }
    ])
  }
}