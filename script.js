// --- VARIÁVEIS GLOBAIS DE CONTROLE ---
let currentCategoryFilter = 'all';

// --- NAVEGAÇÃO ENTRE ABAS (SWITCH TAB) ---
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if(tabName === 'espaco') {
        document.querySelector('.tabs-nav .tab-btn:nth-child(1)').classList.add('active');
        document.getElementById('tab-espaco').classList.add('active');
    } else if(tabName === 'nicks') {
        document.querySelector('.tabs-nav .tab-btn:nth-child(2)').classList.add('active');
        document.getElementById('tab-nicks').classList.add('active');
    } else if(tabName === 'simbolos') {
        document.querySelector('.tabs-nav .tab-btn:nth-child(3)').classList.add('active');
        document.getElementById('tab-simbolos').classList.add('active');
        searchSymbols(); 
    } else if(tabName === 'news') {
        document.querySelector('.tabs-nav .tab-btn:nth-child(4)').classList.add('active');
        document.getElementById('tab-news').classList.add('active');
        fetchNewsFF(); // Dispara o motor de busca de notícias reais!
    }
}

// --- SISTEMA DE ALERTA VISUAL (TOAST POPUP) ---
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').innerText = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

// --- FUNÇÃO DE CÓPIA UNIVERSAL ---
function copySpace(character) {
    navigator.clipboard.writeText(character).then(() => {
        showToast('Copiado!');
    }).catch(err => {
        const el = document.createElement('textarea');
        el.value = character;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        showToast('Copiado!');
    });
}
function copyText(text) { copySpace(text); }

// --- GERADOR DE LETRAS MODIFICADAS ---
const maps = {
    script: { 'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓿', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃' },
    smallCaps: { 'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ' },
    doubleStruck: { 'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫' },
    circulo: { 'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': '', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ' }
};

function transformText(text, map) { 
    return text.toLowerCase().split('').map(char => map[char] || char).join(''); 
}

function generateNicks() {
    const input = document.getElementById('nickInput').value;
    const listContainer = document.getElementById('resultsList');
    
    if (input.trim() === "") {
        listContainer.innerHTML = `<div style="text-align: center; color: var(--texto-s); padding: 20px; font-size: 13px;">Digite algo acima para ver os estilos...</div>`;
        return;
    }
    
    const styles = [
        transformText(input, maps.script), 
        transformText(input, maps.smallCaps), 
        transformText(input, maps.doubleStruck),
        `〆 ${input.toUpperCase()} ⚡`, 
        `꧁༺ ${input} ༻꧂`, 
        transformText(input, maps.circulo), 
        `× Mob_ ${input} ×`, 
        ` ${input} `
    ];
    
    listContainer.innerHTML = "";
    styles.forEach(nick => {
        const item = document.createElement('div');
        item.className = 'result-item'; 
        item.onclick = () => copyText(nick);
        item.innerHTML = `<span class="nick-text">${nick}</span><span class="copy-icon">Copiar</span>`;
        listContainer.appendChild(item);
    });
}

// --- FILTRAR BANCO POR BOTÕES DE CATEGORIAS (PILLS) ---
function filterCategory(category, buttonElement) {
    document.querySelectorAll('.cat-pill').forEach(pill => pill.classList.remove('active'));
    buttonElement.classList.add('active');
    currentCategoryFilter = category;
    searchSymbols(); 
}

// --- MOTOR DE BUSCA DA BIBLIOTECA DE SÍMBOLOS ---
function searchSymbols() {
    if (typeof symbolDatabase === 'undefined') {
        document.getElementById('symbolsGrid').innerHTML = `<p style="color: var(--texto-s); grid-column: 1 / -1; text-align: center; padding: 20px; font-size: 13px;">Erro: Banco de dados symbols.js não encontrado.</p>`;
        return;
    }

    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const grid = document.getElementById('symbolsGrid');
    grid.innerHTML = ""; 

    let filtered = symbolDatabase.filter(sym => {
        const charStr = sym.char ? sym.char : '';
        const nameStr = sym.name ? sym.name.toLowerCase() : '';
        const tagsStr = sym.tags ? sym.tags.toLowerCase() : '';
        const osStr = sym.os ? sym.os.toLowerCase() : '';

        return charStr.includes(query) || nameStr.includes(query) || tagsStr.includes(query) || osStr.includes(query);
    });

    if (currentCategoryFilter !== 'all') {
        if (currentCategoryFilter === 'ios' || currentCategoryFilter === 'android') {
            filtered = filtered.filter(sym => sym.os && sym.os.toLowerCase() === currentCategoryFilter);
        } else {
            filtered = filtered.filter(sym => sym.category && sym.category.toLowerCase() === currentCategoryFilter);
        }
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="color: var(--texto-s); grid-column: 1 / -1; text-align: center; padding: 20px; font-size: 13px;">Nenhum símbolo gamer encontrado com esses filtros.</p>`;
        return;
    }

    filtered.forEach(sym => {
        const btn = document.createElement('div');
        btn.className = 'symbol-item';
        btn.onclick = () => copySpace(sym.char); 
        
        const displayChar = sym.char ? sym.char : '?';
        const displayName = sym.name ? sym.name : 'Símbolo Raro';
        const displayOs = sym.os ? sym.os : 'ambos';
        
        let osColor = displayOs.toLowerCase() === 'ios' ? '#0a84ff' : (displayOs.toLowerCase() === 'android' ? '#30d158' : '#8e8e93');
        
        btn.innerHTML = `
            <span class="symbol-char">${displayChar}</span>
            <span class="symbol-name">${displayName}</span>
            <span class="symbol-os" style="color: ${osColor}">${displayOs}</span>
        `;
        grid.appendChild(btn);
    });
}

// ====================================================
// 📰 MOTOR DE JORNAL: GOOGLE NEWS AVANÇADO (ANTI-CACHE)
// ====================================================
async function fetchNewsFF() {
    const container = document.getElementById('newsFeed');
    container.innerHTML = `<div style="text-align: center; color: var(--texto-s); padding: 30px; font-size: 13px;">Varrendo o servidor atrás de Codiguins & Skins... 📡</div>`;

    try {
        // Nova busca forçando termos específicos e limitando para os últimos 3 dias (when:3d)
        const searchQuery = '"Free Fire" AND (vazamento OR atualização OR codiguin OR passe OR novidades)';
        const rssUrl = encodeURIComponent(`https://news.google.com/rss/search?q=${searchQuery}+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419`);
        
        // TRUQUE ANTI-CACHE: Adicionamos o tempo atual na URL para forçar o servidor a buscar notícias novas agora
        const cacheBuster = new Date().getTime();
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&t=${cacheBuster}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== 'ok') {
            throw new Error("Falha ao puxar as notícias do servidor.");
        }

        container.innerHTML = ""; 

        const articles = data.items.slice(0, 8);

        if (articles.length === 0) {
            container.innerHTML// ====================================================
// 📰 MOTOR DE JORNAL: GOOGLE NEWS BLINDADO (ANTI-ERRO)
// ====================================================
async function fetchNewsFF() {
    const container = document.getElementById('newsFeed');
    container.innerHTML = `<div style="text-align: center; color: var(--texto-s); padding: 30px; font-size: 13px;">Varrendo o servidor atrás de novidades... 📡</div>`;

    try {
        // Busca limpa e direta que evita falhas no leitor RSS
        const rssUrl = encodeURIComponent('https://news.google.com/rss/search?q=Free+Fire+novidades+skins&hl=pt-BR&gl=BR&ceid=BR:pt-419');
        
        // Adiciona um número aleatório para quebrar o cache de forma limpa
        const antiCache = Math.random();
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&nocache=${antiCache}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data || data.status !== 'ok') {
            throw new Error("O servidor de notícias está instável no momento.");
        }

        container.innerHTML = ""; 

        const articles = data.items.slice(0, 8);

        if (articles.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: var(--texto-s); padding: 20px; font-size: 13px;">Sem novidades publicadas recentemente.</div>`;
            return;
        }

        const fallbackImages = [
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop', 
            'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop', 
            'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop', 
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop', 
            'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600&auto=format&fit=crop', 
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop'  
        ];

        articles.forEach((article, index) => {
            let imageUrl = article.thumbnail || (article.enclosure && article.enclosure.link) || fallbackImages[index % fallbackImages.length];
            let pubDate = new Date(article.pubDate).toLocaleDateString('pt-BR');
            let cleanTitle = article.title.split(' - ')[0];

            const newsCard = document.createElement('div');
            newsCard.style.cssText = `
                background-color: var(--bg-input);
                border-radius: var(--radius-button);
                overflow: hidden;
                margin-bottom: 16px;
                border: 1px solid rgba(255, 255, 255, 0.05);
                display: flex;
                flex-direction: column;
            `;

            newsCard.innerHTML = `
                <div style="height: 160px; background-image: url('${imageUrl}'); background-size: cover; background-position: center; border-bottom: 1px solid rgba(255, 255, 255, 0.05);"></div>
                <div style="padding: 16px;">
                    <h3 style="font-size: 15px; font-weight: 600; margin-bottom: 8px; color: var(--texto-p); line-height: 1.4;">${cleanTitle}</h3>
                    <p style="font-size: 11px; color: var(--texto-s); margin-bottom: 14px;">Atualizado em: ${pubDate} • Radar Onyx</p>
                    <a href="${article.link}" target="_blank" style="display: block; text-align: center; background-color: var(--accent); color: white; text-decoration: none; padding: 12px; border-radius: 8px; font-size: 13px; font-weight: 600; transition: filter 0.2s;">Abrir Matéria</a>
                </div>
            `;
            container.appendChild(newsCard);
        });

    } catch (error) {
        console.error("Erro News API:", error);
        container.innerHTML = `<div style="text-align: center; color: #ff453a; padding: 20px; font-size: 13px;">O radar de notícias falhou ao carregar. Dê F5 na página para tentar novamente.</div>`;
    }
}
