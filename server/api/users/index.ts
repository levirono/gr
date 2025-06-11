import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const method = event.method

  try {
    switch (method) {
      case 'GET':
        const query = getQuery(event);
        if (query.user_id) {
          const { data: user, error: getError } = await supabase
            .from('users')
            .select('*')
            .eq('id', query.user_id)
            .limit(1);
          if (getError) throw getError;
          return user;
        } else {
          const { data: users, error: getError } = await supabase
            .from('users')
            .select('*');
          if (getError) throw getError;
          return users;
        }

      case 'POST':
        const body = await readBody(event)
        const { data: existing, error: findError } = await supabase
          .from('users')
          .select('id')
          .or(`id.eq.${body.id},email.eq.${body.email}`)
          .limit(1);
        if (findError) throw findError;
        if (existing && existing.length > 0) {
          return existing[0];
        }
        const { data: newUser, error: postError } = await supabase
          .from('users')
          .insert([body])
          .select();
        if (postError) throw postError;
        return newUser;

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