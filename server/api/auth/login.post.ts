import { supabase, handleDatabaseError } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  if (event.req.method !== 'POST') {
    return { error: 'Method not allowed' };
  }
  const body = await readBody(event);
  const { email, password, username } = body;
  try {
    // Sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { user: data.user, session: data.session };
  } catch (error) {
    handleDatabaseError(error);
  }
});
