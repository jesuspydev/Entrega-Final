const form = document.getElementById("form");
const price = document.getElementById("price");
const timeMax = document.getElementById("timeMax");

timeMax.addEventListener("keydown", (event) =>{
    if(commandSpecial(event.key) && !validateInputNumber(event.key)){
        event.preventDefault();
    }
})

const timeMin = document.getElementById("timeMin");

timeMin.addEventListener("keydown", (event) =>{
    if(commandSpecial(event.key) && !validateInputNumber(event.key)){
        event.preventDefault();
    }
})

price.addEventListener("keydown", (event) => {
    if(event.key == "Tab"){
        price.value = formatCurrency(price.value);
    }
    else{
        actionAmounts(event, price);
    }
})

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const formdata = new FormData(form);

    formdata.append("price", getNumber(price.value));
    formdata.append("timeMin", getInt(timeMin.value));
    formdata.append("timeMax", getInt(timeMax.value));

    const query = new FormProvider(formdata, "admin/createNeighbordhood");
})