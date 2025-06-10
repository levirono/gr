import { ref } from 'vue';
import { useState } from '#app';

export const useAuth = () => {
  // Use Nuxt's useState for SSR-friendly global state
  const user = useState('user', () => ref(null));

  const setUser = (userInfo: any) => {
    user.value = userInfo;
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    setUser,
    logout,
  };
};
