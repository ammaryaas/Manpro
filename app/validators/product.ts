import vine from '@vinejs/vine'

export const ProductValidator = vine.compile(
    vine.object({
        name: vine.string().trim().maxLength(50),
        description: vine.string().trim(),
        price: vine.number().positive().withoutDecimals(),
        stock: vine.number().positive().withoutDecimals(),
        category_id: vine.number(),
        supplier_id: vine.number(),
        status: vine.string()
    })
)