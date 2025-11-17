import DashboardLayout from "src/components/layout/DashboardLayout";
import { useState } from "react";

// Estrutura simples baseada no Ano Bíblico dos Desbravadores
const anoBiblico = {
  Janeiro: [
    { dia: 1, leitura: "Gênesis 1 • Mateus 1 • Salmo 1" },
    { dia: 2, leitura: "Gênesis 2 • Mateus 2 • Salmo 2" },
    { dia: 3, leitura: "Gênesis 3 • Mateus 3 • Salmo 3" },
    { dia: 4, leitura: "Gênesis 4 • Mateus 4 • Provérbios 1" },
    { dia: 5, leitura: "Gênesis 5 • Mateus 5 • Salmo 4" },
  ],
  Fevereiro: [
    { dia: 1, leitura: "Êxodo 1 • Marcos 1 • Salmo 10" },
    { dia: 2, leitura: "Êxodo 2 • Marcos 2 • Salmo 11" },
    { dia: 3, leitura: "Êxodo 3 • Marcos 3 • Provérbios 2" },
  ],
  Março: [
    { dia: 1, leitura: "Levítico 1 • Lucas 1 • Salmo 20" },
    { dia: 2, leitura: "Levítico 2 • Lucas 2 • Salmo 21" },
  ],
};

export default function AnoBiblicoPage() {
  const [concluidos, setConcluidos] = useState<{ [key: string]: boolean }>({});

  function toggle(diaKey: string) {
    setConcluidos((prev) => ({
      ...prev,
      [diaKey]: !prev[diaKey],
    }));
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-blue-900 mb-3">
        Ano Bíblico dos Desbravadores
      </h1>
      <p className="text-gray-600 mb-6">
        Acompanhe sua leitura diária da Bíblia seguindo o plano oficial dos
        Desbravadores.
      </p>

      <div className="space-y-10">
        {Object.entries(anoBiblico).map(([mes, dias]) => (
          <div key={mes}>
            <h2 className="text-xl font-bold text-blue-800 mb-3">{mes}</h2>

            <div className="bg-white rounded shadow p-5">
              {dias.map((item) => {
                const key = `${mes}-${item.dia}`;
                return (
                  <div
                    key={key}
                    className="flex justify-between items-center border-b py-3 last:border-none"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        Dia {item.dia}
                      </p>
                      <p className="text-gray-600">{item.leitura}</p>
                    </div>

                    <button
                      onClick={() => toggle(key)}
                      className={`px-4 py-2 rounded text-white ${
                        concluidos[key] ? "bg-green-600" : "bg-blue-600"
                      }`}
                    >
                      {concluidos[key] ? "Concluído ✔" : "Marcar"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
