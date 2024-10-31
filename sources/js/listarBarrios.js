const table = document.getElementById("neighbordhoods");
const host = "https://tumercado.website/admin/"

function getAllNeighborshood(){
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
            price.setAttribute("class", "price");
            price.innerHTML = formatCurrency(neighbordhood.price.toString());

            const timeMin = item.insertCell();
            timeMin.setAttribute("class", "timeMin");
            timeMin.innerHTML = neighbordhood.timeMin;

            const timeMax = item.insertCell();
            timeMax.setAttribute("class", "timeMax");
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