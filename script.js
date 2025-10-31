// Funções de propósito geral (acessíveis em qualquer página)
// =========================================================

// Função para lidar com o envio do formulário de voluntário (usada em cadastro.html)
function handleSubmit(event) {
    // 1. Impede o envio padrão do formulário (que recarregaria a página)
    event.preventDefault();

    // 2. Obtém a referência para o formulário e a mensagem
    const form = document.getElementById('volunteerForm');
    const successMessage = document.getElementById('successMessage');

    // Simulação de processamento/envio dos dados (aqui você enviaria para um servidor real)
    console.log('Dados do formulário capturados e prontos para envio...');
    // Se o envio fosse para um servidor, esta parte estaria dentro de um fetch().then()

    // 3. Exibe a mensagem de sucesso (tornando-a visível)
    if (successMessage) {
        successMessage.style.display = 'block'; // Mostra a mensagem
    }
    
    // 4. Opcional: Esconde o formulário principal para focar na mensagem
    if (form) {
        form.style.display = 'none'; 
    }

    // 5. Limpa os campos do formulário (reseta o formulário)
    // form.reset(); // Se o formulário não fosse escondido, você usaria isso.
    
    // Opcional: Após 5 segundos, recarrega a página ou leva para outro lugar
    setTimeout(() => {
        // Opção 1: Recarregar para limpar tudo e reexibir o formulário
        window.location.reload(); 
        
        // Opção 2 (Se não quisesse recarregar, mas ocultar a mensagem):
        // successMessage.style.display = 'none';
        // form.style.display = 'block';
    }, 5000); // 5000 milissegundos = 5 segundos
}

// Se você tiver um botão de menu (menu-toggle)
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        // Alternando a classe 'hidden'
        navMenu.classList.toggle('hidden');
    }
}


document.addEventListener('DOMContentLoaded', function() {

    // 1. Obter referências para os elementos principais
    const formDoacao = document.querySelector('.formulario-doacao');
    
    // 🚩 CORREÇÃO APLICADA: SÓ EXECUTA O CÓDIGO DE PAGAMENTO SE O FORMULÁRIO EXISTIR NA PÁGINA
    if (formDoacao) { 
        
        const metodoPagamentoInputs = document.querySelectorAll('input[name="metodo"]');
        
        // Referências das seções de detalhes:
        const dadosCartaoSection = document.getElementById('dados-cartao');
        const dadosPixSection = document.getElementById('dados-pix');
        const dadosBoletoSection = document.getElementById('dados-boleto');
        
        // Agrupa todas as seções de detalhes
        const todasAsSecoesDeDetalhes = [dadosCartaoSection, dadosPixSection, dadosBoletoSection];

        // 2. Função para ocultar todas as seções de detalhes
        function ocultarTodasAsSecoes() {
            todasAsSecoesDeDetalhes.forEach(section => {
                if (section) { 
                    section.style.display = 'none';
                    
                    // Remove 'required' de todos os campos nas seções ocultas
                    section.querySelectorAll('input, select').forEach(input => {
                        input.removeAttribute('required');
                    });
                }
            });
        }

        // 3. Função principal para alternar a visibilidade
        function toggleDadosPagamento() {
            // Aqui formDoacao NÃO É NULO, então o querySelector funciona
            const metodoSelecionado = formDoacao.querySelector('input[name="metodo"]:checked')?.value;
            
            // 1. Oculta tudo primeiro
            ocultarTodasAsSecoes();

            // 2. Exibe apenas o que foi selecionado e configura 'required'
            let secaoAExibir = null;

            switch (metodoSelecionado) {
                case 'cartao':
                    secaoAExibir = dadosCartaoSection;
                    break;
                case 'pix':
                    secaoAExibir = dadosPixSection;
                    break;
                case 'boleto':
                    secaoAExibir = dadosBoletoSection;
                    break;
                default:
                    return; 
            }

            if (secaoAExibir) {
                secaoAExibir.style.display = 'block';
                
                // Torna os campos dentro da seção ativa obrigatórios
                secaoAExibir.querySelectorAll('input:not([readonly]), select').forEach(input => {
                    input.setAttribute('required', 'required');
                });
            }
        }

        // 4. Inicialização: Oculta as seções e define o estado inicial (PIX é o padrão checked)
        toggleDadosPagamento(); 

        // 5. Adicionar um "ouvinte de evento" (listener) a todos os botões de rádio
        metodoPagamentoInputs.forEach(input => {
            input.addEventListener('change', toggleDadosPagamento);
        });
        
        // 6. Funcionalidade do Botão Copiar PIX
        const btnCopiarPix = document.querySelector('.btn-pix');
        if (btnCopiarPix) {
            btnCopiarPix.addEventListener('click', function() {
                const chavePixInput = document.getElementById('chave-pix');
                
                // Tenta usar a API moderna de Clipboard
                if (navigator.clipboard && chavePixInput) {
                    navigator.clipboard.writeText(chavePixInput.value).then(() => {
                        alert('Chave PIX copiada com sucesso!');
                    }).catch(err => {
                        console.error('Falha ao copiar:', err);
                        alert('Erro ao copiar a chave PIX. Tente selecionar e copiar manualmente.');
                    });
                } else {
                    // Fallback para navegadores mais antigos
                    if (chavePixInput) {
                        chavePixInput.select();
                        document.execCommand('copy');
                        alert('Chave PIX copiada com sucesso! (Método antigo)');
                    }
                }
            });
        }
    } // FIM DA VERIFICAÇÃO if (formDoacao)
});