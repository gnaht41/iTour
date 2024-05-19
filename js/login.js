document.addEventListener('DOMContentLoaded', function () {
    let userToggler = document.getElementById('user-toggler');
    let navbarToggler = document.getElementById('navbar-toggler');
    let collapsibleNavbar = document.getElementById('collapsibleNavbar');
    let user = document.getElementById('user');
    userToggler.addEventListener('click', function () {
        if (collapsibleNavbar.classList.contains('show')) {
            navbarToggler.click();
        }
    });
  
    navbarToggler.addEventListener('click', function () {
        if (user.classList.contains('show')) {
            userToggler.click();
        }
    });
    let btnLogin = document.querySelector("#loginbtn")
    let loginEmailOrPhone = document.querySelector("#email")
    let loginPass = document.querySelector("#pass")
    let passHide=document.querySelector("#pass-hide")
    let pass
    let flagLogins = [0,0] 
    passHide.addEventListener('click', function(){
        if(loginPass.type == 'password'){
            loginPass.type='text'
            this.innerHTML='<i class="fas fa-eye"></i>'
        }
        else{
            loginPass.type='password'
            this.innerHTML='<i class="fas fa-eye-slash"></i>'
        }
    })
   function  autoFillToForm() {
        let obj = JSON.parse(localStorage.getItem("currentUser"))
        if(obj == null) obj = JSON.parse(localStorage.getItem("userTemp"))
        if(obj){
        loginEmailOrPhone.value = obj.id
        
        loginPass.value = obj.pass
        }
    }
    autoFillToForm() 

    loginEmailOrPhone.addEventListener('blur', function(){
        if(checkEmailOrPhoneExists()){
            loginEmailOrPhone.nextElementSibling.innerHTML='Email or Phone number'
            loginEmailOrPhone.classList.add('is-valid')
            loginEmailOrPhone.classList.remove('is-invalid')
            loginEmailOrPhone.nextElementSibling.classList.add('text-success')
            loginEmailOrPhone.nextElementSibling.classList.remove('text-danger')
        }
        else{
            if(loginEmailOrPhone.value==''){
            loginEmailOrPhone.nextElementSibling.innerHTML='Không được để trống'
            loginEmailOrPhone.classList.remove('is-valid')
            loginEmailOrPhone.classList.add('is-invalid')
            loginEmailOrPhone.nextElementSibling.classList.add('text-danger')
            loginEmailOrPhone.nextElementSibling.classList.remove('text-success')

            }
            else{
            loginEmailOrPhone.nextElementSibling.innerHTML='Tài khoản chưa tồn tại'
            loginEmailOrPhone.classList.remove('is-valid')
            loginEmailOrPhone.classList.add('is-invalid')
            loginEmailOrPhone.nextElementSibling.classList.add('text-danger')
            loginEmailOrPhone.nextElementSibling.classList.remove('text-success')
            }
        }
    })

    loginEmailOrPhone.onchange = function() {
        if(checkEmailOrPhoneExists()) {
            if(!checkPass()) {
                loginPass.nextElementSibling.innerHTML='Mật khẩu sai'
                loginPass.classList.remove('is-valid')
                loginPass.classList.add('is-invalid')
                loginPass.nextElementSibling.classList.add('text-danger')
                loginPass.nextElementSibling.classList.remove('text-success')
            }
        }
        
    }

    loginPass.addEventListener('blur', function(){
        if(checkPass()){
            loginPass.nextElementSibling.innerHTML='Password'
            loginPass.classList.add('is-valid')
            loginPass.classList.remove('is-invalid')
            loginPass.nextElementSibling.classList.add('text-success')
            loginPass.nextElementSibling.classList.remove('text-danger')
        }
        else{
            loginPass.nextElementSibling.innerHTML='Mật khẩu sai'
            loginPass.classList.remove('is-valid')
            loginPass.classList.add('is-invalid')
            loginPass.nextElementSibling.classList.add('text-danger')
            loginPass.nextElementSibling.classList.remove('text-success')
        }
    })

    function checkEmailOrPhoneExists() {
        let found = false;
        let userinfors = JSON.parse(localStorage.getItem("users"))||[]
        userinfors.forEach(element => {
            if(element.id == loginEmailOrPhone.value.trim()) {
                pass = element.pass;
                found = true;
            }
        });
        if(found == false) flagLogins[0] = 0
        else flagLogins[0] = 1
        return found;
    }
    
    
    function checkPass() {
        if(pass == loginPass.value.trim()) {
            flagLogins[1] = 1
            return true;
        }
        flagLogins[1] = 0
        return false;
    }

    checkEmailOrPhoneExists()
    checkPass()
    
    btnLogin.onclick = function() {
        if(loginEmailOrPhone.value == '' || loginPass.value == '') {
            if(loginEmailOrPhone.value == '') {
                loginEmailOrPhone.nextElementSibling.innerHTML='Không được để trống'
                loginEmailOrPhone.classList.remove('is-valid')
                loginEmailOrPhone.classList.add('is-invalid')
                loginEmailOrPhone.nextElementSibling.classList.add('text-danger')
                loginEmailOrPhone.nextElementSibling.classList.remove('text-success')
                loginEmailOrPhone.focus()
            }
            else if(loginPass.value == '') {
                loginPass.nextElementSibling.innerHTML='Không được để trống'
                loginPass.classList.remove('is-valid')
                loginPass.classList.add('is-invalid')
                loginPass.nextElementSibling.classList.add('text-danger')
                loginPass.nextElementSibling.classList.remove('text-success')
                loginPass.focus()
            }
        }
        checkEmailOrPhoneExists()
        checkPass()
        if(flagLogins[0] == flagLogins[1] && flagLogins[0] == 1) {
        let currentUser
        let userinfors = JSON.parse(localStorage.getItem("users"))
        userinfors.forEach(function(item) {
        if(item.id == loginEmailOrPhone.value.trim()) {
            currentUser = item
        }
        localStorage.setItem("currentUser",JSON.stringify(currentUser))
        window.location.href = "../html/homepage.html"
        })
        }
    }
 })