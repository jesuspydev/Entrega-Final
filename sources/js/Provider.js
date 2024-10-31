class Provider {
    host = "https://tumercado.website";
    charger = null;
    button = null;
    parameters = null;
    func = null;

    config = {
    };

    graphic = null;

    constructor(route, body, button, method, func, auth = false, parameters = {}, multiplatform = false) {

        var headers = new Headers();

        console.log(headers);
        

        this.charger = document.getElementById("charger");
        this.charger.style = 'display: block;';
        this.route = route;

        if (body != null) {
            body = (body instanceof FormData) ? body : JSON.stringify(body);
            this.config.body = body;
        }

        this.button = button;
        this.config.method = method;
        this.parameters = parameters;
        this.func = func;

        if (auth && sessionStorage.getItem("token") != null) {
            console.log("Estaaaaaa");
            
            headers.append("Authorization" , "Bearer " + sessionStorage.getItem("token"));
            
        }
        if (multiplatform) {
            headers.append("Content-Type", "multipart/form-data");
        }else{
            headers.append("Content-Type", "application/json");
        }

        console.log(headers);
        
        this.config.headers = headers;

        console.log(this.config);
    }

    operate() {

        console.log(this.config);
        console.log("Configuración");
        
        

        fetch(this.host + this.route, this.config)

            .then(response => response.json())

            .then(data => {
                console.log(data);
                console.log(this.config.body);

                if ("error" in data) {
                    if("T" == data.error[0]){
                        alert(data.message);
                        window.location = "index.html";
                    }
                    
                } else {
                    this.parameters["data"] = data;
                    if (!(this.func == null)) {
                        this.graphic = this.func(this.parameters);
                    }
                }

            })

            .catch(error => {

                console.error(error);
                
                const colorIcon = "#e81400";
                const message = "No se pudo conectar al servidor";
                const toast = new Toast(colorIcon, message);
                toast.show();
            })

            .finally(() => {
                this.charger.style = 'display: none;';

                if (this.button != null) {
                    this.button.disabled = false;
                }
                
            });
    }

    getData() {
        console.log(this.data);
        return this.data;
    }
}

class FormProvider {

    constructor(formData, route) {


        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        console.log(sessionStorage.getItem("token"));
        
        
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData
        };

        fetch("https://tumercado.website/" + route, requestOptions)
            .then((response) => response.json())
            .then(data => {
                var color = "#005ff1";
                if ("error" in data) {
                    color = "#e81400";
                    console.log(data);
                    
                } else {
                    form.reset();
                }

                const toast = new Toast(color, data["message"]);
                toast.show()

            })
            .catch(error => {
                const colorIcon = "#e81400";
                const message = "No se pudo conectar al servidor, no se enviaron los datos";
                const toast = new Toast(colorIcon, message);
                toast.show()
            })
        
    }
}