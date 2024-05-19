document.addEventListener('DOMContentLoaded', function() {
const navEl = document.querySelector('.navbar');

function non_scroll(){
  let width= window.innerWidth;
  if ((window.scrollY <= 100 && width >= 1280) || (window.scrollY <= 56 && width < 1280)||window.scrollY===0) {
    navEl.classList.remove('navbar-scrolled');
  }
}
non_scroll();
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
    
document.getElementById('navbar-toggler').addEventListener('click', function(){
  let width = window.innerWidth;
  if ((window.scrollY <= 100 && width >= 1280) || (window.scrollY <= 56 && width < 1280)){
    if (navEl.classList.contains('navbar-scrolled')) {
      navEl.classList.remove('navbar-scrolled');
    } else {
      navEl.classList.add('navbar-scrolled');
    }
  }
});
document.getElementById('user-toggler').addEventListener('click', function(){
  let width = window.innerWidth;
  if ((window.scrollY <= 100 && width >= 1280) || (window.scrollY <= 56 && width < 1280)){
    if (navEl.classList.contains('navbar-scrolled')) {
      navEl.classList.remove('navbar-scrolled');
    } else {
      navEl.classList.add('navbar-scrolled');
    }
  }
});

window.addEventListener('scroll', () => {
  let width = window.innerWidth;
  let collapsibleNavbar = document.getElementById('collapsibleNavbar');
  let user = document.getElementById('user');
  if ((window.scrollY >= 100 && width >= 1280) || (window.scrollY >= 56 && width < 1280)) {
    navEl.classList.add('navbar-scrolled');
  } else {
    if(!user.classList.contains('show')&&!collapsibleNavbar.classList.contains('show')) {
    navEl.classList.remove('navbar-scrolled');
  }
}
});
});


  

document.getElementById('uudai').addEventListener('input', function(){
  let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let value = document.getElementById('uudai').value;
  let btn = document.getElementById('button-addon2');
  if (reg.test(value)) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', true);
  }
});
document.getElementById('button-addon2').addEventListener('click', function(){
  let input = document.getElementById('uudai');
  let mail = input.value;
  let btn = document.getElementById('button-addon2');
  input.classList.add('d-none');
  btn.classList.add('d-none');
  let emailSpan = document.createElement('span');
  emailSpan.textContent = mail;
  emailSpan.style.fontWeight = '900';
  let message = document.getElementById('message');
  message.innerHTML = 'Quá tuyệt! Chúng tôi đã gửi link đến ';
  message.appendChild(emailSpan);
})
let a = document.querySelectorAll(".btn-chitiet")
    a.forEach(function(e) {
        e.onclick = function(event) {
            localStorage.setItem("idTour",event.target.getAttribute("data-target"))
            window.location.href = "../html/chitiettour.html"
        }
    })
    let currentUser= JSON.parse(localStorage.getItem("currentUser"))
    let btn= document.querySelectorAll('.btn-booking')
    let modalDangNhap=document.getElementById('modal')
    btn.forEach(function(e) {
        e.onclick = function(event) {
            if(currentUser){
              localStorage.setItem("idTour",event.target.getAttribute("data-target"))
              window.location.href = "../html/booktour.html"
            }
            else{
              modalDangNhap.click()
            }
        }
    })
let cardTour= document.querySelectorAll('.card-tour')

cardTour.forEach(e=>e.addEventListener('click',function(){
      let search= e.getAttribute('data-search')
      localStorage.setItem('search', search);
      window.location.href='../html/tour.html'
}))
  
