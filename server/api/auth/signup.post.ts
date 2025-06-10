import { supabase, handleDatabaseError } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  if (event.req.method !== 'POST') {
    return { error: 'Method not allowed' };
  }
  const body = await readBody(event);
  const { email, password, username } = body;
  try {
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });
    if (error) return { error: error.message };

    // Save user in custom users table with role 'user'
    if (data && data.user) {
      await supabase.from('users').insert([
        {
          id: data.user.id,
          email: data.user.email,
          username: username,
          role: 'user'
        }
      ]);
    }
    return { user: data.user };
  } catch (error) {
    handleDatabaseError(error);
  }
});
