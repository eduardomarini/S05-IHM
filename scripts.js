// objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  
  // obter tipo de armário selecionado pelo usuário no html.
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // na lista, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário.
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
  
  // caso não exista armário disponível, retorna para o usuário mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // Caso exista armário(s) disponíveil, seguimos sorteando uma opção. 
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // Depois localizamos o armário emprestado na lista de armarios e mudamos o status do armário.
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;

  // Adicionamos a data e hora da reserva ao armário emprestado.
  armarioEmprestado.dataReserva = new Date().toLocaleString();

  // Calculamos a data e hora para entrega das chaves (prazo de 24h).
  let dataReserva = new Date(); // corrigido aqui, agora estamos pegando a data correta
  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioEmprestado.dataEntrega = dataEntrega.toLocaleString();
  
  // Finalmente, mudamos a pendencia do usuário para verdadeira.
  usuario.pendencia = true;
  
  // Impmimimos uma mensagem de reserva para o usuário.
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! A entrega das chaves deve ser feita até ${armarioEmprestado.dataEntrega}.`;

  console.log(usuario);
  console.log(armarios);
}
