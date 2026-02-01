let socket;

const nickSalvo = localStorage.getItem("usuarioLogado");

socket = new WebSocket(`wss://soul-hunter.onrender.com/chat?id=${nickSalvo}`);

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
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
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

function scrollToBottom() {
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChatKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
        scrollToBottom()
    }
}

