"use client";

import React, { useEffect, useState } from "react";
import { signInKakao } from "../../utils/auth";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/client/supabaseClient";
import useHydrate from "@/hooks/useHydrate";
import { User } from "@supabase/supabase-js";

const KakaoLoginButton = () => {
  // const handleLogin = async () => {
  //   const { data } = await signInKakao();
  // };
  // const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState(false);
  const isMount = useHydrate();

  const getUserInfo = async () => {
    const result = await supabase.auth.getUser();
    const name = result.data.user?.user_metadata.name;
    // name 이 아니라 user을 받아야 하는데 DataType을 추가해줘야 하는듯
    //if (result?.data?.user) setUser(result?.data?.user);
    //name으로 했는데 user로 해야 진짜 logout이 됐는지 알 수 있음
    if (name) setName(name);
  };

  const handleLogout = async () => {
    supabase.auth.signOut();
    setName(false);
    window.location.reload();
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!isMount) return null;

  return (
    //<button onClick={handleLogin}>카카오톡으로 로그인</button>;
    <div className="mx-auto max-w-[500px]">
      <div className="text-center text-2xl font-bold">PrayU</div>
      {name && (
        <div className="text-center text-xl mt-4">
          Hello {name}
          <button onClick={handleLogout} className="border-2 border-black ml-4">
            Logout
          </button>
        </div>
      )}
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
