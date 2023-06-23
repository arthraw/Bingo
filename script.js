let jogadores = []
let numeros_sorteados = []
let numeros_possiveis = []

for (let i = 1; i <= 75; i++) {
    numeros_possiveis.push(i)
}

function verificarVencedor() {

    for (let i = 0; i < elementosTabela.length; i++) {
        let elemento = elementosTabela[i];
        if (elemento.style.backgroundColor !== 'green') {
            return false; 
        }
    }

    return true; 
}


function pintarFundo(numero) {
    let numeros = document.querySelectorAll('table td')
    for (let i = 0; i < numeros.length; i++) {
        let elemento = numeros[i]
        if (parseInt(elemento.textContent) === numero) {
            elemento.style.backgroundColor = 'green';
        }
    }
}

function verificarNumero() {
    for (let i = 0; i < jogadores.length; i++) {
        let jogador = jogadores[i]
        let nome = jogador["nome"]
        let cartela = jogador["cartela"]
        let acertos = jogador["acertos"]
        for (let j = 0; j < cartela.length; j++) {
            for (let k = 0; k < cartela[j].length; k++) {
                let numero = cartela[j][k]
                if (numeros_sorteados.indexOf(numero) !== -1) {
                    pintarFundo(numero)
                    acertos += 1
                    if (acertos >= 25) {
                        alert(`${nome} acaba de vencer!!`)
                    }
                }
            }
        }
    }
}

function gerarNumeroSortiado() {

    let num = (Math.floor(Math.random() * numeros_possiveis.length))
    let numero_escolhido = numeros_possiveis[num]
    numeros_sorteados.push(numero_escolhido)
    numeros_possiveis.splice(num, 1)
    console.log(numeros_possiveis)

    let numero = document.createElement('h1')
    numero.className = 'numero_sorteado'
    numero.innerHTML = numero_escolhido
    area_numeros.appendChild(numero)

    console.log(`Numeros sorteados: ${numeros_sorteados}`)
}

function jogar() {
    gerarNumeroSortiado()
    verificarNumero()
}

function reiniciar() {

    location.reload();
    console.log('Reiniciar')
}

function gerarNumeros(num_max, num_min, qtde) {
    let nums = []
    while (nums.length < qtde) {
        nums.push(Math.floor(Math.random() * (num_max - num_min) + num_min))
        nums = [...new Set(nums)]
    }
    return nums
}

function criarTabela() {
    let area_cartela = document.getElementById('area_cartelas')

    let cartela = document.createElement('div')
    cartela.className = 'cartela'
    area_cartela.appendChild(cartela)

    let label_jogador = document.createElement('label')
    label_jogador.className = 'nome'

    let nome_jogador = prompt('Nome do jogador')
    label_jogador.innerHTML = nome_jogador
    cartela.appendChild(label_jogador)

    let numeros_tabela = [gerarNumeros(15, 1, 5), gerarNumeros(30, 16, 5), gerarNumeros(45, 31, 5), gerarNumeros(60, 46, 5), gerarNumeros(75, 61, 5)]

    jogadores.push({ "nome": nome_jogador, "cartela": numeros_tabela, "acertos": 0 })

    let table = document.createElement('table')
    cartela.appendChild(table)

    let thead = document.createElement('thead')
    table.appendChild(thead)

    let tbody = document.createElement('tbody')
    table.appendChild(tbody)

    let thB = document.createElement('th');
    thB.innerText = 'B';
    thead.appendChild(thB)

    let thI = document.createElement('th');
    thI.innerText = 'I';
    thead.appendChild(thI)

    let thN = document.createElement('th');
    thN.innerText = 'N';
    thead.appendChild(thN)

    let thG = document.createElement('th');
    thG.innerText = 'G';
    thead.appendChild(thG)

    let thO = document.createElement('th');
    thO.innerText = 'O';
    thead.appendChild(thO)


    for (let i = 0; i < 5; i++) {
        let tr = document.createElement('tr')
        tbody.appendChild(tr)
        for (let j = 0; j < 5; j++) {
            let td = document.createElement('td')

            td.innerText = numeros_tabela[j][i]
            tr.appendChild(td);
        }
    }
}