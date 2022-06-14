var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Função anônima
(function () {
    var _a;
    var $ = function (query) { return document.querySelector(query); };
    // Função para calcular o tempo que o carro ficou no estacionamento
    function calcTempo(mil) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor(mil % 60000) / 1000;
        return "".concat(min, "m e ").concat(sec, "s");
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        ;
        // Salva os dados do novo veículo
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        ;
        // Cria uma tabela para adicionar os veículos cadastrados no estacionamento
        function adicionar(veiculo, salva) {
            var _a, _b;
            var row = document.createElement("tr");
            row.innerHTML = "\n            <td>".concat(veiculo.nome, "</td>\n            <td>").concat(veiculo.placa, "</td>\n            <td>\n                <button class=\"delete\" data-placa=\"").concat(veiculo.placa, "\">X</button>\n            </td>\n            ");
            // Remove o veículo do sistema ao clicar no botão "X"
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $('#patio')) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
        }
        ;
        // Função para mostrar quanto tempo o veículo ficou no estacionamento ao clicar para remover do sistema
        function remover(placa) {
            var _a = ler().find(function (veiculo) { return veiculo.placa === placa; }), entrada = _a.entrada, nome = _a.nome;
            var tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm("O ve\u00EDculo ".concat(nome, " permanceu por  ").concat(tempo, ". Deseja encerrar?")))
                return;
            salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
            render();
        }
        ;
        // Atualiza a página com as informações
        function render() {
            $("#patio").innerHTML = "";
            var patio = ler();
            if (patio.length) {
                patio.forEach(function (veiculo) { return adicionar(veiculo); });
            }
        }
        ;
        return { ler: ler, adicionar: adicionar, remover: remover, salvar: salvar, render: render };
    }
    patio().render();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var _a, _b;
        var nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        console.log('Entrei');
        console.log(nome, placa);
        // Obriga a preencher os campos nome e placa
        if (!nome || !placa) {
            alert('Campos Nome e Placa obrigatórios');
            return;
        }
        patio().adicionar({ nome: nome, placa: placa, entrada: new Date().toISOString() }, true);
    });
})();
