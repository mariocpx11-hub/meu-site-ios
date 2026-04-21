// Executa assim que o site carrega
window.onload = function() {
    carregarPerfil();
};

// --- FUNÇÕES DO MODAL (INTERFACE) ---
function abrirModal() {
    document.getElementById('input-name').value = document.getElementById('profile-name').innerText;
    document.getElementById('input-bio').value = document.getElementById('profile-bio').innerText;
    document.getElementById('edit-modal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// Fecha o modal se o usuário clicar fora da caixa branca
window.onclick = function(event) {
    const modal = document.getElementById('edit-modal');
    if (event.target == modal) {
        fecharModal();
    }
}

// --- LÓGICA DE SALVAMENTO (LOCALSTORAGE + COMPRESSÃO) ---
function salvarPerfil() {
    const nome = document.getElementById('input-name').value;
    const bio = document.getElementById('input-bio').value;
    const inputFile = document.getElementById('input-file').files[0];

    // 1. Salva os textos na memória e atualiza na tela
    localStorage.setItem('ios_nome', nome);
    localStorage.setItem('ios_bio', bio);
    document.getElementById('profile-name').innerText = nome;
    document.getElementById('profile-bio').innerText = bio;

    // 2. Lógica para a foto da galeria
    if (inputFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            
            img.onload = function() {
                // Criamos um canvas para redimensionar a imagem (evita erro de memória)
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Tamanho padrão para foto de perfil
                canvas.width = 300;
                canvas.height = 300;
                
                // Desenha a imagem cortando para 300x300
                ctx.drawImage(img, 0, 0, 300, 300);
                
                // Converte para JPEG leve (qualidade 0.7)
                const fotoCompactada = canvas.toDataURL('image/jpeg', 0.7);
                
                // Salva a string da imagem no celular
                localStorage.setItem('ios_foto', fotoCompactada);
                document.getElementById('profile-avatar').src = fotoCompactada;
            };
        };
        reader.readAsDataURL(inputFile);
    }

    fecharModal();
    alert("Perfil atualizado com sucesso!");
}

// --- CARREGAMENTO AUTOMÁTICO ---
function carregarPerfil() {
    const nomeSalvo = localStorage.getItem('ios_nome');
    const bioSalva = localStorage.getItem('ios_bio');
    const fotoSalva = localStorage.getItem('ios_foto');

    if (nomeSalvo) document.getElementById('profile-name').innerText = nomeSalvo;
    if (bioSalva) document.getElementById('profile-bio').innerText = bioSalva;
    if (fotoSalva) document.getElementById('profile-avatar').src = fotoSalva;
}

// --- BOTÕES DE DOWNLOAD ---
function iniciarDownload(event, elemento) {
    event.preventDefault();
    let btn = elemento.querySelector('.action');
    
    if (btn.innerText === "Obter") {
        btn.innerText = "Aguarde...";
        btn.style.opacity = "0.5";
        
        setTimeout(() => {
            btn.innerText = "Pronto";
            btn.style.opacity = "1";
            btn.style.color = "#34c759"; // Verde iOS
        }, 2000);
    }
}
