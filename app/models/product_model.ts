import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Category from './category_model.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Supplier from './supplier_model.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare stock: number

  @column()
  declare category_id: number

  @belongsTo(() => Category, {
    foreignKey: 'category_id',
  })
  declare category: BelongsTo<typeof Category>

  @column()
  declare supplier_id: number

  @belongsTo(() => Supplier, {
    foreignKey: 'supplier_id'
  })
  declare supplier: BelongsTo<typeof Supplier>

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Product, {
    foreignKey: 'product_id'
  })
  declare product: HasMany <typeof Product>

}