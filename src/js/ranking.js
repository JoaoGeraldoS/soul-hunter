async function pegarNick() {
    try {
        const response = await fetch('https://soul-hunter.onrender.com/ranking');
        const data = await response.json();

        const tabelaBody = document.getElementById("ranking-body");
        tabelaBody.innerHTML = "";

        const formatador = new Intl.NumberFormat('pt-BR');

        const somaPontosTotal = data.total_points;
        const totalUsuarios = data.total_players;
       
        
        data.players.forEach((element, index) => {
           
            const tr = document.createElement("tr");
            tr.className = "rank-top";

            tr.innerHTML = `
                <td class="rank-cell">
                    <span class="rank-icon">${index === 0 ? '👑' : index + 1}</span>
                </td>
                <td class="player-name">${element.nick}</td>
                <td><span class="badge badge-level">${element.level || 0}</span></td>
                <td><span class="badge badge-warrior">${element.classe || 'Arqueira'}</span></td>
                <td class="points">${element.points}</td>  
            `;

            tabelaBody.appendChild(tr);
        });

        document.getElementById("total_player").innerText = formatador.format(totalUsuarios);
        document.getElementById("total_pontos").innerText = formatador.format(somaPontosTotal);
        

    } catch (error) {
        console.error("Erro ao carregar ranking:", error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    pegarNick();
});