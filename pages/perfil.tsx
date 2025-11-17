import DashboardLayout from "src/components/layout/DashboardLayout";
import { useEffect, useState } from "react";

export default function PerfilPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user);
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold text-blue-900">
        Bem-vinda, {user?.name}!
      </h2>
      <p className="text-gray-600 mb-6">Painel geral do seu progresso</p>

      {/* CARDS PRINCIPAIS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded shadow hover:shadow-md transition cursor-pointer border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-blue-900">Progresso das Classes</h3>
          <p className="text-gray-500 mt-2">Veja seu andamento nas classes regulares.</p>
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-md transition cursor-pointer border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold text-blue-900">Especialidades</h3>
          <p className="text-gray-500 mt-2">Gerencie suas especialidades concluídas.</p>
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-md transition cursor-pointer border-l-4 border-green-600">
          <h3 className="text-lg font-semibold text-blue-900">Leitura Bíblica</h3>
          <p className="text-gray-500 mt-2">Acompanhe seu progresso espiritual diário.</p>
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-md transition cursor-pointer border-l-4 border-red-600">
          <h3 className="text-lg font-semibold text-blue-900">Mural</h3>
          <p className="text-gray-500 mt-2">Veja as interações e postagens do clube.</p>
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-md transition cursor-pointer border-l-4 border-purple-600">
          <h3 className="text-lg font-semibold text-blue-900">Versículo do Dia</h3>
          <p className="text-gray-500 mt-2">Uma mensagem especial para hoje.</p>
        </div>

      </div>
    </DashboardLayout>
  );
}
