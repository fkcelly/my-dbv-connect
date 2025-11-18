import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const menu = [
    { name: "Perfil", path: "/perfil" },
    { name: "Progresso", path: "/progresso" },
    { name: "Especialidades", path: "/especialidades" },
    { name: "Devocional", path: "/devocional" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  const logout = () => {
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* MENU LATERAL */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800">DBV Connect</h2>
            <p className="text-sm text-gray-500">Painel do usuário</p>
          </div>

          {/* Opções do menu */}
          <nav className="space-y-2">
            {menu.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-4 py-2 rounded-lg font-medium transition
                  ${
                    router.pathname === item.path
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-6 bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sair
        </button>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
