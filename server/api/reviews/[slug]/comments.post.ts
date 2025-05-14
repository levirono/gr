import { supabase, handleDatabaseError } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const slug = event.context.params?.slug
    const body = await readBody(event)

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

    // Insert comment
    const { data, error } = await supabase
      .from('comments')
      .insert({
        review_id: review.id,
        name: body.name,
        email: body.email,
        content: body.content
      })
      .select()
      .single()

    if (error) {
      return handleDatabaseError(error)
    }

    return data
  } catch (error) {
    console.error('Error posting comment:', error)
    throw createError({
      statusCode: 500,
      message: 'Error posting comment'
    })
  }
}) 