import Image from "next/image";
import KakaoLoginButton from "./components/KakaoLoginButton";

export default function Home() {
  return (
    <div>
      <h1>카카오톡 로그인</h1>
      <KakaoLoginButton />
    </div>
  );
}
