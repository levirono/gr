import { supabase, handleDatabaseError } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const offset = (page - 1) * limit

    // Build query
    let queryBuilder = supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .order('published_at', { ascending: false })

    // Only show published posts unless explicitly requested
    if (query.show_all !== 'true') {
      queryBuilder = queryBuilder.eq('is_published', true)
    }

    // Add pagination
    queryBuilder = queryBuilder.range(offset, offset + limit - 1)

    // Execute query
    const { data, error, count } = await queryBuilder

    if (error) {
      return handleDatabaseError(error)
    }

    return {
      data,
      pagination: {
        total: count,
        page,
        limit,
        total_pages: Math.ceil((count || 0) / limit)
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching blog posts'
    })
  }
}) 