import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Product from './product_model.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class StockLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare product_id: number

  @belongsTo(() => Product, {
    foreignKey: 'product_id'
  })
  declare product: BelongsTo <typeof Product> 

  @column()
  declare type: string

  @column()
  declare quantity: number

  @column()
  declare date: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}