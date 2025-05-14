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

    // Get review ID from slug
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .select('id')
      .eq('slug', slug)
      .single()

    if (reviewError) {
      return handleDatabaseError(reviewError)
    }

    if (!review) {
      throw createError({
        statusCode: 404,
        message: 'Review not found'
      })
    }

    // Get comments
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('review_id', review.id)
      .order('created_at', { ascending: false })

    if (error) {
      return handleDatabaseError(error)
    }

    return { data }
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching comments'
    })
  }
}) 