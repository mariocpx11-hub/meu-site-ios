window.onload = function() {
    carregarPerfil();
};

// --- FUNÇÕES DO MODAL ---
function abrirModal() {
    document.getElementById('input-name').value = document.getElementById('profile-name').innerText;
    document.getElementById('input-bio').value = document.getElementById('profile-bio').innerText;
    document.getElementById('edit-modal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// --- SALVAMENTO REAL ---
function salvarPerfil() {
function salvarPerfil() {
    const nome = document.getElementById('input-name').value;
    const bio = document.getElementById('input-bio').value;
    const inputFile = document.getElementById('input-file').files[0];

    // Salva textos imediatamente
    localStorage.setItem('ios_nome', nome);
    localStorage.setItem('ios_bio', bio);
    document.getElementById('profile-name').innerText = nome;
    document.getElementById('profile-bio').innerText = bio;

    if (inputFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            
            img.onload = function() {
                // Criamos um "mini palco" (canvas) para diminuir a foto
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Define o tamanho da foto de perfil (300x300 é perfeito)
                canvas.width = 300;
                canvas.height = 300;
                
                // Desenha a imagem da galeria dentro desse tamanho menor
                ctx.drawImage(img, 0, 0, 300, 300);
                
                // Converte para um formato super leve (WebP ou JPEG comprimido)
                const fotoCompactada = canvas.toDataURL('image/jpeg', 0.7);
                
                // Agora sim, salva no celular com espaço de sobra!
                localStorage.setItem('ios_foto', fotoCompactada);
                document.getElementById('profile-avatar').src = fotoCompactada;
            };
        };
        reader.readAsDataURL(inputFile);
    }

    fecharModal();
    alert("Perfil atualizado com sucesso!"); // Confirmação visual
}

// --- CARREGAMENTO AO ABRIR O SITE ---
function carregarPerfil() {
    const nomeSalvo = localStorage.getItem('ios_nome');
    const bioSalva = localStorage.getItem('ios_bio');
    const fotoSalva = localStorage.getItem('ios_foto');

    if (nomeSalvo) document.getElementById('profile-name').innerText = nomeSalvo;
    if (bioSalva) document.getElementById('profile-bio').innerText = bioSalva;
    if (fotoSalva) document.getElementById('profile-avatar').src = fotoSalva;
}

// Lógica de download simplificada
function iniciarDownload(event, elemento) {
    event.preventDefault();
    let btn = elemento.querySelector('.action');
    if (btn.innerText === "Obter") {
        btn.innerText = "Aguarde...";
        setTimeout(() => { btn.innerText = "Pronto"; }, 2000);
    }
}

