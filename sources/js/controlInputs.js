var vehiculo = document.getElementById("vehiculo");
var placa = document.getElementById("placa");
var soat = document.getElementById("soat");

vehiculo.addEventListener("change", function (){
    if (this.value == "bicicleta"){
        placa.value = soat.value = "No aplica";
        placa.disabled = soat.disabled = true;
    }
    else{
        placa.value = soat.value = "";
        placa.disabled = soat.disabled = false;
    }
})