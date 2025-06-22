import vine from '@vinejs/vine'

export const SupplierValidator = vine.compile (
    vine.object({
        name: vine.string().trim(),
        address: vine.string(),
        phone: vine.string().trim(),
        status: vine.string()
    })
)