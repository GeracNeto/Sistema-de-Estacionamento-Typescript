// Interface
interface Veiculo{
    nome: String;
    placa: String;
    entrada: Date | string;
}

// Função anônima
(function(){
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    // Função para calcular o tempo que o carro ficou no estacionamento
    function calcTempo(mil: number){
        const min = Math.floor(mil / 60000);

        return min;  
    }

    // Função para calcular o preço do estacionamento, R$ 0,15 por minuto + taxa de R$ 2,00
    function calcpreco(time: number){
        return (0.15 * time) + 2;
    }

     function patio(){
        function ler(): Veiculo[]{
            return localStorage.patio ? JSON.parse(localStorage.patio): [];
        };

        // Salva os dados do novo veículo
        function salvar(veiculos: Veiculo[]){
            localStorage.setItem('patio', JSON.stringify(veiculos))
        };

        // Cria uma tabela para adicionar os veículos cadastrados no estacionamento
        function adicionar(veiculo: Veiculo, salva?: boolean){

                
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${veiculo.nome}</td>
            <td>${veiculo.placa}</td>
            <td>
                <button class="delete" data-placa="${veiculo.placa}">X</button>
            </td>
            `;
            
            // Remove o veículo do sistema ao clicar no botão "X"
            row.querySelector(".delete")?.addEventListener("click", function(){
                remover(this.dataset.placa);
            })

            $('#patio')?.appendChild(row);

            if(salva) salvar([...ler(), veiculo]);

        };

        // Função para mostrar quanto tempo o veículo ficou no estacionamento ao clicar para remover do sistema
        function remover(placa: string){
            
            const {entrada, nome} = ler().find(veiculo => veiculo.placa === placa);

            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

            console.log(tempo);

            const preco = calcpreco(tempo);

            if(!confirm(`O cliente ${nome.toUpperCase()} permanceu por ${tempo}m. Valor: R$ ${preco}. Deseja encerrar?`)) return;

            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        };

        // Atualiza a página com as informações
        function render(){
            $("#patio")!.innerHTML = "";
            const patio = ler();

            if(patio.length){
                patio.forEach(veiculo => adicionar(veiculo));
            }
        };

        // Retorna todas as funções
        return {ler, adicionar, remover, salvar, render};
     }
    
     patio().render();
    $('#cadastrar')?.addEventListener("click", () => {

        var nome = $('#nome')?.value;
        var placa = $('#placa')?.value;

        console.log(nome , placa);

        // Obriga a preencher os campos nome e placa
        if(!nome || !placa){
            alert('Campos Nome e Placa obrigatórios');
            return;
        }

        patio().adicionar({nome, placa, entrada: new Date().toISOString()}, true);
    })
})();