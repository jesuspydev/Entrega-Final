const form = document.getElementById("form");
const licensePlate = document.getElementById("placa");

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const formdata = new FormData(form);

    formdata.append("licensePlate", licensePlate.value);
    formdata.append("soat", soat.value);

    const query = new FormProvider(formdata, "delivery/signUp");
})