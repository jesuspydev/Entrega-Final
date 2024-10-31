const main = document.querySelector("main");
const charger = document.createElement("div");
charger.id = "charger";
const snip = document.createElement("div");
snip.classList.add("spinner");
charger.appendChild(snip);
main.appendChild(charger);

class Toast {

    toast = null;
    content = null;

    constructor(colorIcon, message) {
        const toastContent = document.createElement("div");
        this.content = toastContent;
        toastContent.setAttribute("class", "toast fixed-bottom m-3");
        toastContent.role = "alert";
        toastContent.ariaLive = "assertive";
        toastContent.ariaAtomic = true;

        const headerT = document.createElement("div");
        headerT.setAttribute("class", "toast-header");
        headerT.innerHTML = "<strong class='me-auto' id='titleNotification'><span class='fa-solid fa-bell' id='iconNotification' style = ' margin-right: 10px; color : " + colorIcon + " ; '" + "></span>  Notificación</strong><button type='button' class='btn-close' data-bs-dismiss='toast' aria-label='Close'></button>";
        const bodyT = document.createElement("div");
        bodyT.setAttribute("class", "toast-body");
        bodyT.innerHTML = message;

        toastContent.appendChild(headerT);
        toastContent.appendChild(bodyT);

        main.appendChild(toastContent);

        const icon = document.getElementById("iconNotification");

        this.toast = new bootstrap.Toast(toastContent);

    }

    show() {
        this.toast.show();
        setTimeout(() => {
            this.content.remove();
        }, 3000);
    }
}


window.addEventListener('load', () => {
    charger.style.display = 'none';
});