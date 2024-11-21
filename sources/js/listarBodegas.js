const table = document.getElementById("stores");
const host = "http://tumercado.website:5000/admin/"

function getStores() {
    fetch(host + "getStores", {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            const stores = data.stores;
            console.log(data);

            stores.forEach(store => {
                console.log(store);
                const item = table.insertRow();
                item.setAttribute("class", "table-success");
                item.id = store.id;

                const name = item.insertCell();
                name.setAttribute("class", "name");
                name.innerHTML = store.name;
                

                const address = item.insertCell();
                address.setAttribute("class", "address");
                address.innerHTML = store.address;

                const actions = item.insertCell();
                actions.setAttribute("class", "acciones");
                actions.innerHTML = `<span type="button" class="fa-solid fa-pencil" data-bs-toggle="modal" data-bs-target="#editar"></span>

                        <span type="button" class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#eliminar">
                        </span>`

            });
        })
}

getStores()