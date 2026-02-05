let socket;
const nickSalvo = localStorage.getItem("usuarioLogado");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const setMessage = new Set();


socket = new WebSocket(`wss://soul-hunter.onrender.com/chat?id=${nickSalvo}`);


socket.onopen = () => {
    console.log("Conectado ao servidor como: " + nickSalvo);
    
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (Array.isArray(data)) {
        data.forEach(msg => {
            const msgId = msg.id || msg.ID; 
            if (msgId && !getMessages.has(msgId)) {
                addMessage(msg.user, msg.message, msg.time, msgId);
                getMessages.add(msgId);
            } else if (!msgId) {
                addMessage(msg.user, msg.message, msg.time);
            }
        });
    } else {
        const msgId = data.id || data.ID;
        if (!msgId || !getMessages.has(msgId)) {
            addMessage(data.user, data.message, data.time, msgId);
            if (msgId) getMessages.add(msgId);
        }
    }
};

socket.onerror = (error) => {
    console.error("Erro no WebSocket:", error);
};

socket.onclose = () => {
    console.log("WebSocket fechado");
};

// Pega a mensagem do servidor e mostra no chat
function addMessage(user, message, time, id) {
    
    const elementId = id ? `msg-${id}` : `msg-${Math.random().toString(36).substr(2, 9)}`;
    
    const messageDiv = document.createElement("div");
    messageDiv.id = elementId; 
    messageDiv.classList.add("chat-message");

    messageDiv.innerHTML = `
        <div class="chat-message-header">
            <span class="chat-user"><strong>${user}</strong></span>
            <span class="chat-time">${time}</span>
        </div>
        <p class="chat-text">${message}</p>
    `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();

    
    setTimeout(() => {
        const elementToDelete = document.getElementById(elementId);
        if (elementToDelete) {
            elementToDelete.style.opacity = '0';
            elementToDelete.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                elementToDelete.remove();
                console.log(`Mensagem ${elementId} removida.`);
            }, 500);
        }
    }, 120000); 
}

const iframe = document.getElementById('gameIframe');

if (window.innerWidth > 1024) { 
    // O "/" no início indica que ele parte da pasta principal do site
    iframe.src = "/Soul-Hunter-PC/index.html";
} else {
    iframe.src = "/Soul-Hunter/index.html";
}

// Envia a mensagem para o servidor
function sendMessage() {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        alert("A conexão ainda não está pronta!");
        return;
    }

    const text = chatInput.value.trim();
    if (text === "") return;

    const payload = {
        message: text,
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    };

    socket.send(JSON.stringify(payload));
    chatInput.value = "";
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChatKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function toggleFullscreen() {
    const container = document.getElementById("gameContainer");

    // Verifica se já está em modo tela cheia
    if (!document.fullscreenElement) {
        // Tenta entrar em modo tela cheia
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) { 
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { 
            container.msRequestFullscreen();
        }
    } else {
        // Sai do modo tela cheia
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}