const table = document.getElementById("products");
const host = "http://82.29.152.181:5000/admin/"

const closeEdit = document.getElementById("closeEdit");
const closeDelete = document.getElementById("closeDelete");

const priceEdit = document.getElementById("editPrice");
const descEdit = document.getElementById("editDesc");
const nameEdit = document.getElementById("editName");
const amountEdit = document.getElementById("amount");

let idStock = null;


const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formdata = new FormData(form);

    formdata.append("price", getNumber(priceEdit.value));
    formdata.append("id", idStock);

    const update = new FormProvider(formdata, "admin/editProduct", false, getProducts)

    closeEdit.click();

})



priceEdit.addEventListener("keydown", (event) => {
    if (event.key == "Tab") {

        priceEdit.value = formatCurrency(priceEdit.value);
    }
    else {
        actionAmounts(event, priceEdit);
    }
})

function getProducts() {
    fetch(host + "getProductsDetails")
        .then(response => response.json())
        .then(data => {

            table.innerHTML = "";
            const products = data.products;

            products.forEach(product => {

                const stocks = product.stocks;

                stocks.forEach(stock => {
                    const item = table.insertRow();
                    item.setAttribute("class", (stock.stock > 0) ? ((stock.stock <= 50) ? "table-warning" : "table-success") : "table-danger");
                    item.id = stock.id;

                    const name = item.insertCell();
                    name.setAttribute("class", "name");
                    name.innerHTML = product.name;

                    const price = item.insertCell();
                    price.setAttribute("class", "price c-num");
                    price.innerHTML = formatCurrency(product.price.toString());

                    const amount = item.insertCell();
                    amount.setAttribute("class", "stock c-num");
                    amount.innerHTML = stock.stock;

                    const store = item.insertCell();
                    store.setAttribute("class", "store");
                    store.innerHTML = stock.store;

                    const actions = item.insertCell();
                    actions.setAttribute("class", "acciones");

                    const btnEdit = document.createElement("span");
                    btnEdit.setAttribute("type", "button");
                    btnEdit.setAttribute("class", "fa-solid fa-pencil");
                    btnEdit.setAttribute("data-bs-target", "#editar")
                    btnEdit.setAttribute("data-bs-toggle", "modal")

                    btnEdit.addEventListener("click", () => {
                        priceEdit.value = formatCurrency(product.price.toString());
                        nameEdit.value = product.name;
                        descEdit.value = product.description;
                        amountEdit.value = stock.stock;
                        idStock = stock.id
                    })

                    const btnDelete = document.createElement("span");
                    btnDelete.setAttribute("type", "button");
                    btnDelete.setAttribute("class", "fa-solid fa-trash");
                    btnDelete.setAttribute("data-bs-target", "#eliminar");
                    btnDelete.setAttribute("data-bs-toggle", "modal");


                    actions.appendChild(btnEdit);
                    actions.appendChild(btnDelete);
                });

            });
        })
}

getProducts()