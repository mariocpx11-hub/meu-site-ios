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
    } else {
        document.querySelector('.tabs-nav .tab-btn:nth-child(3)').classList.add('active');
        document.getElementById('tab-simbolos').classList.add('active');
        searchSymbols(); // Carrega os símbolos com os filtros ativos assim que abre a aba
    }
}

// --- SISTEMA DE ALERTA VISUAL (TOAST POPUP) ---
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').innerText = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

// --- FUNÇÃO DE CÓPIA UNIVERSAL (BLINDADA PARA CELULAR E PC) ---
function copySpace(character) {
    navigator.clipboard.writeText(character).then(() => {
        showToast('Copiado para a área de transferência!');
    }).catch(err => {
        // Fallback para navegadores antigos de celular que bloqueiam o clipboard
        const el = document.createElement('textarea');
        el.value = character;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        showToast('Copiado para a área de transferência!');
    });
}
function copyText(text) { copySpace(text); }

// --- GERADOR DE LETRAS MODIFICADAS (ALFABETOS UNICODE) ---
const maps = {
    script: { 'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓿', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𔔁', 'y': '𝔂', 'z': '𝔃' },
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

// ====================================================
// 🧠 MOTO INTELIGENTE: CONEXÃO COM IA REAL DA GROQ
// ====================================================
async function generateAiNicks() {
    const themeInput = document.getElementById('aiInput').value.trim();
    const container = document.getElementById('aiResults');
    const theme = themeInput ? themeInput : "apelão de campeonato";

    container.innerHTML = `<div style="text-align: center; color: var(--texto-s); padding: 20px; font-size: 13px;">Groq AI arquitetando codinomes... ⚡</div>`;

    // Lembrete: Use sua chave válida aqui para os testes locais no navegador
    const apiKey = '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';
    
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: "Você é um gerador elite de codinomes e nicks de e-Sports competitivos de alto nível (estilo Free Fire, Valorant, CS, Line-ups profissionais). PROIBIDO gerar nicks genéricos infantis ou palavras simples inteiras. Crie combinações agressivas usando abreviações, tags de clãs fictícios (ex: FX, NT, K9, MDG), leetspeak cirúrgico e caracteres raros de forma harmoniosa. O usuário mandará um conceito ou estilo. Responda estritamente com apenas 5 opções separadas por vírgula, sem explicações, sem introduções e sem numeração."
                    },
                    {
                        role: "user",
                        content: `Conceito/Estilo do Nick: ${theme}`
                    }
                ],
                temperature: 0.85,
                max_tokens: 120
            })
        });

        if (!response.ok) {
            throw new Error(`Código ${response.status}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            const iaText = data.choices[0].message.content;
            const nicks = iaText.split(',').map(n => n.trim()).filter(n => n.length > 0);
            
            container.innerHTML = "";
            nicks.forEach(nick => {
                const item = document.createElement('div');
                item.className = 'result-item';
                item.onclick = () => copyText(nick);
                item.innerHTML = `<span class="nick-text">${nick}</span><span class="copy-icon">Copiar</span>`;
                container.appendChild(item);
            });
        }

    } catch (error) {
        console.error("Erro Groq:", error);
        container.innerHTML = `<div style="text-align: center; color: #ff453a; padding: 20px; font-size: 13px;">
            Erro Real: ${error.message} <br> 
            <span style="color: var(--texto-s); font-size: 11px;">Ajuste o modelo ou valide sua chave no console da Groq.</span>
        </div>`;
    }
}

// --- FILTRAR BANCO POR BOTÕES DE CATEGORIAS (PILLS) ---
function filterCategory(category, buttonElement) {
    document.querySelectorAll('.cat-pill').forEach(pill => pill.classList.remove('active'));
    buttonElement.classList.add('active');
    currentCategoryFilter = category;
    searchSymbols(); 
}

// --- MOTOR DE BUSCA AVANÇADO DA BIBLIOTECA DE SÍMBOLOS ---
function searchSymbols() {
    // Validação de segurança caso o arquivo symbols.js falte ou quebre
    if (typeof symbolDatabase === 'undefined') {
        document.getElementById('symbolsGrid').innerHTML = `<p style="color: var(--texto-s); grid-column: 1 / -1; text-align: center; padding: 20px; font-size: 13px;">Erro: Banco de dados symbols.js não encontrado.</p>`;
        return;
    }

    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const grid = document.getElementById('symbolsGrid');
    grid.innerHTML = ""; 

    // Filtro 1: Varredura por texto de digitação nas tags e nomes bases
    let filtered = symbolDatabase.filter(sym => {
        const charStr = sym.char ? sym.char : '';
        const nameStr = sym.name ? sym.name.toLowerCase() : '';
        const tagsStr = sym.tags ? sym.tags.toLowerCase() : '';
        const osStr = sym.os ? sym.os.toLowerCase() : '';

        return charStr.includes(query) || nameStr.includes(query) || tagsStr.includes(query) || osStr.includes(query);
    });

    // Filtro 2: Cruzamento de dados com a categoria selecionada nas Pills superiores
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

    // Renderização limpa dos Cards de Símbolos na Grid
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
