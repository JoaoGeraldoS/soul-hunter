let socket;

const nickSalvo = localStorage.getItem("usuarioLogado");

// window.location.href = "login.html"; 
// if (nickSalvo) {
//     alert("Faça o login")
// } else {
    // 2. Inicializamos a variável SEM o 'const' aqui dentro
    socket = new WebSocket(`ws://localhost:8080/chat?id=${nickSalvo}`);
    
    // Configuramos os eventos logo após a criação
    socket.onopen = () => {
        console.log("Conectado ao servidor como: " + nickSalvo);
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        addMessage(data.user, data.message, data.time);
    };

    socket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket fechado");
    };
// }
// Ajuste para o endereço real do seu WebSocket
// const socket = new WebSocket("ws://localhost:8080/chat");

const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");


// Adiciona mensagem no chat
function addMessage(user, message, time) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");

    messageDiv.innerHTML = `
        <div class="chat-message-header">
            <span class="chat-user">${user}</span>
            <span class="chat-time">${time}</span>
        </div>
        <p class="chat-text">${message}</p>
    `;

    chatMessages.appendChild(messageDiv);

    // Scroll automático
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    // Verificamos se o socket está aberto antes de enviar
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error("Socket não está conectado!");
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

// Enviar com Enter
function handleChatKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

