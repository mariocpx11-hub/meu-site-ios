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
    const nome = document.getElementById('input-name').value;
    const bio = document.getElementById('input-bio').value;
    const inputFile = document.getElementById('input-file').files[0];

    // Atualiza Texto
    document.getElementById('profile-name').innerText = nome;
    document.getElementById('profile-bio').innerText = bio;
    localStorage.setItem('ios_nome', nome);
    localStorage.setItem('ios_bio', bio);

    // Atualiza e Salva Imagem da Galeria
    if (inputFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;
            document.getElementById('profile-avatar').src = base64Image;
            localStorage.setItem('ios_foto', base64Image); // Salva a imagem real
        };
        reader.readAsDataURL(inputFile);
    }

    fecharModal();
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

