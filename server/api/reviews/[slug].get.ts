import { supabase, handleDatabaseError } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const slug = event.context.params?.slug

    if (!slug) {
      throw createError({
        statusCode: 400,
        message: 'Slug is required'
      })
    }

    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        category:categories(name),
        images:review_images(*),
        retailers(*)
      `)
      .eq('slug', slug)
      .single()

    if (error) {
      return handleDatabaseError(error)
    }

    if (!data) {
      throw createError({
        statusCode: 404,
        message: 'Review not found'
      })
    }

    return { data }
  } catch (error) {
    console.error('Error fetching review:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching review'
    })
  }
}) 