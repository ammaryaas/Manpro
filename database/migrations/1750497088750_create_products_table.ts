import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('description')
      table.integer('price')
      table.integer('stock')
      table.integer('category_id').unsigned().references('categories.id').onDelete('CASCADE')
      table.integer('supplier_id').unsigned().references('suppliers.id').onDelete('CASCADE')
      table.string('status')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}