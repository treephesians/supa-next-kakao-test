import { supabase } from "../lib/client/supabaseClient";

export const signInKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `https://sjyhlobonjgjdnnewphk.supabase.co/auth/v1/callback`,
    },
  });

  if (error) {
    console.error("Error logging in with Kakao:", error.message);
    return { error };
  }

  console.log("Logged in with Kakao:", data);
  return { data };
};
