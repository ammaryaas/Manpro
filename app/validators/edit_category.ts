import vine from '@vinejs/vine'

export const editCategoryValidator = vine.compile(
    vine.object({
        category_name: vine.string().minLength(5).trim(),
        description: vine.string().maxLength(50),
        category_status: vine.string().optional()
    })
)