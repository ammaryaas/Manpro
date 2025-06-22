import vine from '@vinejs/vine'

export const creataCategoryValidator = vine.compile(
  vine.object({
    category_name: vine.string().minLength(3).maxLength(50),
    description: vine.string(),
    category_status: vine.string().optional(),
  })
)
