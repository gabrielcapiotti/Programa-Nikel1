const myModal = new bootstrap.Modal("#transações-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let CashIn = [];
let CashOut = [];
let data = {
    transações: []

}

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transações-button").addEventListener("click",function() {
    window.location.href = "transações.html";

})

//adicionar lançamento
document.getElementById("transações-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input");
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transações.unshift ({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getCashIn();
    getCashOut();
    getTotal();

    alert("Lançamento adicionado com sucesso");

});


checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashIn() {
    const transações = data.transações;

    const CashIn = transações.filter((item) => item.type === "1");

    if (CashIn.length) {
        let CashInHtml = ``;
        let limit = 0;

        if (CashIn.length > 5) {
            limit = 5;
        } else {
            limit = CashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            CashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">${CashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${CashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${CashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        document.getElementById("cash-in-list").innerHTML = CashInHtml;
    }
}

function getCashOut() {
    const transações = data.transações;

    const CashOut = transações.filter((item) => item.type === "2");

    if (CashOut.length) {
        let CashOutHtml = ``;
        let limit = 0;

        if (CashOut.length > 5) {
            limit = 5;
        } else {
            limit = CashOut.length;
        }

        for (let index = 0; index < limit; index++) {
            CashOutHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">${CashOut[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${CashOut[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${CashOut[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        document.getElementById("cash-out-list").innerHTML = CashOutHtml;
    }
}

function getTotal() {
    const transações = data.transações;
    let total = 0;

    transações.forEach((item) => {
    if(item.type === "1") {
        total += item.value;
    } else { 
        total -= item.value;
    }

    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;

}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}