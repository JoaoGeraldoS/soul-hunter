// Seleciona o formulário
const loginForm = document.getElementById("form-login");

loginForm.addEventListener("submit", (event) => {
    // Impede a página de recarregar ao clicar no botão
    event.preventDefault();

    // Pega o valor do input dentro do evento (na hora do clique)
    let nickName = document.getElementById("nick").value;

    const loginData = {
        nick: nickName
    };

    fetch("https://soul-hunter.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error("Falha no login");
    })
    .then(data => {
        console.log("Sucesso:", data);
        
        localStorage.setItem("usuarioLogado", nickName);

        if (data === nickName || data.nick === nickName || data !== "Visitante") {
            console.log("Login validado!");
            
        } else {
            alert("Erro na validação do usuário.");
        }

        window.location.href = "demo.html"; 
        
        // 2. Redireciona para a página desejada
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Usuário não encontrado ou erro no servidor!");
    });
});