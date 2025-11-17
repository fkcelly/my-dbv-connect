import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  const menu = [
    { label: "Perfil", path: "/perfil" },
    { label: "Progresso", path: "/progresso" },
    { label: "Especialidades", path: "/especialidades" },
    { label: "Ano Bíblico", path: "/ano-biblico" },
    { label: "Devocional", path: "/devocional" },
    { label: "Mural", path: "/mural" }, 
    { label: "Eventos", path: "/eventos" },
    { label: "Configurações", path: "/configuracoes" },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen bg-blue-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">DBV Connect</h1>

      <nav className="flex-1">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block p-2 rounded mb-2 transition ${
              router.pathname === item.path
                ? "bg-blue-600 font-semibold"
                : "hover:bg-blue-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 p-2 rounded hover:bg-red-700"
      >
        Sair
      </button>
    </aside>
  );
}
