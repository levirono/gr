import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const method = event.method
  const slug = event.context.params?.slug

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug is required'
    })
  }

  try {
    switch (method) {
      case 'GET':
        const { data: review, error: getError } = await supabase
          .from('reviews')
          .select(`
            *,
            categories (
              name,
              slug
            ),
            users (
              email
            ),
            review_images (
              cloudinary_url,
              section
            ),
            retailers (
              name,
              price,
              link
            )
          `)
          .eq('slug', slug)
          .single()
        
        if (getError) throw getError
        if (!review) {
          throw createError({
            statusCode: 404,
            message: 'Review not found'
          })
        }
        return review

      case 'PUT':
        const body = await readBody(event)
        const { data: updatedReview, error: putError } = await supabase
          .from('reviews')
          .update(body)
          .eq('slug', slug)
          .select()
          .single()
        
        if (putError) throw putError
        return updatedReview

      case 'DELETE':
        const { error: deleteError } = await supabase
          .from('reviews')
          .delete()
          .eq('slug', slug)
        
        if (deleteError) throw deleteError
        return { message: 'Review deleted successfully' }

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