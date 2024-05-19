import {dulieu} from "./dulieu.js"
document.addEventListener("DOMContentLoaded",function() {
    let doTour = document.querySelector("#dotour")

    function saveID(e) {
        console.log(e)
    } 
    function formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }
    let search= localStorage.getItem('search')
    if(search){
       doTour.innerHTML=``
       localStorage.removeItem('search')
       let searchTours = dulieu.filter(item => item.tenTour.trim().toLowerCase().includes(search.trim().toLowerCase()));
       searchTours.forEach(function(element){
              doTour.innerHTML += `
              <div class="tour" data-target="${element.id}">
                        <div class="tour-img-container">
                          <img
                            src="${element.thumbnail}"
                            alt=""
                            class="tour-img"
                          />
                          <div class="card-rate">
                            <i class="fa-solid fa-star"></i> <span>5</span>
                          </div>
                          <div class="badge card-discount" style="${element.style}">
                        ${element.discount}
                        </div>
                        </div>
                        <div class="tour-top p-3">
                          <p class="tours-title">
                            ${element.tenTour}
                          </p>
                          <span class="tour-time badge bg-secondary"
                            ><i class="fa-solid fa-clock"></i>${element.thoiGian}</span
                          >
                        </div>
                        <div class="tour-bottom p-3">
                          <p class="tour-price">
                            <b>${formatCurrency(element.giaNguoiLon)}</b>/ <span class="small">người</span>
                          </p>
                          <a class="btn btn-chitiet btn-outline-dark" data-target = "${element.id}">Chi tiết</a>
                          <button class="btn tour-btn btn-booking" data-target = "${element.id}">Đặt ngay</button>
                        </div>
                      </div>
              `
       } )
        
        
    }
    else{
      dulieu.forEach(function(element) {
        doTour.innerHTML += `
        <div class="tour" data-target="${element.id}">
                  <div class="tour-img-container">
                    <img
                      src="${element.thumbnail}"
                      alt=""
                      class="tour-img"
                    />
                    <div class="card-rate">
                      <i class="fa-solid fa-star"></i> <span>5</span>
                    </div>
                    <div class="badge card-discount" style="${element.style}">
                  ${element.discount}
                  </div>
                  </div>
                  <div class="tour-top p-3">
                    <p class="tours-title">
                      ${element.tenTour}
                    </p>
                    <span class="tour-time badge bg-secondary"
                      ><i class="fa-solid fa-clock"></i>${element.thoiGian}</span
                    >
                  </div>
                  <div class="tour-bottom p-3">
                    <p class="tour-price">
                      <b>${formatCurrency(element.giaNguoiLon)} </b>/ <span class="small">người</span>
                    </p>
                    <a class="btn btn-chitiet btn-outline-dark" data-target = "${element.id}">Chi tiết</a>
                    <button class="btn tour-btn btn-booking" data-target = "${element.id}">Đặt ngay</button>
                  </div>
                </div>
        `
    })
    }
    
    let a = doTour.querySelectorAll(".btn-chitiet")
    a.forEach(function(e) {
        e.onclick = function(event) {
            localStorage.setItem("idTour",event.target.getAttribute("data-target"))
            window.location.href = "../html/chitiettour.html"
        }
    })
    let currentUser= JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser)
    let btn= doTour.querySelectorAll('.btn-booking')
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
    
})
