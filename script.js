// Função para salvar contatos no localStorage
function salvarContatos(contatos) {
    localStorage.setItem('contatos', JSON.stringify(contatos));
}

// Função para carregar os contatos do localStorage
function carregarContatos() {
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    return contatos;
}

// Função para renderizar os contatos na tabela
function renderizarContatos(contatos) {
    const tabela = document.getElementById('tabelaContatos');
    tabela.innerHTML = ''; // Limpa a tabela antes de renderizar
    contatos.forEach((contato, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.telefone}</td>
            <td>
                <button onclick="editarContato(${index})">Editar</button>
                <button onclick="removerContato(${index})">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
    document.getElementById('totalContatos').textContent = contatos.length;
}

// Função para adicionar um novo contato
function adicionarContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    if (nome && email && telefone) {
        const contatos = carregarContatos();
        contatos.push({ nome, email, telefone });
        salvarContatos(contatos);
        renderizarContatos(contatos);

        // Limpar campos após adicionar
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('telefone').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para excluir um contato
function removerContato(index) {
    const contatos = carregarContatos();
    contatos.splice(index, 1);
    salvarContatos(contatos);
    renderizarContatos(contatos);
}

// Função para editar um contato
function editarContato(index) {
    const contatos = carregarContatos();
    const contato = contatos[index];
    document.getElementById('nome').value = contato.nome;
    document.getElementById('email').value = contato.email;
    document.getElementById('telefone').value = contato.telefone;

    // Remover o contato antes de editar
    contatos.splice(index, 1);
    salvarContatos(contatos);
    renderizarContatos(contatos);
}

// Função para filtrar os contatos
function filtrarContatos() {
    const filtro = document.getElementById('search').value.toLowerCase();
    const contatos = carregarContatos();
    const contatosFiltrados = contatos.filter(contato => 
        contato.nome.toLowerCase().includes(filtro)
    );
    renderizarContatos(contatosFiltrados);
}

// Carregar contatos ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    const contatos = carregarContatos();
    renderizarContatos(contatos);
});