import Sidebar from "./Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* MENU LATERAL */}
      <Sidebar />

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col">

        {/* CABEÇALHO BRANCO */}
        <header className="w-full bg-white shadow-sm p-4 flex items-center justify-between">
          
          {/* Logo Desbravadores */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo-desbravadores.png"
              alt="Desbravadores"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold text-blue-900">DBV Connect</h1>
          </div>

          {/* Perfil */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
              M
            </div>
            <span className="font-semibold">Marcelly</span>
          </div>
        </header>

        {/* CONTEÚDO */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
