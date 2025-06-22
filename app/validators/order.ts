import vine from '@vinejs/vine'

export const OrderValidator = vine.compile(
    vine.object({
        product_id: vine.number(),
        date: vine.date(),
        amount: vine.number(),
        status: vine.string()
    })
)