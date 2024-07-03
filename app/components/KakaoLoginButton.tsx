"use client";

import React, { useEffect, useState } from "react";
import { signInKakao } from "../../utils/auth";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/client/supabaseClient";
import useHydrate from "@/hooks/useHydrate";

const KakaoLoginButton = () => {
  // const handleLogin = async () => {
  //   const { data } = await signInKakao();
  // };
  const [name, setName] = useState(false);
  const isMount = useHydrate();
  const getUserInfo = async () => {
    const result = await supabase.auth.getUser();
    const name = result.data.user?.user_metadata.name;
    setName(name);
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  if (!isMount) return null;
  return (
    //<button onClick={handleLogin}>카카오톡으로 로그인</button>;
    <div className="mx-auto max-w-[500px]">
      <div className="text-center text-2xl font-bold">PrayU</div>
      {name && <div className="text-center text-xl mt-4">Hello {name}</div>}
      <Auth
        redirectTo="process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO"
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        onlyThirdPartyProviders
        providers={["kakao"]}
      />
    </div>
  );
};

export default KakaoLoginButton;
