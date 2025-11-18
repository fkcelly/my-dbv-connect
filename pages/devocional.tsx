"use client";

import { useEffect, useState } from "react";

export default function DevocionalPage() {
  const [dias, setDias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    try {
      const res = await fetch("/api/devocional/status");
      const data = await res.json();
      setDias(data.dias || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const toggle = async (date: string) => {
    await fetch("/api/devocional/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date }),
    });
    loadStatus();
  };

  useEffect(() => {
    loadStatus();
  }, []);

  if (loading) return <p className="text-center mt-6">Carregando...</p>;

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Ano Bíblico — Devocional
      </h1>

      <div className="space-y-4">
        {dias.map((dia) => (
          <div
            key={dia.date}
            className="flex items-center justify-between bg-white border border-gray-200 shadow-sm p-4 rounded-xl"
          >
            <div>
              <p className="text-gray-700 font-medium">{dia.date}</p>
              <p className="text-sm text-gray-500">Leitura do dia</p>
            </div>

            <button
              onClick={() => toggle(dia.date)}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-all
                ${dia.done
                  ? "bg-green-500 hover:bg-green-600 shadow"
                  : "bg-gray-400 hover:bg-gray-500"}
              `}
            >
              {dia.done ? "✔ Feito" : "Marcar"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
