import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const method = event.method

  try {
    switch (method) {
      case 'GET':
        const { data: categories, error: getError } = await supabase
          .from('categories')
          .select(`
            *,
            reviews (
              id,
              title,
              slug,
              rating,
              created_at
            )
          `)
        
        if (getError) throw getError
        return categories

      case 'POST':
        const body = await readBody(event)
        const { data: newCategory, error: postError } = await supabase
          .from('categories')
          .insert([body])
          .select()
        
        if (postError) throw postError
        return newCategory

      default:
        throw createError({
          statusCode: 405,
          message: 'Method not allowed'
        })
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message
    })
  }
}) 