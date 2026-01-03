// Global variables for game state
let hp = 100;
let mana = 80;
let gold = 250;
let experience = 450;

// Download APK function
function downloadAPK() {
    alert('Download do APK iniciado! (Esta é uma demonstração)');
}

// Game actions
function attack() {
    mana = Math.max(0, mana - 15);
    experience += 25;
    gold += 10;
    updateStats();
}

function defend() {
    hp = Math.min(100, hp + 10);
    mana = Math.min(100, mana + 5);
    updateStats();
}

function special() {
    if (mana >= 30) {
        mana -= 30;
        experience += 50;
        gold += 25;
        updateStats();
    }
}

// Update game stats display
function updateStats() {
    const hpBar = document.getElementById('hpBar');
    const manaBar = document.getElementById('manaBar');
    const hpValue = document.getElementById('hpValue');
    const manaValue = document.getElementById('manaValue');
    const goldValue = document.getElementById('goldValue');
    const xpValue = document.getElementById('xpValue');
    const specialBtn = document.getElementById('specialBtn');

    if (hpBar) hpBar.style.width = hp + '%';
    if (manaBar) manaBar.style.width = mana + '%';
    if (hpValue) hpValue.textContent = hp;
    if (manaValue) manaValue.textContent = mana;
    if (goldValue) goldValue.textContent = gold;
    if (xpValue) xpValue.textContent = experience;
    
    if (specialBtn) {
        specialBtn.disabled = mana < 30;
    }
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (input && messagesContainer && input.value.trim()) {
        const message = document.createElement('div');
        message.className = 'chat-message';
        
        const now = new Date();
        const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        message.innerHTML = `
            <div class="chat-message-header">
                <span class="chat-user own">Você</span>
                <span class="chat-time">${time}</span>
            </div>
            <p class="chat-text">${input.value}</p>
        `;
        
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        input.value = '';
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update stats if on demo page
    updateStats();
});
