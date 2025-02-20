const loginBtn = document.getElementById("loginBtn");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    loginBtn.disabled = true;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const route = "/admin/login";

    const body = {
        email: email,
        password: password,
        tokenFire: sessionStorage.getItem('tokenFire')
    }

    console.log(body);


    function login(...parameters) {
        const data = parameters[0].data;
        console.log(data);
        if (data != null && data.hasOwnProperty("token")) {
            console.log(data);

            sessionStorage.setItem("token", data.token);
            location.href = "dashboard.html";
        }
        else {
            alert(data.message);
        }
    }

    const query = new Provider(route, body, loginBtn, "POST", login, false);
    query.operate();

});
