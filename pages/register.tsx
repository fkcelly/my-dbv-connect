// pages/register.tsx
"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Conta criada com sucesso! Agora faça login.");
    } else {
      setMessage(data.message || "Erro ao criar conta.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md border p-6 rounded shadow">
        <h1 className="text-2xl font-semibold">Criar conta — DBV Connect</h1>

        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Criar conta
        </button>

        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </form>
    </main>
  );
}
