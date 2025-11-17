import DashboardLayout from "src/components/layout/DashboardLayout";

const eventos = [
  {
    nome: "Acampamento de Unidade",
    data: "12–14 de Abril, 2025",
    local: "Sítio Serra Verde",
    status: "Próximo",
    descricao: "Acampamento oficial das unidades com foco especial em orientação, nós e amarras e atividades espirituais."
  },
  {
    nome: "Caminhada 10 km",
    data: "20 de Maio, 2025",
    local: "Trilha Vale Azul",
    status: "Próximo",
    descricao: "Caminhada anual com foco em resistência e observação da natureza."
  },
  {
    nome: "Reunião Especial de Investidura",
    data: "15 de Junho, 2025",
    local: "Igreja Adventista Central",
    status: "Finalizado",
    descricao: "Cerimônia de lenço, classes e especialidades concluídas pelos desbravadores."
  },
  {
    nome: "Social dos Desbravadores",
    data: "14 de Julho, 2025",
    local: "Salão Multiuso",
    status: "Finalizado",
    descricao: "Atividade social com brincadeiras, música e integração."
  }
];

export default function EventosPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-blue-900 mb-3">Eventos do Clube</h1>
      <p className="text-gray-600 mb-6">
        Veja os eventos realizados e os próximos encontros do clube.
      </p>

      <div className="space-y-5">
        {eventos.map((evento, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded shadow border-l-4"
            style={{
              borderColor: evento.status === "Próximo" ? "#1E88E5" : "#4CAF50",
            }}
          >
            <h2 className="text-xl font-semibold">{evento.nome}</h2>
            <p className="text-gray-700"><strong>Data:</strong> {evento.data}</p>
            <p className="text-gray-700"><strong>Local:</strong> {evento.local}</p>
            <p className="mt-2 text-gray-600">{evento.descricao}</p>

            <span
              className={`inline-block mt-3 px-3 py-1 text-sm font-semibold rounded text-white ${
                evento.status === "Próximo" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {evento.status}
            </span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
