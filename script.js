var clientes = document.querySelectorAll(".cliente");

for (let i = 0; i < clientes.length; i++) {
    var qtde = clientes[i].querySelector(".info-quant").textContent;
    var unitario = clientes[i].querySelector(".info-valor").textContent;

    //Formatando a linha do valor unitário
    clientes[i].querySelector(".info-valor").textContent = formatacao(unitario);

    // Verificação da quantidade
    if (verificacaoQuantidade(qtde) == false) {
        clientes[i].querySelector(".info-quant").textContent = "Qtde inválida";
        clientes[i].querySelector(".info-quant").classList.add("alertaMin");
        clientes[i].querySelector(".info-total").textContent = formatacao(0);
    } else {
        // Verificação do valor unitário
        if (verificacaoValorUnitario(unitario) == false) {
            clientes[i].querySelector(".info-valor").textContent = "Valor inválido";
            clientes[i].classList.add("alertaMax");
            clientes[i].querySelector(".info-quant").style.color = "black";
            clientes[i].querySelector(".info-total").textContent = formatacao(0);
        } else {
            clientes[i].querySelector(".info-total").textContent = calculaTotal(qtde, unitario);
        }
    }
}

// Função  verificação do valor unitário
function verificacaoValorUnitario(unitario) {
    if (unitario < 1 || isNaN(unitario)) {
        return false;
    } else {
        return true;
    }
}

// Função para verificação da quantida
function verificacaoQuantidade(qtde) {
    if (qtde < 1 || isNaN(qtde)) {
        return false;
    } else {
        return true;
    }
}

// Função para formatação
function formatacao(valor) {
    var nValor = parseFloat(valor);
    var x = nValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return x;
}

// Função para calcular o valor total
function calculaTotal(qtde, unitario) {
    var total = 0;
    total = qtde * unitario;

    return formatacao(total);
}

//Formulário para adicionar nova encomenda
let novaLinha; 
const form = document.getElementById("adicionarEncomenda");
const fNome = document.getElementById("ipNome");
const fProduto = document.getElementById("ipProd");
const fQtde = document.getElementById("ipQtde");
const fVUni = document.getElementById("ipVUni");
const tabela = document.querySelector(".tabela_tabela tbody");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = fNome.value;
    const produto = fProduto.value;
    const qtde = parseInt(fQtde.value);
    const vUni = parseFloat(fVUni.value);

    if (qtde == 0 || vUni == 0) {
        window.alert("Erro!");
        return; 
    }

    const total = qtde * vUni;

    novaLinha = tabela.insertRow(); 
    novaLinha.classList.add("cliente");
    novaLinha.setAttribute("ondblclick", "apagaLinha(this)");

    novaLinha.insertCell(0).textContent = nome;
    novaLinha.insertCell(1).textContent = produto;
    novaLinha.insertCell(2).textContent = qtde;
    novaLinha.insertCell(3).textContent = formatacao(vUni);
    novaLinha.insertCell(4).textContent = formatacao(total);

    novaLinha.cells[0].classList.add("info-nome");
    novaLinha.cells[1].classList.add("info-produto");
    novaLinha.cells[2].classList.add("info-quant");
    novaLinha.cells[3].classList.add("info-valor");
    novaLinha.cells[4].classList.add("info-total");

    fNome.value = "";
    fProduto.value = "";
    fQtde.value = "";
    fVUni.value = "";
});

/* Apagar linha */
function apagaLinha(linha) {
    linha.parentNode.removeChild(linha);
}



/*Pop-up do formulário*/
function popForm() {
    var width = 600;
    var height = 400;
    var left = (window.innerWidth - width) / 2;
    var top = (window.innerHeight - height) / 2;

    var popupWindow = window.open('pop-form.html', 'Pop-up', 'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left + ', resizable=no, scrollbars=no');

    if (window.focus) {
        popupWindow.focus();
    }
};
