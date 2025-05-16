import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const method = event.method
  const query = getQuery(event)

  try {
    switch (method) {
      case 'GET':
        let queryBuilder = supabase
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

        // Apply filters
        if (query.category) {
          queryBuilder = queryBuilder.eq('category_id', query.category)
        }

        if (query.featured) {
          queryBuilder = queryBuilder.eq('is_featured', true)
        }

        // Apply sorting
        if (query.sort) {
          switch (query.sort) {
            case 'latest':
              queryBuilder = queryBuilder.order('created_at', { ascending: false })
              break
            case 'rating':
              queryBuilder = queryBuilder.order('rating', { ascending: false })
              break
            // Add more sorting options as needed
          }
        }

        // Apply pagination
        const page = Number(query.page) || 1
        const limit = Number(query.limit) || 10
        const start = (page - 1) * limit
        const end = start + limit - 1

        queryBuilder = queryBuilder.range(start, end)

        const { data: reviews, error: getError } = await queryBuilder

        if (getError) throw getError
        return reviews

      case 'POST':
        const body = await readBody(event)
        console.log('Received body:', body);
        const { data: newReview, error: postError } = await supabase
          .from('reviews')
          .insert([body])
          .select()
        
        if (postError) {
          console.error('Error inserting review:', postError);
          throw postError
        }
        return newReview

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