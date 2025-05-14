import { supabase, handleDatabaseError } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { featured, limit, sort } = query

    let queryBuilder = supabase
      .from('reviews')
      .select(`
        *,
        category:categories(name),
        images:review_images(*),
        retailers(*)
      `)

    if (featured === 'true') {
      queryBuilder = queryBuilder.eq('is_featured', true)
    }

    if (sort === 'latest') {
      queryBuilder = queryBuilder.order('created_at', { ascending: false })
    }

    if (limit) {
      queryBuilder = queryBuilder.limit(Number(limit))
    }

    const { data, error } = await queryBuilder

    if (error) {
      return handleDatabaseError(error)
    }

    return { data }
  } catch (error) {
    console.error('Error fetching reviews:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching reviews'
    })
  }
}) 