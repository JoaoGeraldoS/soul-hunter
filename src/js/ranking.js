let debounceTimer;

const campoBusca = document.getElementById("input-busca");

campoBusca.addEventListener("input", function() {
    const nome = this.value.trim();

    clearTimeout(debounceTimer);

    if (nome === "") {
        pegarNick(); 
        return;
    }

    debounceTimer = setTimeout(() => {
        executarFiltro(nome);
    }, 300);
});

async function executarFiltro(nome) {
    try {
        const response = await fetch(`https://soul-hunter.onrender.com/filter?player=${encodeURIComponent(nome)}`);
        const players = await response.json(); 

        renderizarTabela(players);
    } catch (error) {
        console.error("Erro ao filtrar:", error);
    }
}

function renderizarTabela(players) {
    const tabelaBody = document.getElementById("ranking-body");
    tabelaBody.innerHTML = "";

    if (!players || players.length === 0) {
        tabelaBody.innerHTML = "<tr><td colspan='5' style='text-align:center; padding: 20px;'>Nenhum jogador encontrado</td></tr>";
        return;
    }

    players.forEach((element, index) => {
        const tr = document.createElement("tr");
        tr.className = "rank-top";

        tr.innerHTML = `
            <td class="rank-cell">
                <span class="rank-icon">${index + 1}</span>
            </td>
            <td class="player-name">${element.nick}</td>
            <td><span class="badge badge-level">${element.level || 0}</span></td>
            <td><span class="badge badge-warrior">${element.classe || 'Arqueira'}</span></td>
            <td class="points">${element.points}</td>  
        `;
        tabelaBody.appendChild(tr);
    });

    const contador = document.getElementById("total_player");
    if (contador) contador.innerText = players.length;
}

async function pegarNick() {
    try {
        const response = await fetch('https://soul-hunter.onrender.com/ranking');
        const data = await response.json();

        renderizarTabela(data.players);

        const formatador = new Intl.NumberFormat('pt-BR');

        const somaPonints = data.total_points;
        const totalPlayers = data.total_players;

        if(document.getElementById("total_player")) {
            document.getElementById("total_player").innerText = formatador.format(totalPlayers);
        }
        if(document.getElementById("total_pontos")) {
            document.getElementById("total_pontos").innerText = formatador.format(somaPonints)
        }
    } catch (error) {
        console.error("Erro ao carregar ranking:", error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    pegarNick();
});