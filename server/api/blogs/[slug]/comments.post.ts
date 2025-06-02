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

    // Get blog ID from slug
    const { data: blog, error: blogError } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single()

    if (blogError) {
      return handleDatabaseError(blogError)
    }

    if (!blog) {
      throw createError({
        statusCode: 404,
        message: 'Blog not found'
      })
    }

    // Insert comment into blog_comments table
    const { data, error } = await supabase
      .from('blog_comments')
      .insert({
        blog_id: blog.id,
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
