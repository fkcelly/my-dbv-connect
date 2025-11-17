import DashboardLayout from "src/components/layout/DashboardLayout";

const classes = [
  {
    nome: "Amigo",
    cor: "#0074D9",
    progresso: 35,
  },
  {
    nome: "Companheiro",
    cor: "#2ECC40",
    progresso: 10,
  },
  {
    nome: "Pesquisador",
    cor: "#FF851B",
    progresso: 0,
  },
  {
    nome: "Pioneiro",
    cor: "#B10DC9",
    progresso: 0,
  },
  {
    nome: "Excursionista",
    cor: "#FF4136",
    progresso: 0,
  },
  {
    nome: "Guia",
    cor: "#85144b",
    progresso: 0,
  },
];

export default function ProgressoPage() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold text-blue-900 mb-2">Progresso</h2>
      <p className="text-gray-600 mb-6">
        Acompanhe o progresso nas classes de desbravadores.
      </p>

      <div className="space-y-6">
        {classes.map((classe) => (
          <div key={classe.nome} className="bg-white p-6 rounded shadow">
            <h3
              className="text-xl font-semibold mb-3"
              style={{ color: classe.cor }}
            >
              {classe.nome}
            </h3>

            <div className="w-full bg-gray-200 rounded h-5 overflow-hidden mb-3">
              <div
                className="h-full"
                style={{
                  width: `${classe.progresso}%`,
                  backgroundColor: classe.cor,
                }}
              ></div>
            </div>

            <p className="text-gray-700 font-medium mb-3">
              {classe.progresso}% concluído
            </p>

            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Ver requisitos
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
