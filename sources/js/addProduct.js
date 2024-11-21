const price = document.getElementById("price");
const divStock = document.getElementById("stocks");

price.addEventListener("keydown", (event) => {
    if (event.key == "Tab") {
        price.value = formatCurrency(price.value);
    }
    else {
        actionAmounts(event, price);
    }
})

function getStores(...parameters) {
    const stores = parameters[0].data.stores;

    if (stores.length > 0) {

        stores.forEach(store => {
            const stock = document.createElement("div");
            stock.setAttribute("class", "stock mb-3 row");

            const label = document.createElement("label");
            label.setAttribute("class", "col-sm-2 col-form-label");
            label.setAttribute("for", store["id"]);
            label.innerHTML = store.name;

            const contentAmount = document.createElement("div");
            contentAmount.setAttribute("class", "col-sm-2");

            const amount = document.createElement("input");
            amount.setAttribute("class", "form-control");
            amount.setAttribute("placeholder", "Ingrese un valor, si no hay unidades, marque 0");
            amount.id = store["id"];
            amount.value = 0;
            contentAmount.appendChild(amount);

            stock.appendChild(label);
            stock.appendChild(contentAmount);
            divStock.appendChild(stock);
        });

        const stocks = divStock.querySelectorAll("input");


        stocks.forEach(input => {
            input.addEventListener("keydown", (event) => {
                if (commandSpecial(event.key) && !validateInputNumber(event.key)) {
                    event.preventDefault();
                }
            })
        });
    } else {

        const icon = document.getElementById("iconNotification");
        const body = document.getElementById("bodyNotification");
        icon.style = "color: #e81400;";
        body.innerHTML = "No existen bodegas registradas, por favor agregue alguna";
        const toastContent = document.querySelector(".toast");
        const toast = new bootstrap.Toast(toastContent);
        toast.show();
    }


}

const query = new Provider("/admin/getStores", null, null, "GET", getStores, true);
query.operate();

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {

    event.preventDefault();
    const inputs = divStock.querySelectorAll("input");
    console.log(inputs);
    let values = [];

    inputs.forEach(stock => {

        values.push({
            "storeId" : stock.id,
            "amount" : getInt(stock.value)
        })
    });

    const formdata = new FormData(form);

    formdata.append("price", getNumber(price.value));
    formdata.append("stocks", JSON.stringify(values));

    console.log(formdata);
    console.log("data");
    
    

    const query = new FormProvider(formdata, "admin/createProduct");
})