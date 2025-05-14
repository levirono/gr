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
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      return handleDatabaseError(error)
    }

    if (!data) {
      throw createError({
        statusCode: 404,
        message: 'Blog post not found'
      })
    }

    // Ensure published_at is properly formatted if it exists
    if (data.published_at) {
      try {
        // Try to parse the date to ensure it's valid
        const dateObj = new Date(data.published_at)
        if (!isNaN(dateObj.getTime())) {
          // If valid, ensure it's in ISO format
          data.published_at = dateObj.toISOString()
        } else {
          console.warn('Invalid published_at date detected:', data.published_at)
          data.published_at = null
        }
      } catch (e) {
        console.error('Error parsing published_at:', e)
        data.published_at = null
      }
    }

    console.log('Fetched blog post data:', data);
    console.log('Published at field:', data.published_at);

    return { data }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching blog post'
    })
  }
})