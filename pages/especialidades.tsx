import DashboardLayout from "src/components/layout/DashboardLayout";
import { useState } from "react";

const categorias = [
  {
    nome: "Artes e Habilidades Manuais",
    cor: "#E5A100",
    especialidades: [
      "Artesanato",
      "Escultura",
      "Desenho Artístico",
      "Pintura",
      "Origami",
      "Marcenaria",
      "Trabalhos Manuais",
      "Caligrafia",
      "Cerâmica",
      "Tricô",
    ],
  },
  {
    nome: "Atividades Agrícolas",
    cor: "#4CAF50",
    especialidades: [
      "Agricultura",
      "Horticultura",
      "Apicultura",
      "Avicultura",
      "Jardinagem",
      "Floricultura",
      "Pomicultura",
      "Hidroponia",
      "Cultivo de Hortaliças",
      "Cultivo de Grãos",
    ],
  },
  {
    nome: "Atividades Missionárias e Comunitárias",
    cor: "#FFC300",
    especialidades: [
      "Ação Comunitária",
      "Evangelismo",
      "Missão Global",
      "Cidadania Cristã",
      "Capelania",
      "Serviço Comunitário",
      "ADRA Júnior",
      "Educação Cristã",
      "Ajuda Humanitária",
      "Defesa da Vida",
    ],
  },
  {
    nome: "Atividades Profissionais",
    cor: "#7E57C2",
    especialidades: [
      "Carpintaria",
      "Eletricista",
      "Mecânica Básica",
      "Fotografia",
      "Jornalismo",
      "Informática",
      "Secretariado",
      "Publicidade",
      "Pintura Residencial",
      "Enfermagem Iniciante",
    ],
  },
  {
    nome: "Atividades Recreativas",
    cor: "#039BE5",
    especialidades: [
      "Acampamento",
      "Orientação",
      "Nós e Amarras",
      "Sobrevivência",
      "Excursionismo",
      "Ciclismo",
      "Primeiros Socorros",
      "Natação",
      "Tirolesa Básica",
      "Arco e Flecha Seguro",
    ],
  },
  {
    nome: "Ciência e Saúde",
    cor: "#1E88E5",
    especialidades: [
      "Anatomia",
      "Fisiologia",
      "Nutrição",
      "Hidrologia",
      "Botânica",
      "Zoologia",
      "Astronomia",
      "Química Básica",
      "Genética",
      "Primeiros Socorros Avançado",
    ],
  },
  {
    nome: "Estudo da Natureza",
    cor: "#2E7D32",
    especialidades: [
      "Observação de Aves",
      "Entomologia",
      "Geologia",
      "Meteorologia",
      "Ecologia",
      "Mamíferos",
      "Répteis",
      "Anfíbios",
      "Plantas Medicinais",
      "Fungos",
    ],
  },
  {
    nome: "Habilidades Domésticas",
    cor: "#FF7043",
    especialidades: [
      "Culinária",
      "Costura",
      "Organização Doméstica",
      "Panificação",
      "Etiqueta",
      "Lavanderia",
      "Decoração Básica",
      "Confeitaria",
      "Alimentação Vegetariana",
      "Conservas",
    ],
  },
  {
    nome: "Mestrados (ME)",
    cor: "#6A1B9A",
    especialidades: [
      "Mestre em Estudo da Natureza",
      "Mestre em Habilidades Manuais",
      "Mestre em Saúde",
      "Mestre em Atividades Profissionais",
      "Mestre em Atividades Missionárias",
      "Mestre em Recreação",
      "Mestre em Liderança Juvenil",
      "Mestre em Astronomia",
      "Mestre em Classes Bíblicas",
      "Mestre Adventista",
    ],
  },
];

export default function EspecialidadesPage() {
  const [search, setSearch] = useState("");

  const especialidadesFiltradas = categorias.map((cat) => ({
    ...cat,
    especialidades: cat.especialidades.filter((esp) =>
      esp.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold text-blue-900">Especialidades</h2>
      <p className="text-gray-600 mb-6">
        Explore as especialidades disponíveis no clube.
      </p>

      <input
        type="text"
        placeholder="Buscar especialidade..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      <div className="space-y-6">
        {especialidadesFiltradas.map((categoria) => (
          <div key={categoria.nome} className="bg-white p-6 rounded shadow">
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: categoria.cor }}
            >
              {categoria.nome}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoria.especialidades.length > 0 ? (
                categoria.especialidades.map((esp) => (
                  <div
                    key={esp}
                    className="border rounded p-4 shadow-sm hover:shadow-md transition bg-gray-50"
                  >
                    <p className="font-medium text-gray-800">{esp}</p>
                    <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      Ver detalhes
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  Nenhuma especialidade encontrada.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
