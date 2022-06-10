// Função anônima

(function(){
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    $('#cadastrar')?.addEventListener("click", () => {

        var nome = $('#nome')?.value;
        var placa = $('#placa')?.value;

        console.log('Entrei');
        console.log(nome , placa);

        if(!nome || !placa){
            alert('Campos Nome e Placa obrigatórios');
            return;
        }
    })
})();