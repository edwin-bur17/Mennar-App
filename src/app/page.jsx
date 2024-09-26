import LoginForm from "@/components/LoginForm"
import Image from "next/image";

export const metadata = {
  title: "Mennar - Iniciar sesión"
};

export default function HomePage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
        <LoginForm />
      <div className="hidden md:flex items-center justify-center relative">
        <Image
          src="/image.png"
          alt="Imagen de login"
          width={650}
          height={0}
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
}