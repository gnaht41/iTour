import {dulieu} from "./dulieu.js"
document.addEventListener("DOMContentLoaded",function() {
    let hinh = document.querySelector("#hinh")
    let obj
    let id = localStorage.getItem("idTour")
    let noidung = document.querySelector("#noidung")
    dulieu.forEach(function(item) {
        if(item.id == id) {
            obj = {
                ...item
            }
            return
        }
    })
    console.log(obj)
    hinh.innerHTML = obj.hinh
    noidung.innerHTML = obj.lichtrinh
    let title = document.querySelectorAll(".booking-title")
    title.forEach(e=>{
        e.innerHTML= obj.tenTour
    })
    let khoihanh= document.querySelectorAll(".khoihanh")
    khoihanh.forEach(e=>{
        e.innerHTML= obj.xuatPhat
    })
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    let gia=document.querySelectorAll(".gia")
    gia.forEach(e=>{
        e.innerHTML= formatCurrency(obj.giaNguoiLon)
    })
    let thoigian=document.querySelectorAll(".thoigian")
    thoigian.forEach(e=>{
        e.innerHTML= obj.thoiGian
    })
    let diemden= document.querySelectorAll(".diemden")
    diemden.forEach(e=>{
        e.innerHTML= obj.diemDen
    })
    
})
