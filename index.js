// Função para lidar com o envio do formulário
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
        navMenu.classList.toggle('open');
    }
}