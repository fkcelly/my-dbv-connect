"use client";

import DashboardLayout from "src/components/layout/DashboardLayout";
import { useEffect, useState } from "react";

export default function DevocionalPage() {
  const [done, setDone] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const loadStatus = async () => {
    const res = await fetch(`/api/devocional/status?date=${today}`);
    const data = await res.json();
    setDone(data.done);
  };

  const markDone = async () => {
    await fetch("/api/devocional/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: today }),
    });
    loadStatus();
  };

  useEffect(() => {
    loadStatus();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-blue-900">Devocional do Dia</h1>

      <p className="text-gray-600 mt-2">Data: {today}</p>

      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="text-lg font-semibold">Versículo de Hoje</h2>
        <p className="mt-2 text-gray-700">
          “O Senhor é o meu pastor; nada me faltará.” — Salmos 23:1
        </p>

        <button
          onClick={markDone}
          className={`mt-4 px-4 py-2 rounded text-white ${
            done ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {done ? "Leitura concluída ✔" : "Marcar como lido"}
        </button>
      </div>
    </DashboardLayout>
  );
}
