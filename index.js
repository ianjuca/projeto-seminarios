function clickVenda() {
    location.href = "pagina-venda.html"
}

function clickCompra() {
    location.href = "pagina-compra.html"
}

function clickVoltar() {
    location.href = "index.html"
}

function clickComida(){
    location.href = "pagina-compra-comida.html"
}

function clickVoltarCompra(){
    location.href = "pagina-compra.html"
}

function clickBebida(){
    location.href = "pagina-compra-bebida.html"
}

function clickLimpeza(){
    location.href = "pagina-compra-limpeza.html"
}

function abrirCategoria(categoria) {
    window.location.href = `categoria.html?cat=${categoria}`;
}

function getBanco() {
    return JSON.parse(localStorage.getItem('banco')) || {
        alimentacao: [],
        bebidas: [],
        limpeza: []
    };
}

function setBanco(banco) {
    localStorage.setItem('banco', JSON.stringify(banco));
}

function adicionarProduto(e) {
    e.preventDefault(); // impede o reload da página

    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;

    const banco = getBanco();
    banco[categoria].push({
        id: Date.now(),
        nome,
        preco
    });

    setBanco(banco);
    alert("Produto adicionado com sucesso!");

    // limpa os campos do formulário
    document.getElementById('nome').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('categoria').value = '';
}

function mostrarProdutos(categoria) {
    const banco = getBanco();
    const container = document.getElementById('lista-produtos');
    container.innerHTML = '';

    banco[categoria].forEach(produto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${produto.nome} - R$${produto.preco.toFixed(2)}</p>
            <button onclick="editarProduto(${produto.id}, '${categoria}')">Editar</button>
            <button onclick="removerProduto(${produto.id}, '${categoria}')">Remover</button>
            <hr>
        `;
        container.appendChild(div);
    });
}

function removerProduto(id, categoria) {
    const banco = getBanco();
    banco[categoria] = banco[categoria].filter(p => p.id !== id);
    setBanco(banco);
    location.reload();
}

function editarProduto(id, categoria) {
    const novoNome = prompt("Novo nome:");
    const novoPreco = prompt("Novo preço:");

    if (novoNome && novoPreco) {
        const banco = getBanco();
        const produto = banco[categoria].find(p => p.id === id);
        produto.nome = novoNome;
        produto.preco = parseFloat(novoPreco);
        setBanco(banco);
        location.reload();
    }
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // impede o recarregamento
    // continue com o código de salvamento do produto aqui
});
