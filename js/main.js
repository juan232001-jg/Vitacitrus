// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// ─── IMPACT COUNTER ───
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.impact-number').forEach(c => counterObserver.observe(c));

// ─── BOT BUBBLE ROTATION ───
const messages = [
    "👋 Hola, ¿te ayudo?",
    "🍋 Conoce VitaCitrus",
    "🔥 Oferta disponible hoy",
    "💬 Escríbenos por WhatsApp"
];
const botBubble = document.getElementById('botBubble');
setInterval(() => {
    if (botBubble && !document.getElementById('vcChatWindow').classList.contains('open')) {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        botBubble.textContent = msg;
        botBubble.style.animation = 'none';
        void botBubble.offsetWidth;
        botBubble.style.animation = 'showMessage 5s ease forwards';
    }
}, 12000);

const botImg = document.querySelector('.botvita img');
if (botImg) {
    setInterval(() => {
        botImg.style.animation = 'floatBot 3s ease-in-out infinite, pulse 2s infinite';
        setTimeout(() => { botImg.style.animation = 'floatBot 3s ease-in-out infinite'; }, 4000);
    }, 10000);
}

// ═══════════════════════════════════════════
// FAQ ACCORDION
// ═══════════════════════════════════════════
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        // Cerrar todos
        document.querySelectorAll('.faq-question').forEach(other => {
            other.setAttribute('aria-expanded', 'false');
            other.nextElementSibling.classList.remove('open');
        });
        // Toggle actual
        if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            answer.classList.add('open');
        }
    });
});

// ═══════════════════════════════════════════
// CHATBOT VITACITRUS
// ═══════════════════════════════════════════
const KB = [
    {
        keys: ['precio', 'cuesta', 'vale', 'valor', 'comprar', 'compra', 'pedir', 'pedido', 'como compro', 'donde compro'],
        answer: '¡Genial que quieras probarlo! 🍋 El precio lo manejamos directamente por WhatsApp para darte la info más actualizada. Escríbenos 👉 <a href="https://wa.me/3177461057?text=Hola%20quiero%20comprar%20VitaCitrus" target="_blank">+57 317 746 1057</a>'
    },
    {
        keys: ['ingredientes', 'conservantes', 'azucar', 'azúcar', 'natural', 'organico', 'orgánico', 'artificial', 'aditivos', 'quimicos', 'químicos'],
        answer: 'VitaCitrus es 100% extracto puro de limón Tahití 🌿 Sin azúcares, sin conservantes artificiales, sin colorantes. Vegano y libre de gluten. Lo que ves en la etiqueta es lo que tomas.'
    },
    {
        keys: ['usar', 'uso', 'como se usa', 'cuanto', 'cuánto', 'cantidad', 'dosis', 'receta', 'recetas', 'preparar', 'mezclar'],
        answer: 'Para bebidas: 1–2 cucharadas por vaso 🥤 Para cocinar (ceviches, marinados): 1–3 cdas. Para repostería: 2–4 cdas. Al ser concentrado, ¡un poco va muy lejos!'
    },
    {
        keys: ['envio', 'envío', 'envios', 'envíos', 'domicilio', 'despacho', 'llega', 'colombia', 'ciudad', 'entrega'],
        answer: 'Sí, enviamos a todo Colombia 🇨🇴 El costo varía según tu ciudad. Escríbenos por <a href="https://wa.me/3177461057?text=Hola%20quiero%20saber%20el%20costo%20de%20envío" target="_blank">WhatsApp</a> con tu dirección y te cotizamos al instante.'
    },
    {
        keys: ['dura', 'vence', 'vencimiento', 'conservar', 'conservacion', 'refrigerar', 'nevera', 'caducidad', 'abierto'],
        answer: 'Sin abrir: hasta 12 meses en lugar fresco ❄️ Una vez abierto: refrigerar y consumir en 30 días. La botella de 250ml rinde unas 40–50 porciones individuales.'
    },
    {
        keys: ['que es', 'qué es', 'vitacitrus', 'producto', 'extracto', 'lima', 'limon', 'limón', 'tahiti', 'tahití'],
        answer: 'VitaCitrus es extracto concentrado de limón Tahití colombiano por extracción en frío 🧪 No es jugo: es la esencia pura de la lima. 1 cucharada = exprimir 3–4 limas frescas.'
    },
    {
        keys: ['beneficio', 'beneficios', 'vitamina', 'salud', 'sirve', 'propiedades', 'antioxidante', 'inmune', 'defensas'],
        answer: 'Rico en vitamina C y antioxidantes 💊 Refuerza el sistema inmune, mejora la digestión y tiene propiedades antiinflamatorias. Todo natural, sin procesar.'
    },
    {
        keys: ['whatsapp', 'contacto', 'numero', 'número', 'telefono', 'teléfono', 'hablar', 'comunicar', 'atencion', 'atención'],
        answer: 'Nuestro WhatsApp es <a href="https://wa.me/3177461057" target="_blank">+57 317 746 1057</a> 📱 ¡Respondemos rápido!'
    },
    {
        keys: ['instagram', 'redes', 'social', 'facebook', 'youtube', 'seguir'],
        answer: 'Síguenos en Instagram como <a href="https://www.instagram.com/vita.citrus" target="_blank">@vita.citrus</a> 📸 También en Facebook y YouTube con novedades y recetas.'
    },
    {
        keys: ['tamano', 'tamaño', 'presentacion', 'presentación', '250', 'ml', 'botella', 'litro', 'mayor', 'mayoreo'],
        answer: 'Por ahora manejamos presentación de 250ml 🍶 ¿Necesitas cantidad mayor o al por mayor? Escríbenos por <a href="https://wa.me/3177461057" target="_blank">WhatsApp</a> y lo coordinamos.'
    },
];

const FALLBACK = [
    'Mmm, no tengo esa info exacta 🤔 Pero el equipo en WhatsApp sí puede ayudarte: <a href="https://wa.me/3177461057?text=Hola%20tengo%20una%20pregunta" target="_blank">+57 317 746 1057</a>',
    'Esa pregunta es para los expertos 😄 <a href="https://wa.me/3177461057" target="_blank">Escríbenos directo por WhatsApp</a> y te respondemos.',
    'No estoy 100% seguro, ¡pero nuestro equipo sí! <a href="https://wa.me/3177461057" target="_blank">Contáctanos aquí 🍋</a>',
];

const SUGGESTIONS = [
    '¿Qué es VitaCitrus?',
    '¿Cómo se usa?',
    '¿Cuánto cuesta?',
    '¿Hacen envíos?',
    '¿Tiene conservantes?',
    '¿Cuánto dura?',
];

const chatWindow  = document.getElementById('vcChatWindow');
const chatToggle  = document.getElementById('vcChatToggle');
const chatClose   = document.getElementById('vcChatClose');
const messagesDiv = document.getElementById('vcMessages');
const suggestDiv  = document.getElementById('vcSuggestions');
const inputEl     = document.getElementById('vcInput');
const sendBtn     = document.getElementById('vcSend');

let chatOpened = false;

function openChat() {
    chatWindow.classList.add('open');
    chatWindow.setAttribute('aria-hidden', 'false');
    if (botBubble) botBubble.style.display = 'none';
    inputEl.focus();
    if (!chatOpened) {
        chatOpened = true;
        setTimeout(() => addBotMsg('¡Hola! Soy BotVita 🍋 Pregúntame lo que quieras sobre VitaCitrus.'), 350);
        setTimeout(() => renderSuggestions(), 900);
    }
}

function closeChat() {
    chatWindow.classList.remove('open');
    chatWindow.setAttribute('aria-hidden', 'true');
    if (botBubble) botBubble.style.display = '';
}

chatToggle.addEventListener('click', () => {
    chatWindow.classList.contains('open') ? closeChat() : openChat();
});
chatClose.addEventListener('click', closeChat);

function addBotMsg(html) {
    const div = document.createElement('div');
    div.className = 'vc-msg bot';
    div.innerHTML = html;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = 'vc-msg user';
    div.textContent = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'vc-typing'; div.id = 'vcTyping';
    div.innerHTML = '<span></span><span></span><span></span>';
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById('vcTyping');
    if (t) t.remove();
}

function renderSuggestions(list = SUGGESTIONS) {
    suggestDiv.innerHTML = '';
    list.slice(0, 4).forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'vc-chip';
        btn.textContent = text;
        btn.addEventListener('click', () => handleMessage(text));
        suggestDiv.appendChild(btn);
    });
}

function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function findAnswer(text) {
    const t = normalize(text);
    for (const item of KB) {
        for (const key of item.keys) {
            if (t.includes(normalize(key))) return item.answer;
        }
    }
    return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

function handleMessage(text) {
    if (!text.trim()) return;
    suggestDiv.innerHTML = '';
    addUserMsg(text);
    inputEl.value = '';
    showTyping();
    const delay = 600 + Math.random() * 700;
    setTimeout(() => {
        removeTyping();
        addBotMsg(findAnswer(text));
        const userCount = messagesDiv.querySelectorAll('.vc-msg.user').length;
        if (userCount % 2 === 0) renderSuggestions();
    }, delay);
}

sendBtn.addEventListener('click', () => handleMessage(inputEl.value));
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') handleMessage(inputEl.value); });