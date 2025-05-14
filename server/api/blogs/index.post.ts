import { supabase, handleDatabaseError } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Validate required fields
    if (!body.title || !body.content || !body.author) {
      throw createError({
        statusCode: 400,
        message: 'Title, content, and author are required'
      })
    }

    // Always ensure we have a valid published_at date
    let publishedAt = null
    
    if (body.is_published) {
      // If publishing now, use current date/time
      publishedAt = new Date().toISOString()
    } else if (body.published_at) {
      // If scheduled for future publishing, validate the date
      const publishDate = new Date(body.published_at)
      if (isNaN(publishDate.getTime())) {
        throw createError({
          statusCode: 400,
          message: 'Invalid published_at date format'
        })
      }
      publishedAt = publishDate.toISOString()
    }

    // Check if slug already exists
    const { data: existingBlog } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', body.slug)
      .single()

    if (existingBlog) {
      throw createError({
        statusCode: 400,
        message: 'A blog post with this title already exists'
      })
    }

    // Insert blog post
    const { data, error } = await supabase
      .from('blogs')
      .insert({
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        featured_image_url: body.featured_image_url,
        featured_image_public_id: body.featured_image_public_id,
        author: body.author,
        is_published: body.is_published,
        published_at: publishedAt
      })
      .select()
      .single()

    if (error) {
      return handleDatabaseError(error)
    }

    return data
  } catch (error) {
    console.error('Error creating blog post:', error)
    throw createError({
      statusCode: 500,
      message: 'Error creating blog post'
    })
  }
})