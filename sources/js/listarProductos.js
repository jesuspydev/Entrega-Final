const table = document.getElementById("products");
const host = "http://145.223.73.73:5000/admin/"

function getProducts(){
    fetch(host + "getProductsDetails")
    .then(response => response.json())
    .then(data => {
        const products = data.products;

        products.forEach(product => {
            
            const stocks = product.stocks;

            stocks.forEach(stock => {
                const item = table.insertRow();
                item.setAttribute("class", (stock.stock > 0)? ( (stock.stock <= 50)? "table-warning" : "table-success" ): "table-danger");
                item.id = stock.id;

                const name = item.insertCell();
                name.setAttribute("class", "name");
                name.innerHTML = product.name;

                const price = item.insertCell();
                price.setAttribute("class", "price");
                price.innerHTML = formatCurrency(product.price.toString());

                const amount = item.insertCell();
                amount.setAttribute("class", "stock");
                amount.innerHTML = stock.stock;

                const store = item.insertCell();
                store.setAttribute("class", "store");
                store.innerHTML = stock.store;

                const actions = item.insertCell();
                actions.setAttribute("class", "acciones");
                actions.innerHTML = `<span type="button" class="fa-solid fa-pencil" data-bs-toggle="modal" data-bs-target="#editar"></span>

                            <span type="button" class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#eliminar">
                            </span>`
            });

        });
    })
}

getProducts()