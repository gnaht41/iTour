document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll('button[data-change]');
    let inputs = document.querySelectorAll('input[data-change]');
    let nameReg=/^([A-Z][a-z]+\s)*([A-Z][a-z]+)*$/;
    let passReg=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])\S{6,}$/;
    let sdtReg=/^([0]|[+84])[0-9]{9,11}$/;
    let cccdReg=/^([0-9]{12})|([0-9]{9})$/;
    let mailReg=/^[A-Za-z0-9]+@[a-z]+\.[a-z]{2,}$/
    let radio= document.querySelectorAll('input[type="radio"]');
    let save=document.getElementById('save');
    let avt=document.getElementById('img');
    let redSpans = document.querySelectorAll('span[style*="color: red"]');
    let hello = document.querySelector("#hello")
    let name = document.querySelector("#name")
    let pass = document.querySelector("#pass")
    let phone = document.querySelector("#phone")
    let cccd = document.querySelector("#cccd")
    let email = document.querySelector("#email")
    let birthdate = document.querySelector("#birthdate")
    let sex = document.querySelectorAll('input[type="radio"]')
    let address = document.querySelector("#address")


    let badge= document.querySelector('.badge')
  let dsHoaDon= JSON.parse(localStorage.getItem('dsHoaDon'));
  let currentUser= JSON.parse(localStorage.getItem('currentUser'));
  let alert_bs=document.querySelector('.alert-warning')
  let dh= document.getElementById('dh');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let today= new Date();
            const state= button.getAttribute('data-state');
            const dataChangeValue = button.getAttribute('data-change');
            const correspondingInput = Array.from(inputs).find(input => input.getAttribute('data-change') === dataChangeValue);
            if(dataChangeValue=='gt'){
                radio.forEach(radio=>{
                    radio.removeAttribute('disabled');
                })
            }
            let match = false;
            if(dataChangeValue=='pass'){
                match=passReg.test(correspondingInput.value);
            }
            else if(dataChangeValue=='sdt'){
                match=sdtReg.test(correspondingInput.value);
            }
            else if(dataChangeValue=='cccd'){
                match=cccdReg.test(correspondingInput.value);
            }
            else if(dataChangeValue=='mail'){
                match=mailReg.test(correspondingInput.value);
            }
            else if(dataChangeValue=='name'){
                match=nameReg.test(correspondingInput.value);
            }
            else if(dataChangeValue=='dc')
                match=true;
            let msg=correspondingInput.getAttribute('data-invalid');
            if(state=='none'){
            save.setAttribute('disabled',true);
            buttons.forEach(button =>{
                if(button.getAttribute('data-change')!==dataChangeValue){
                    button.setAttribute('disabled',true);
                    
                }

            })
            button.innerHTML = "Lưu";
            button.style="background-color: #05374b; color: white; font-weight: 500";
            if (correspondingInput) {
                if(dataChangeValue==='pass'){
                    correspondingInput.setAttribute('type','text');
                }
                correspondingInput.removeAttribute('disabled');
                correspondingInput.value='';
                correspondingInput.focus();
                button.setAttribute('data-state', 'updating')
            }
            }
            else{
                save.removeAttribute('disabled');
                if(dataChangeValue=='gt'){
                    let gtMsg=document.getElementById('gtMsg');
                    let checked = false; 
                    radio.forEach(radio=>{
                        if(radio.checked){
                            checked = true; 
                        }
                    });
                    if(!checked){
                        gtMsg.innerHTML='Chưa chọn giới tính';
                    }
                    else{
                        gtMsg.innerHTML='';
                        button.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
                        button.style="background-color: #5c636a; color: white; font-weight: regular";
                        
                        button.setAttribute('data-state', 'none');
                        radio.forEach(radio=>{
                            radio.setAttribute('disabled',true);
                        })
                        buttons.forEach(button=>{
                            if(button.getAttribute('data-change')!==dataChangeValue){
                                button.removeAttribute('disabled');
                            }
                        })
                    }
                }
                else{
                    if(match==true){
                        if(correspondingInput.value===''){
                        
                            correspondingInput.nextElementSibling.innerHTML='Không được để trống';
                            correspondingInput.focus();
                        } else{
                            button.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
                        button.style="background-color: #5c636a; color: white; font-weight: regular";
                        correspondingInput.setAttribute('disabled',true);
                        button.setAttribute('data-state', 'none');
                        correspondingInput.nextElementSibling.innerHTML = '';
                        if(dataChangeValue=='pass'){
                            correspondingInput.setAttribute('type','password');
                        }
                        if(dataChangeValue=='name'){
                            let hello= document.getElementById('hello');
                            hello.innerHTML='&nbsp;'+ correspondingInput.value;
                        }
                        buttons.forEach(button=>{
                            if(button.getAttribute('data-change')!==dataChangeValue){
                                button.removeAttribute('disabled');
                            }
                        })
                        }
                    }
                    else{
                        correspondingInput.nextElementSibling.innerHTML=msg;
                        correspondingInput.focus();    
                    }
                }
            }  
        });
    });
    inputs.forEach(input=>{
        input.addEventListener('blur',function(){
                if(input.getAttribute('data-change')!=='gt')
                input.focus();
        })
    })
    save.addEventListener('click',function(){
        let check = true
        redSpans.forEach(function(x) {
            if(x.innerText != '') {
                check = false
                return
            }
        })
        if(check) {
            let newname
            let newpass
            let newphone
            let newcitizenIdCard
            let newemail
            let newbirthdate
            let newsex 
            let newaddress

            if(name.value.trim() != "Chưa có thông tin")  {
                newname = name.value.trim()
                document.querySelector(".accountAvartar a").innerHTML = `<span><i class="fa-regular fa-circle-user"></i></span>` + newname
            }
            else newname = null
            if(pass.value.trim() != "") newpass = pass.value.trim()
            else newpass = null
            if(phone.value.trim() != "Chưa có thông tin") newphone = phone.value.trim()
            else newphone = null
            if(cccd.value.trim() != "Chưa có thông tin") newcitizenIdCard = cccd.value.trim()
            else newcitizenIdCard = null
            if(email.value.trim() != "Chưa có thông tin") newemail = email.value.trim()
            else newemail = null
            if(address.value.trim() != "Chưa có thông tin") newaddress = address.value.trim()
            else newaddress = null
            if(birthdate.value != "") newbirthdate = new Date(birthdate.value.trim())
            else newbirthdate = null
            if(sex[0].checked) {
                newsex = 1
                avt.src="../img/thongtincanhan/male.png";
            }
            else if(sex[1].checked) {
                newsex = 0
                avt.src="../img/thongtincanhan/female.png";
            }
            else {
                newsex = null
                avt.src="../img/thongtincanhan/9187604.png";
            }
            let obj = {
                id : JSON.parse(localStorage.getItem("currentUser")).id,
                name : newname,
                pass : newpass,
                phone : newphone,
                citizenIdCard : newcitizenIdCard,
                email : newemail,
                birthdate : newbirthdate,
                sex : newsex,
                address : newaddress
            }
            localStorage.setItem("currentUser",JSON.stringify(obj))
            let users = JSON.parse(localStorage.getItem("users"))
            users.forEach(function(item,index) {
                if(item.id == obj.id) {
                     users.splice(index, 1);
                     return
                }
            })
            users.push(obj)
            localStorage.setItem("users",JSON.stringify(users))
            let alert_success=document.querySelector('.alert-success')
            alert_success.classList.remove('d-none');
            alert_success.classList.add('show');
            setTimeout(function(){
                alert_success.classList.add('d-none');
                alert_success.classList.remove('show');
            },2000)
            
        }
    })
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

  function loadUserInfor() {
    let obj = JSON.parse(localStorage.getItem("currentUser"))
    if(obj != null) {
        pass.value = obj.pass
        if(obj.name != null) {
            hello.innerText = obj.name
            name.value = obj.name
        }
        else {
            hello.innerText = obj.id
        }
        if(obj.phone != null) {
            phone.value = obj.phone
        }
        if(obj.citizenIdCard != null) {
            cccd.value = obj.citizenIdCard
        }
        if(obj.email != null) {
            email.value = obj.email
        }
        if(obj.birthdate != null) {
            birthdate.value = obj.birthdate.split('T')[0]
        }
        if(obj.sex != null) {
            if(obj.sex == 0) {
                sex[1].checked = true
                avt.src="../img/thongtincanhan/female.png";
            }
            else {
                sex[0].checked = true
                avt.src="../img/thongtincanhan/male.png";
            }
        }
        if(obj.address != null) {
            address.value = obj.address
        }
    }
  }
  loadUserInfor()
  
  let dsHoaDonUsr= []
  if(currentUser){
    dsHoaDonUsr=dsHoaDon.filter(e=> e.usrID == currentUser.id)
  }
  
  
    if(dsHoaDonUsr.length > 0){
        badge.innerHTML=dsHoaDonUsr.length;
    }
    else{
        badge.innerHTML= ''
    }
    
    
});
