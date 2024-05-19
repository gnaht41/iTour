document.addEventListener('DOMContentLoaded', function (){
    let accountAvartar = document.querySelector(".accountAvartar")
    let btnLogout = document.querySelector(".logOutBtn")
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    let btnLogin = document.querySelector("#login").parentElement
    let  btnSignUp = document.querySelector("#signUp").parentElement
    if(currentUser != null) {
        accountAvartar.classList.remove("d-none")
        accountAvartar.classList.add("d-block")
        if(currentUser.name != null) {
            accountAvartar.querySelector("a").innerHTML = '<i class="fa-regular fa-circle-user"></i>' + currentUser.name
        }
        else {
            accountAvartar.querySelector("a").innerHTML ='<i class="fa-regular fa-circle-user"></i>'+ currentUser.id
        }
        btnLogout.classList.remove("d-none")
        btnLogout.classList.add("d-block")
        btnLogin.classList.remove("d-block")
        btnLogin.classList.add("d-none")
        btnSignUp.classList.remove("d-block")
        btnSignUp.classList.add("d-none")
    }

    btnLogout.onclick = function() {
        accountAvartar.classList.add("d-none")
        accountAvartar.classList.remove("d-block")
        accountAvartar.querySelector("a").innerText = "Account"
        btnLogout.classList.add("d-none")
        btnLogout.classList.remove("d-block")
        btnLogin.classList.add("d-block")
        btnLogin.classList.remove("d-none")
        btnSignUp.classList.add("d-block")
        btnSignUp.classList.remove("d-none")
        localStorage.setItem("userTemp",JSON.stringify(JSON.parse(localStorage.getItem("currentUser"))))
        localStorage.removeItem("currentUser")
        window.location.reload()
        
    }
})