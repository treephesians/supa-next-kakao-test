"use client";
import React from "react";
import { supabase } from "../../lib/client/supabaseClient";

const KakaoLoginButton: React.FC = () => {
  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `https://sjyhlobonjgjdnnewphk.supabase.co/auth/v1/callback`,
      },
    });

    if (error) {
      console.error("Error logging in with Kakao:", error.message);
    } else {
      console.log("Logged in with Kakao:", data);
    }
  };

  return <button onClick={signInWithKakao}>카카오톡으로 로그인</button>;
};

export default KakaoLoginButton;
