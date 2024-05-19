
let btnSignUp = document.querySelector('#signUp')
let btnlogIn = document.querySelector("#login")
let btnCreateAccount = document.querySelector("#createAccount")

let inputEmailorPhoneNumber = document.querySelector("#email")
let inputPass = document.querySelector("#pass")
let inputPassConfirm = document.querySelector("#passconfirm")
let flagsSignUps = [0,0,0,0]
let inputSignUps = [inputEmailorPhoneNumber,inputPass,inputPassConfirm]
let hoten=document.getElementById('hoten')
let contactMethod = false
// false is phone
// true is email
let userids = loadFromLocalStorage().map(function(x) {
    return x.id
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{3,10}$/
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])\S{6,}$/;
const nameReg=/^([A-Z][a-z]+\s)*([A-Z][a-z]+)+$/;
inputEmailorPhoneNumber.addEventListener('blur', function(){
    if(emailRegex.test(inputEmailorPhoneNumber.value.trim())||phoneRegex.test(inputEmailorPhoneNumber.value.trim())){
        if(!userids.includes(inputEmailorPhoneNumber.value.trim())) {
            if(emailRegex.test(inputEmailorPhoneNumber.value.trim())) contactMethod = true
            else contactMethod = false
            inputEmailorPhoneNumber.nextElementSibling.innerHTML='Email or Phone number'
            inputEmailorPhoneNumber.classList.add('is-valid')
            inputEmailorPhoneNumber.classList.remove('is-invalid')
            inputEmailorPhoneNumber.nextElementSibling.classList.add('text-success')
            inputEmailorPhoneNumber.nextElementSibling.classList.remove('text-danger')
            flagsSignUps[0] = 1
        }
        else {
            inputEmailorPhoneNumber.nextElementSibling.innerHTML='Email hoặc số điện thoại này đã được sử dụng'
            inputEmailorPhoneNumber.classList.remove('is-valid')
            inputEmailorPhoneNumber.classList.add('is-invalid')
            inputEmailorPhoneNumber.nextElementSibling.classList.add('text-danger')
            inputEmailorPhoneNumber.nextElementSibling.classList.remove('text-success')
            flagsSignUps[0] = 0
        }
    }
    else{
        inputEmailorPhoneNumber.nextElementSibling.innerHTML='Email hoặc số điện thoại không hợp lệ'
        inputEmailorPhoneNumber.classList.remove('is-valid')
        inputEmailorPhoneNumber.classList.add('is-invalid')
        inputEmailorPhoneNumber.nextElementSibling.classList.add('text-danger')
        inputEmailorPhoneNumber.nextElementSibling.classList.remove('text-success')
        flagsSignUps[0] = 0
    }
})
inputPass.addEventListener('blur', function(){
    if(passwordRegex.test(inputPass.value)){
        inputPass.nextElementSibling.innerHTML='Password'
        inputPass.classList.add('is-valid')
        inputPass.classList.remove('is-invalid')
        inputPass.nextElementSibling.classList.add('text-success')
        inputPass.nextElementSibling.classList.remove('text-danger')
        flagsSignUps[1] = 1
    }
    else{
        if(inputPass.value==''){
            inputPass.nextElementSibling.innerHTML='Mật khẩu không được để trống'
        inputPass.classList.remove('is-valid')
        inputPass.classList.add('is-invalid')
        inputPass.nextElementSibling.classList.add('text-danger')
        inputPass.nextElementSibling.classList.remove('text-success')
        flagsSignUps[1] = 0
        }
        else{
        inputPass.nextElementSibling.innerHTML='Mật khẩu có tối thiểu 6 ký tự bao gồm số, chữ cái và ký tự đặc biệt'
        inputPass.classList.remove('is-valid')
        inputPass.classList.add('is-invalid')
        inputPass.nextElementSibling.classList.add('text-danger')
        inputPass.nextElementSibling.classList.remove('text-success')
        flagsSignUps[1] = 0
        }
    }
    if(inputPassConfirm.value !== inputPass.value&&inputPass.value!=''&&inputPassConfirm.value!=''){
        inputPassConfirm.nextElementSibling.innerHTML='Mật khẩu không khớp'
        inputPassConfirm.classList.remove('is-valid')
        inputPassConfirm.classList.add('is-invalid')
        inputPassConfirm.nextElementSibling.classList.add('text-danger')
        inputPassConfirm.nextElementSibling.classList.remove('text-success')
        flagsSignUps[2] = 0
    }
})
inputPassConfirm.addEventListener('blur', function(){
    if(inputPassConfirm.value === inputPass.value&&inputPass.value!=''){
        inputPassConfirm.nextElementSibling.innerHTML='Comfirm password'
        inputPassConfirm.classList.add('is-valid')
        inputPassConfirm.classList.remove('is-invalid')
        inputPassConfirm.nextElementSibling.classList.add('text-success')
        inputPassConfirm.nextElementSibling.classList.remove('text-danger')
        flagsSignUps[2] = 1
    }
    else{
        inputPassConfirm.nextElementSibling.innerHTML='Mật khẩu không khớp'
        inputPassConfirm.classList.remove('is-valid')
        inputPassConfirm.classList.add('is-invalid')
        inputPassConfirm.nextElementSibling.classList.add('text-danger')
        inputPassConfirm.nextElementSibling.classList.remove('text-success')
        flagsSignUps[2] = 0
    }
})
hoten.addEventListener('blur',function(){
    if(nameReg.test(hoten.value)){
        hoten.nextElementSibling.innerHTML='Your Name'
        hoten.classList.add('is-valid')
        hoten.classList.remove('is-invalid')
        hoten.nextElementSibling.classList.add('text-success')
        hoten.nextElementSibling.classList.remove('text-danger')
        flagsSignUps[3] = 1
    }
    else{
        if(hoten.value==''){
            hoten.nextElementSibling.innerHTML='Họ và tên không được để trống'
        hoten.classList.remove('is-valid')
        hoten.classList.add('is-invalid')
        hoten.nextElementSibling.classList.add('text-danger')
        hoten.nextElementSibling.classList.remove('text-success')
        flagsSignUps[3] = 0
        }
        else{
            hoten.nextElementSibling.innerHTML='Họ và tên phải in hoa chữ cái đầu tiên của mỗi từ'
        hoten.classList.remove('is-valid')
        hoten.classList.add('is-invalid')
        hoten.nextElementSibling.classList.add('text-danger')
        hoten.nextElementSibling.classList.remove('text-success')
        flagsSignUps[3] = 0
        }
    }
    console.log(flagsSignUps)
})
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
  });
function checkInputValid(input, reg,msgInvalid){
   if(!reg.test(input.value)){
         input.nextElementSibling.innerHTML=msgInvalid
         input.classList.remove('is-valid')
         input.classList.add('is-invalid')
         input.nextElementSibling.classList.add('text-danger')
         input.nextElementSibling.classList.remove('text-success')
         input.focus()
         return false
   }
   if(input.id=="email"&&userids.includes(input.value)){
    inputEmailorPhoneNumber.nextElementSibling.innerHTML='Email hoặc số điện thoại này đã được sử dụng'
    inputEmailorPhoneNumber.classList.remove('is-valid')
    inputEmailorPhoneNumber.classList.add('is-invalid')
    inputEmailorPhoneNumber.nextElementSibling.classList.add('text-danger')
    inputEmailorPhoneNumber.nextElementSibling.classList.remove('text-success')
    input.focus()
    return false
   }
   
   return true
}
 btnCreateAccount.onclick = function() {
    let check=true
    for(let i=0; i<flagsSignUps.length; i++) {
        if(flagsSignUps[i] == 0) {
            check = false
            break
        };
    }
    let btnSuccess= document.getElementById('btnSuccess');
    if(check == true) {
        saveToLocalStorage()
        btnSuccess.click()
    }
    else{
        if((checkInputValid(inputEmailorPhoneNumber,emailRegex,"Email hoặc số điện thoại không hợp lệ")||checkInputValid(inputEmailorPhoneNumber,phoneRegex,"Email hoặc số điện thoại không hợp lệ"))&&checkInputValid(hoten, nameReg, "Họ và tên không hợp lệ")&&checkInputValid(inputPass,passwordRegex,"Mật khẩu không hợp lệ")&&inputPass.value!=inputPassConfirm.value){
            inputPassConfirm.nextElementSibling.innerHTML='Mật khẩu không khớp'
            inputPassConfirm.classList.remove('is-valid')
            inputPassConfirm.classList.add('is-invalid')
            inputPassConfirm.nextElementSibling.classList.add('text-danger')
            inputPassConfirm.nextElementSibling.classList.remove('text-success')
            inputPassConfirm.focus()
        }
    }
    // 
    // alert("Đăng ký thành công!")
    // window.location.href = "../html/login.html"
 }
 document.getElementById('pass-hide').addEventListener('click',function(){
    if(inputPass.type=='password'){
        inputPass.type='text'
        this.innerHTML='<i class="fas fa-eye"></i>'
    }
    else{
        inputPass.type='password'
        this.innerHTML='<i class="fas fa-eye-slash"></i>'
    }
 })
document.getElementById('passconfirm-hide').addEventListener('click',function(){
    if(inputPassConfirm.type=='password'){
        inputPassConfirm.type='text'
        this.innerHTML='<i class="fas fa-eye"></i>'
    }
    else{
        inputPassConfirm.type='password'
        this.innerHTML='<i class="fas fa-eye-slash"></i>'
    }
})
 function saveToLocalStorage() {
    let phone
    let email
    let id
    let name= hoten.value
    if(contactMethod == false) {
        phone = inputEmailorPhoneNumber.value.trim()
        email = null
        id = phone
    }
    else {
        email = inputEmailorPhoneNumber.value.trim()
        phone = null
        id = email
    }
    let user = {
        id : id,
        name : name,
        pass : inputPass.value.trim(),
        phone : phone,
        citizenIdCard : null,
        email : email,
        birthdate : null,
        sex : null,
        address : null,
    }
    localStorage.setItem("userTemp",JSON.stringify(user))
    let users = JSON.parse(localStorage.getItem("users"))
    if(users == null) users = []
    users.push(user)
    localStorage.setItem("users",JSON.stringify(users))
 }

 function loadFromLocalStorage() {
    let users = JSON.parse(localStorage.getItem("users"))
    if(users == null) users = []
    return users
 }
