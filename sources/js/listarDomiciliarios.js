const table = document.getElementById("dealers");
const host = "http://tumercado.website/admin/"

function getDealers() {
    fetch(host + "getAllDelivery", {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            const dealers = data.dealers;
            console.log(data);

            dealers.forEach(delivery => {
                console.log(delivery);
                const item = table.insertRow();
                item.setAttribute("class", (!delivery.busy) ? "table-success" : "table-danger");
                item.id = delivery.id;

                const name = item.insertCell();
                name.setAttribute("class", "name");
                name.innerHTML = delivery.firstName + " " + delivery.lastName;

                const vehicleObj = delivery.vehicle[0];
                const vehicle = item.insertCell();
                vehicle.setAttribute("class", "vehicle");
                vehicle.innerHTML = vehicleObj.vehicleType;

                const dataVehicle = item.insertCell();
                dataVehicle.setAttribute("class", "dataVehicle");
                dataVehicle.innerHTML = vehicleObj.brand + " " + vehicleObj.model + " " + vehicleObj.licensePlate;

                const status = item.insertCell();
                status.setAttribute("class", "status");
                status.innerHTML = (!delivery.busy) ? "Libre" : "Entregando un pedido";

                const actions = item.insertCell();
                actions.setAttribute("class", "acciones");
                actions.innerHTML = `<span type="button" class="fa-solid fa-pencil" data-bs-toggle="modal" data-bs-target="#editar"></span>

                        <span type="button" class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#eliminar">
                        </span>`

            });
        })
}

getDealers()