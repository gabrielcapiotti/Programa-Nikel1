const myModal = new bootstrap.Modal("#exampleModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged()

//logar sistema
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("senha-input").value;
    const checkSession = document.getElementById("session-input").checked;

    const account = getAccount(email);


    if(!account) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }

    if(account) {
        if(account.senha !== senha) {
            alert("Ops!Verifique o usuário ou senha corretos");
            return;

        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }

});

//criar conta
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("executor").value;
    const senha = document.getElementById("execução").value;

    if(email.length <5) {
        alert("Opps! Preencha o campo com um e-mail válido.");
        return;
    }

    if(senha.length <5) {
        alert("Preencha a senha com no mínimo 4 digitos.");
        return;
    }

    saveAccount({
        login: email,
        senha: senha,
        transações: []

    });

    myModal.hide();

    alert("Conta criada com sucesso")
})


function checkLogged() {
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data))

}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key)

    if(account) {
        return JSON.parse(account);

    }
        return "";

}




