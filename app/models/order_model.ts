import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Product from './product_model.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare product_id: number

  @belongsTo(() => Product, {
    foreignKey: 'product_id'
  })
  declare product: BelongsTo <typeof Product> 

  @column()
  declare amount: number

  @column()
  declare date: Date

  @column()
  declare status: String

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}