import { LoginForm } from "@/components/LoginForm";

export default function HomePage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
        <LoginForm />
      <div className="hidden md:flex items-center justify-center">
        <h3>Aquí va la imagen</h3>
      </div>
    </div>
  );
}

