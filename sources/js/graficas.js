function crearGrafica(idCaja, type = 'bar', labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], title = '# of Votes', data = [12, 19, 3, 5, 2, 3], border = 1) {
    const ctx = document.getElementById(idCaja);
    var colors = ["#01ab6786", "#0060f179", "#f39e0186", "#e813007a"];

    var chart = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: colors,
                borderWidth: border,
                fill: true,

            }]
        },
        options: {
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'easeInCubic',
                    from: .1,
                    to: 0,
                    loop: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    return chart;
}

function modifiedData(...parameters){

    const params = parameters[0];
    const data = params.data;
    var newData = {};

    newData.labels = Object.keys(data.data);

    newData.values = [];

    newData.labels.forEach(key => {
        newData.values.push(data.data[key]);
    });

    return crearGrafica(params.idCaja, params.type, newData.labels, params.title, newData.values, params.border);
}

const urlDashboard = "/user/getDataDashboard";
const pendientes = document.getElementById("pendientes");
const canceladas = document.getElementById("cancelados");
const realizadas = document.getElementById("realizados");
const camino = document.getElementById("camino");



function cardsData(...parameters){
    const data = parameters[0].data;

    console.log(data);
    
    pendientes.innerHTML = data.data.earring;
    realizadas.innerHTML = data.data.deliveried;
    canceladas.innerHTML = data.data.canceled;
    camino.innerHTML = data.data.comming;
}

const query = new Provider(urlDashboard, null, null, "GET", cardsData, true);
query.operate();

const query2 = new Provider("/user/getDataShops", null, null, "GET", modifiedData, true, {idCaja : "canvas1", type : "polarArea", title : "N° de unidades vendidas", border : 1});
query2.operate();