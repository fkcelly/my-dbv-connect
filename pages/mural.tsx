"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "src/components/layout/DashboardLayout";

export default function MuralPage() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  // Buscar posts ao carregar a página
  const loadPosts = async () => {
    const res = await fetch("/api/posts/list");
    const data = await res.json();
    setPosts(data.posts);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setContent("");
      loadPosts(); // recarregar posts
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Mural do Clube</h1>

      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Escreva uma postagem..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Publicar
        </button>
      </form>

      {/* LISTA DE POSTS */}
      <div className="space-y-4">
        {posts.map((post: any) => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <p className="text-gray-800">{post.content}</p>
            <p className="text-sm text-gray-500 mt-1">
              Postado por <b>{post.author.name}</b> em{" "}
              {new Date(post.createdAt).toLocaleString("pt-BR")}
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
