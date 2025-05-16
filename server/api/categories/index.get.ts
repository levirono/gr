import { supabase, handleDatabaseError } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name')

    if (error) {
      return handleDatabaseError(error)
    }

    console.log('Fetched categories:', data);

    return { data }
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching categories'
    })
  }
})