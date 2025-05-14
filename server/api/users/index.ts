import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const method = event.method

  try {
    switch (method) {
      case 'GET':
        const { data: users, error: getError } = await supabase
          .from('users')
          .select('*')
        
        if (getError) throw getError
        return users

      case 'POST':
        const body = await readBody(event)
        const { data: newUser, error: postError } = await supabase
          .from('users')
          .insert([body])
          .select()
        
        if (postError) throw postError
        return newUser

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