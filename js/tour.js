import {dulieu} from "./dulieu.js"
document.addEventListener("DOMContentLoaded", function() {
    const filters = document.querySelectorAll('.filter');
    let dropdowns = document.querySelectorAll('span[data-dropdown]');
    let tags = document.querySelectorAll('.tag');
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            if (this.dataset.filter === 'clicked') {
                this.dataset.filter = 'non-click';
                this.style.color = '#000';
                this.style.borderColor = '#eee';
                let dropdown = Array.from(dropdowns).find(e => e.getAttribute('data-dropdown') === filter.getAttribute('data-filter-value'));
                let textContent
                if(filter.getAttribute('data-filter-value')=='gia'){
                    textContent='Chọn theo giá'
                }
                else if(filter.getAttribute('data-filter-value')=='mien'){
                    textContent='Miền'
                }
                else{
                    textContent='Thời gian'
                }
                dropdown.innerHTML = textContent;
                tags.forEach(tag=>{
                    if(tag.getAttribute('data-tag')==filter.getAttribute('data-filter-value')){
                        tag.classList.add('d-none');
                        tag.classList.remove('d-block');
                        tag.innerHTML = `a`;
                        console.log(tag)
                    }
                    
                
                })

            }
            else {
                this.dataset.filter = 'clicked';
                this.style.color = '#05374b';
                this.style.borderColor = '#05374b';
                let dropdown = Array.from(dropdowns).find(e => e.getAttribute('data-dropdown') === filter.getAttribute('data-filter-value'));
            dropdown.innerHTML = filter.dataset.value;
            let tag = Array.from(tags).find(e => e.getAttribute('data-tag') === filter.getAttribute('data-filter-value'));
            tag.classList.add('d-block');
            tag.classList.remove('d-none');
            tag.innerHTML = filter.dataset.value + ' <i class="fa-solid fa-xmark"></i>';
            }
            filters.forEach(otherFilter => {
                if (otherFilter !== filter && otherFilter.dataset.filterValue === filter.dataset.filterValue) {
                    otherFilter.dataset.filter = 'non-click';
                    otherFilter.style.color = '#000';
                    otherFilter.style.borderColor = '#eee';
                }
            });
            
        });
    });




    let doTour = document.querySelector("#dotour")
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
    
    document.getElementById('reset').addEventListener('click', function () {
        dropdowns.forEach(e => {
            if (e.getAttribute('data-dropdown') == 'gia') {
                e.innerHTML = 'Chọn theo giá';
            } else if (e.getAttribute('data-dropdown') == 'mien') {
                e.innerHTML = 'Miền';
            } else {
                e.innerHTML = 'Thời gian';
            }
        });
        tags.forEach(tag => {
            tag.classList.remove('d-block');
            tag.classList.add('d-none');
            tag.innerHTML = '';
        });
        filters.forEach(filter=>{
            if(filter.getAttribute('data-filter')==='clicked'){
                filter.dataset.filter = 'non-click';
                filter.style.color = '#000';
                filter.style.borderColor = '#eee';
            }
        })
        document.getElementById('input-search').value = '';
        document.getElementById('input-search-sm').value = '';
        filterMang()
        document.getElementById('notfound').innerHTML = ``;
    });
    document.getElementById('reset-sm').addEventListener('click', function () {
        filters.forEach(filter=>{
            if(filter.getAttribute('data-filter')==='clicked'){
                filter.dataset.filter = 'non-click';
                filter.style.color = '#000';
                filter.style.borderColor = '#eee';
            }
        })
        tags.forEach(tag => {
            tag.classList.remove('d-block');
            tag.classList.add('d-none');
            tag.innerHTML = '';
        });
        document.getElementById('input-search').value = '';
        
        filterMang();
        document.getElementById('notfound').innerHTML = '';
    })
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            let dropdown = Array.from(dropdowns).find(e => e.getAttribute('data-dropdown') === tag.getAttribute('data-tag'));
            filters.forEach(filter => {
                if(filter.getAttribute('data-filter-value') === tag.getAttribute('data-tag')) {
                    filter.dataset.filter = 'non-click';
                    filter.style.color = '#000';
                    filter.style.borderColor = '#eee';
                }
            })
            let tagValue;
            if(tag.getAttribute('data-tag') === 'gia'){
                tagValue = 'Chọn theo giá';
            } else if(tag.getAttribute('data-tag') === 'mien'){
                tagValue = 'Miền';
            } else {
                tagValue = 'Thời gian';
            }
            dropdown.innerHTML = tagValue;
            tag.classList.remove('d-block');
            tag.classList.add('d-none');
            tag.innerHTML = '';
            filterMang()
        });
    });

    
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

let giafilter = document.querySelectorAll('div[data-filter-value="gia"]');
let mienfilter = document.querySelectorAll('div[data-filter-value="mien"]');
let tgfilter = document.querySelectorAll('div[data-filter-value="thoiGian"]');
let searchfilter = document.querySelectorAll('.input-search')
giafilter.forEach(e => {
    e.addEventListener('click', function() {
        filterMang();
    });
});

mienfilter.forEach(e => {
    e.addEventListener('click', function() {
        filterMang();
    });
});

tgfilter.forEach(e => {
    e.addEventListener('click', function() {
        filterMang();
    });
});
searchfilter.forEach(e=>{
    e.addEventListener('input',function(){
        filterMang();
    })
})
function filterMang() {
    let search=[]
    let gia = [];
    let mien = [];
    let tg = [];
    let index=0
    let mangMoi = [];
    let giavalue = Array.from(giafilter).find(e => e.getAttribute('data-filter') === 'clicked');
    let mienvalue = Array.from(mienfilter).find(e => e.getAttribute('data-filter') === 'clicked');
    let tgvalue = Array.from(tgfilter).find(e => e.getAttribute('data-filter') === 'clicked');
    
    if (giavalue && giavalue.textContent) {
        console.log(giavalue.textContent)
        if (giavalue.textContent.trim() == 'Dưới 1 triệu') {
            gia = dulieu.filter(function(item) {
                return item.giaNguoiLon < 1000000;
            });
        } 
        else if(giavalue.textContent.trim()=='Từ 1 - 2 triệu'){
            gia = dulieu.filter(function(item) {
                return item.giaNguoiLon >= 1000000 && item.giaNguoiLon < 2000000;
            });
        }
        else if (giavalue.textContent.trim()=='Từ 2 - 4 triệu'){
            gia = dulieu.filter(function(item) {
                return item.giaNguoiLon >= 2000000 && item.giaNguoiLon < 4000000;
            });
        }
        else if (giavalue.textContent.trim()=='Từ 4 - 7 triệu'){
            gia = dulieu.filter(function(item) {
                return item.giaNguoiLon >= 4000000 && item.giaNguoiLon < 7000000;
            })
        }
        else if(giavalue.textContent.trim()=='Từ 7 triệu'){
            gia = dulieu.filter(function(item) {
                return item.giaNguoiLon >= 7000000;
            });
        }
        index++
    }
    
    if (mienvalue && mienvalue.textContent) {
        console.log(mienvalue.textContent)
        if (mienvalue.textContent.trim() == 'Miền Bắc') {
            mien = dulieu.filter(function(item) {
                return item.mien == 'Bắc';
            });
        }
        else if (mienvalue.textContent.trim() == 'Miền Trung') {
            mien = dulieu.filter(function(item) {
                return item.mien == 'Trung';
            });
        }
        else if (mienvalue.textContent.trim() == 'Miền Nam') {
            mien = dulieu.filter(function(item) {
                return item.mien == 'Nam';
            });
        }
        index++
    }
    if (tgvalue && tgvalue.textContent){
        console.log(tgvalue.textContent)
        if(tgvalue.textContent.trim()=='1 Ngày'){
            tg=dulieu.filter(function(item){
                return item.thoiGian=='1 Ngày';
            });
        }
        else if(tgvalue.textContent.trim()=='2 Ngày 1 Đêm'){
            tg=dulieu.filter(function(item){
                return item.thoiGian=='2 Ngày 1 Đêm';
            });
        }
        else if(tgvalue.textContent.trim()=='3 Ngày 2 Đêm'){
            tg=dulieu.filter(function(item){
                return item.thoiGian=='3 Ngày 2 Đêm';
            });
        }
        else if(tgvalue.textContent.trim()=='4 Ngày 3 Đêm'){
            tg=dulieu.filter(function(item){
                return item.thoiGian=='4 Ngày 3 Đêm';
            });
        }
        else if(tgvalue.textContent.trim()=='5 Ngày 4 Đêm'){
            tg=dulieu.filter(function(item){
                return item.thoiGian=='5 Ngày 4 Đêm';
            });
        }
        index++
    }
    let searchValues = Array.from(searchfilter).map(input => input.value.trim().toLowerCase());
    searchValues = searchValues.filter(value => value !== '');
    if (searchValues.length > 0) {
        search = dulieu.filter(item => {
            
            return searchValues.every(searchValue => {
                return item.tenTour.toLowerCase().includes(searchValue); 
            });
        });
        index++
    }
    [search, gia, mien, tg].forEach(arr => {
        if (arr && arr.length > 0) {
            arr.forEach(obj => {
                if (!mangMoi.includes(obj) && obj !== null) {
                    let appearCount = 0;
                    [search, gia, mien, tg].forEach(otherArr => {
                        if (otherArr !== arr && otherArr.includes(obj)) {
                            appearCount++;
                        }
                    });
                    if (appearCount === index - 1) {
                        mangMoi.push(obj);
                    }
                }
            });
        }
    }); 
    console.log(mangMoi)
    if(mangMoi.length>0){
        doTour.innerHTML=``
        console.log("1")
        document.getElementById('notfound').innerHTML=``
        mangMoi.forEach(function(element){
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
        })
        
    }
    else{
        console.log("2")
        document.getElementById('notfound').innerHTML='Không có kết quả tìm kiếm'
        doTour.innerHTML=``
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
                          <b>${formatCurrency(element.giaNguoiLon)}</b>/ <span class="small">người</span>
                        </p>
                        <a class="btn btn-chitiet btn-outline-dark" data-target = "${element.id}">Chi tiết</a>
                        <button class="btn tour-btn btn-booking" data-target = "${element.id}">Đặt ngay</button>
                      </div>
                    </div>
            `
        })

    }
    let btn = document.querySelectorAll('.btn-chitiet')
        btn.forEach(function(e) {
            e.addEventListener('click', function(event) {
                localStorage.setItem("idTour", event.target.getAttribute("data-target"));
                window.location.href = "../html/chitiettour.html";
            });
        });
        let currentUser=JSON.parse(localStorage.getItem("currentUser"))
        let btnBooking= doTour.querySelectorAll('.btn-booking')
        let modalDangNhap=document.getElementById('modal')
        btnBooking.forEach(function(e) {
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
}

    

    document.getElementById('input-search').addEventListener('input',function(){
        let searchTag= document.getElementById('search-tag');
        let sortValue;
        if (this.value.length > 25) {
            sortValue = this.value.substring(0, 25) + '...';
            searchTag.innerHTML=sortValue+' <i class="fa-solid fa-xmark"></i>';
        }
        else{
            searchTag.innerHTML=this.value+' <i class="fa-solid fa-xmark"></i>';
        }
        
        searchTag.classList.add('d-block');
        searchTag.classList.remove('d-none');
        if(this.value==''){
            searchTag.classList.remove('d-block');
            searchTag.classList.add('d-none');
            searchTag.innerHTML = '';
        }
        
    })
    document.getElementById('input-search-sm').addEventListener('input',function(){
        let searchTag= document.getElementById('search-tag');
        let sortValue;
        if (this.value.length > 15) {
            sortValue = this.value.substring(0, 15) + '...';
            searchTag.innerHTML=sortValue+' <i class="fa-solid fa-xmark"></i>';
        }
        else{
            searchTag.innerHTML=this.value+' <i class="fa-solid fa-xmark"></i>';
        }
        
        searchTag.classList.add('d-block');
        searchTag.classList.remove('d-none');
        if(this.value==''){
            searchTag.classList.remove('d-block');
            searchTag.classList.add('d-none');
            searchTag.innerHTML = '';
        }
        
    })
    document.getElementById('search-tag').addEventListener('click',function(){
        document.querySelectorAll('.input-search').value='';
        this.classList.remove('d-block');
        this.classList.add('d-none');
        this.innerHTML = '';
    })
    
});
    


