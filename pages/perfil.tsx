// pages/perfil.tsx
import { useEffect, useState } from "react";

export default function PerfilPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-2">Seu Perfil</h1>

      {user ? (
        <p className="text-xl">Bem-vinda, {user.name}! 🌿✨</p>
      ) : (
        <p>Carregando...</p>
      )}
    </main>
  );
}
