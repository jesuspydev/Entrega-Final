const bodyOrders = getWithId("tableOrders");

const myModal = new bootstrap.Modal(getWithId('exampleModalToggle'), {
    keyboard: false
});

const addressOrder = getWithId("address");
const detailsOrder = getWithId("details");
const valueOrder = getWithId("valueOrder");
const productsOrder = getWithId("productsOrder");
const inputDelivery = getWithId("deliveryId");
const deliveryRun = getWithId("deliveryRun");

const form = document.querySelector("form");
console.log(form);


form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formdata = new FormData(form);

    formdata.append("deliveryId" , inputDelivery.value)
    formdata.append("orderId" , orderId)

    const queryRun = new FormProvider(formdata, "admin/asignedDelivery");
})

var orderId = null;

function buildBtnDealers(data){
    const dealers = data.data.dealers;

    inputDelivery.innerHTML = "";
    const defaultOp = create("option");
    defaultOp.disabled = true;
    defaultOp.textContent = "Selecciona un domiciliario";

    inputDelivery.appendChild(
        defaultOp
    )

    inputDelivery.selectedIndex = 0;

    dealers.forEach(delivery => {
        const newOp = create("option");
        newOp.value = delivery.id;
        newOp.textContent = `${delivery.firstName} ${delivery.lastName}`;

        inputDelivery.appendChild(newOp)
    });
}


function renderOrders(data){

    const orders = data.data.orders;

    orders.forEach(order => {
        
        const item = bodyOrders.insertRow();
        item.setAttribute("class", "table-success");

        const address = item.insertCell();
        address.textContent = order.address;

        const value = item.insertCell();
        value.textContent = formatCurrency(order.value.toString());

        const timeOrder = item.insertCell();
        timeOrder.textContent = order.time;

        const actions = item.insertCell();
        actions.setAttribute("class", "actions");

        const btnWatch = document.createElement("button");
        btnWatch.setAttribute("class", "btn btn-primary semi-circle");
        btnWatch.innerHTML = `<i class="fa-solid fa-eye"></i>`;

        actions.appendChild(btnWatch);

        btnWatch.addEventListener("click", () => {

            document.addEventListener("keydown", (key) => {
                if (key.key === "Escape") {
                    myModal.hide();
                    orderId = null;
                }
            })



            addressOrder.textContent = order.address;
            valueOrder.textContent = formatCurrency(order.value.toString());
            detailsOrder.textContent = order.details;

            orderId = order.id;

            const queryDealers = new Provider("/admin/getAllDelivery", null, null, "GET", buildBtnDealers, true);
            queryDealers.operate()

            order.products.forEach(product => {
                const item = productsOrder.insertRow();
                item.setAttribute("class", "table-info");

                const nameProduct = item.insertCell();
                nameProduct.textContent = product.name;

                const store = item.insertCell();
                store.textContent = product.store;

                const amount = item.insertCell();
                amount.textContent = product.amount;
            });
            
            myModal.show()
        })
    });
}

const getOrders = new Provider("/admin/getPendingOrders", null, null, "GET", renderOrders, true);
getOrders.operate()