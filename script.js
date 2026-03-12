function salvarConfig(){

    let taxa = document.getElementById("taxaImposto").value
    let fixa = document.getElementById("taxaFixa").value

    localStorage.setItem("taxaImposto", taxa)
    localStorage.setItem("taxaFixa", fixa)

    alert("Configuração salva")

    }

    function carregarConfig(){

    document.getElementById("taxaImposto").value =
    localStorage.getItem("taxaImposto") || 30

    document.getElementById("taxaFixa").value =
    localStorage.getItem("taxaFixa") || 4

    }

    function calcular(){

    let venda = parseFloat(document.getElementById("valorVenda").value) || 0
    let custo = parseFloat(document.getElementById("custoProduto").value) || 0

    let taxa = parseFloat(document.getElementById("taxaImposto").value) || 0
    let fixa = parseFloat(document.getElementById("taxaFixa").value) || 0

    let imposto = venda * (taxa/100)

    let lucro = venda - imposto - fixa - custo

    let percentual = custo > 0 ? (lucro / custo) * 100 : 0

    let resultado = document.getElementById("resultado")

    if(lucro >= 0){

    resultado.innerHTML =
    `<p class="lucro">Lucro: R$ ${lucro.toFixed(2)}</p>
    <p class="lucro">Margem: ${percentual.toFixed(2)}%</p>`

    }else{

    resultado.innerHTML =
    `<p class="prejuizo">Prejuízo: R$ ${lucro.toFixed(2)}</p>
    <p class="prejuizo">Margem: ${percentual.toFixed(2)}%</p>`

    }

    }

    function gerarLink(){

    let venda = document.getElementById("valorVenda").value
    let custo = document.getElementById("custoProduto").value
    let imposto = document.getElementById("taxaImposto").value
    let taxa = document.getElementById("taxaFixa").value

    let url = `${window.location.origin}${window.location.pathname}?venda=${venda}&custo=${custo}&imposto=${imposto}&taxa=${taxa}`

    navigator.clipboard.writeText(url)

    alert("Link copiado")

    }

    function carregarParametros(){

    let params = new URLSearchParams(window.location.search)

    if(params.get("venda")){
    document.getElementById("valorVenda").value = params.get("venda")
    }

    if(params.get("custo")){
    document.getElementById("custoProduto").value = params.get("custo")
    }

    if(params.get("imposto")){
    document.getElementById("taxaImposto").value = params.get("imposto")
    }

    if(params.get("taxa")){
    document.getElementById("taxaFixa").value = params.get("taxa")
    }

    if(params.get("venda")){
    calcular()
    }

    }

    carregarConfig()
    carregarParametros()

    // recalcular automaticamente ao digitar
    document.getElementById("valorVenda").addEventListener("input", calcular)
    document.getElementById("custoProduto").addEventListener("input", calcular)
    document.getElementById("taxaImposto").addEventListener("input", calcular)
    document.getElementById("taxaFixa").addEventListener("input", calcular)
