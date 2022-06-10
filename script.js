// Função anônima
(function () {
    var _a;
    var $ = function (query) { return document.querySelector(query); };
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var _a, _b;
        var nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        console.log('Entrei');
        console.log(nome, placa);
        if (!nome || !placa) {
            alert('Campos Nome e Placa obrigatórios');
            return;
        }
    });
})();
