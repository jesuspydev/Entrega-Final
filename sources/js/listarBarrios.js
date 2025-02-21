const table = document.getElementById("neighbordhoods");
const host = "http://82.29.152.181:5000/admin/"

function getAllNeighborshood() {
    fetch(host + "getAllNeighborshood")
        .then(response => response.json())
        .then(data => {
            const neighbordhoods = data.neighbordhoods;

            neighbordhoods.forEach(neighbordhood => {
                console.log(neighbordhood);
                const item = table.insertRow();
                item.setAttribute("class", "table-success");
                item.id = neighbordhood.id;

                const name = item.insertCell();
                name.setAttribute("class", "name");
                name.innerHTML = neighbordhood.name;

                const price = item.insertCell();
                price.setAttribute("class", "price c-num");
                price.innerHTML = formatCurrency(neighbordhood.price.toString());

                const timeMin = item.insertCell();
                timeMin.setAttribute("class", "timeMin c-num");
                timeMin.innerHTML = neighbordhood.timeMin;

                const timeMax = item.insertCell();
                timeMax.setAttribute("class", "timeMax c-num");
                timeMax.innerHTML = neighbordhood.timeMax;

                const actions = item.insertCell();
                actions.setAttribute("class", "acciones");
                actions.innerHTML = `<span type="button" class="fa-solid fa-pencil" data-bs-toggle="modal" data-bs-target="#editar"></span>

                        <span type="button" class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#eliminar">
                        </span>`

            });
        })
}

getAllNeighborshood()