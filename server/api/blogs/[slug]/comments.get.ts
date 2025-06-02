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

    // Get comments from blog_comments table
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('blog_id', blog.id)
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
