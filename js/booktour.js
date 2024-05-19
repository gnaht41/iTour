import {dulieu} from './dulieu.js'
document.addEventListener("DOMContentLoaded",function(){
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
let tentour = document.getElementById('tentour');
let obj = null;
let id = localStorage.getItem("idTour");

dulieu.forEach(function(item) {
    if (item.id == id) {
        obj = { ...item };
        return;
    }
});
console.log(obj);
if (obj) {
    tentour.value = obj.tenTour;
    document.getElementById('ks').value=parseInt(obj.ks)
    document.getElementById('pt').value=obj.vanChuyen
    document.getElementById('songayditour').value=obj.thoiGian
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
let nguoiLon=document.getElementById('nl')
let treEm=document.getElementById('te')
let treNho=document.getElementById('tn')
let gia=document.getElementById('tongtien')
let giaLon=document.getElementById('gianguoilon')
let giaTre=document.getElementById('giate')
let ngaykh= document.getElementById('ngaykh')
let hoten=document.getElementById('hoten')
let sdt= document.getElementById('sdt')
let mail=document.getElementById('mail')
let dc=document.getElementById('dc')
let note=document.getElementById('note')
let btn=document.getElementById('btn')
let currentUser= localStorage.getItem('currentUser')
console.log(parseInt(obj.giaNguoiLon))
gia.value=formatCurrency(parseInt(obj.giaNguoiLon))
giaLon.placeholder=formatCurrency(parseInt(obj.giaNguoiLon))
giaTre.placeholder=formatCurrency(parseInt(obj.giaTreEm))
let check= [0,0,0,0,1,0]
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^([0]|\+84)[0-9]{9,11}$/
const nameReg=/^([A-Z][a-z]+\s)*([A-Z][a-z]+)+$/;

nguoiLon.addEventListener('input',function(){
    if(nguoiLon.value>0){
    let tongtien=parseInt(nguoiLon.value)*parseInt(obj.giaNguoiLon)+parseInt(treEm.value)*parseInt(obj.giaTreEm)
    gia.value=formatCurrency(tongtien)
    }
    if(nguoiLon.value>0) check[4]=1
    else check[4]=0
    
})
treEm.addEventListener('input',function(){
    if(!treEm.value<0){
    let tongtien=parseInt(nguoiLon.value)*parseInt(obj.giaNguoiLon)+parseInt(treEm.value)*parseInt(obj.giaTreEm)
    gia.value=gia.value=formatCurrency(tongtien)
    }
})
ngaykh.addEventListener('blur',function(){
    let today = new Date();
    let ngaykhvalue = new Date(ngaykh.value);
    console.log(ngaykhvalue)
    if(today.getTime() < ngaykhvalue.getTime()){
        ngaykh.nextElementSibling.innerHTML=''
        ngaykh.classList.remove('is-invalid')
        check[5]=1
    }
    else{
        ngaykh.nextElementSibling.innerHTML='Không thể chọn ngày trong quá khứ'
        ngaykh.nextElementSibling.style.color='red'
        ngaykh.classList.add('is-invalid')
        ngaykh.classList.remove('is-valid')
        check[5]=0
    }
})
if(currentUser){
    let user=JSON.parse(currentUser)
    hoten.value=user.name
    check[0]=1
    sdt.value=user.phone
    if(sdt.value!='') check[1]=1
    mail.value=user.email
    if(mail.value!='') check[2]=1
    dc.value=user.address
    if(dc.value!='') check[3]=1
}
hoten.addEventListener('blur', function(){
    if(nameReg.test(hoten.value.trim())){
        hoten.nextElementSibling.innerHTML='Họ tên'
        hoten.classList.add('is-valid')
        hoten.classList.remove('is-invalid')
        hoten.nextElementSibling.classList.add('text-success')
        hoten.nextElementSibling.classList.remove('text-danger')
        check[0]=1
    }
    else{
        hoten.nextElementSibling.innerHTML='Họ tên không hợp lệ'
        hoten.classList.remove('is-valid')
        hoten.classList.add('is-invalid')
        hoten.nextElementSibling.classList.add('text-danger')
        hoten.nextElementSibling.classList.remove('text-success')
        check[0]=0
    }
})
sdt.addEventListener('blur', function() {
    if (phoneRegex.test(sdt.value)) {
        sdt.nextElementSibling.innerHTML = 'Số điện thoại';
        sdt.classList.add('is-valid');
        sdt.classList.remove('is-invalid');
        sdt.nextElementSibling.classList.add('text-success');
        sdt.nextElementSibling.classList.remove('text-danger');
        check[1] = 1;
    } else {
        sdt.nextElementSibling.innerHTML = 'Số điện thoại không hợp lệ';
        sdt.classList.remove('is-valid');
        sdt.classList.add('is-invalid');
        sdt.nextElementSibling.classList.add('text-danger');
        sdt.nextElementSibling.classList.remove('text-success');
        check[1] = 0;
    }
});
mail.addEventListener('blur',function(){
    if(emailRegex.test(mail.value)){
        mail.nextElementSibling.innerHTML='Email'
        mail.classList.add('is-valid')
        mail.classList.remove('is-invalid')
        mail.nextElementSibling.classList.add('text-success')
        mail.nextElementSibling.classList.remove('text-danger')
        check[2]=1
    }
    else{
        mail.nextElementSibling.innerHTML='Email không hợp lệ'
        mail.classList.remove('is-valid')
        mail.classList.add('is-invalid')
        mail.nextElementSibling.classList.add('text-danger')
        mail.nextElementSibling.classList.remove('text-success')
        check[2]=0
    }
})
dc.addEventListener('blur',function(){
    if(dc.value==''){
        dc.nextElementSibling.innerHTML='Địa chỉ không được để trống'
        dc.classList.remove('is-valid')
        dc.classList.add('is-invalid')
        dc.nextElementSibling.classList.add('text-danger')
        dc.nextElementSibling.classList.remove('text-success')
        check[3]=0
    }
    else{
        dc.nextElementSibling.innerHTML='Địa chỉ'
        dc.classList.add('is-valid')
        dc.classList.remove('is-invalid')
        dc.nextElementSibling.classList.add('text-success')
        dc.nextElementSibling.classList.remove('text-danger')
        check[3]=1
    }
})
nguoiLon.previousElementSibling.addEventListener('click',function(){
    nguoiLon.value=parseInt(nguoiLon.value)-1
    if(nguoiLon.value>0){
        let tongtien=parseInt(nguoiLon.value)*parseInt(obj.giaNguoiLon)+parseInt(treEm.value)*parseInt(obj.giaTreEm)
        gia.value=formatCurrency(tongtien)
    }
    else{
        nguoiLon.value=1
        let tongtien=parseInt(nguoiLon.value)*parseInt(obj.giaNguoiLon)+parseInt(treEm.value)*parseInt(obj.giaTreEm)
        gia.value=formatCurrency(tongtien)
    }
})
nguoiLon.nextElementSibling.addEventListener('click',function(){
    nguoiLon.value=parseInt(nguoiLon.value)+1
    if(nguoiLon.value>0){
        let tongtien=parseInt(nguoiLon.value)*parseInt(obj.giaNguoiLon)+parseInt(treEm.value)*parseInt(obj.giaTreEm)
        gia.value=formatCurrency(tongtien)
    }
    else{
        nguoiLon.value=1
        let tongtien=parseInt(nguoiLon.value)*parseInt(obj.giaNguoiLon)+parseInt(treEm.value)*parseInt(obj.giaTreEm)
        gia.value=formatCurrency(tongtien)
    }
})
treEm.previousElementSibling.addEventListener('click',function(){
    treEm.value=parseInt(treEm.value)-1
    if(treEm.value>0){
        let tongtien=parseInt(nguoiLon.value)*parseInt(obj.giaNguoiLon)+parseInt(treEm.value)*parseInt(obj.giaTreEm)
        gia.value=formatCurrency(tongtien)
    }
    else{
        treEm.value=0
        let tongtien=parseInt(nguoiLon.value)*parseInt(obj.giaNguoiLon)+parseInt(treEm.value)*parseInt(obj.giaTreEm)
        gia.value=formatCurrency(tongtien)
    }
})
treEm.nextElementSibling.addEventListener('click',function(){
    treEm.value=parseInt(treEm.value)+1
    if(treEm.value>0){
        let tongtien=parseInt(nguoiLon.value)*parseInt(obj.giaNguoiLon)+parseInt(treEm.value)*parseInt(obj.giaTreEm)
        gia.value=formatCurrency(tongtien)
    }
    else{
        treEm.value=0
        let tongtien=parseInt(nguoiLon.value)*parseInt(obj.giaNguoiLon)+parseInt(treEm.value)*parseInt(obj.giaTreEm)
        gia.value=formatCurrency(tongtien)
    }
})
treNho.previousElementSibling.addEventListener('click',function(){
    treNho.value=parseInt(treNho.value)-1
    if(treNho.value<0){
        treNho.value=0
    
    }

})
treNho.nextElementSibling.addEventListener('click',function(){
    treNho.value=parseInt(treNho.value)+1
})
function generateRandomID() {
    return Math.floor(Math.random() * 1000000); 
}

function checkAndGenerateUniqueID() {
    let hoaDonID = generateRandomID();
    let existingIDs = JSON.parse(localStorage.getItem('hoaDonIDs')) || [];

    while (existingIDs.includes(hoaDonID)) {
        hoaDonID = generateRandomID();
    }

    existingIDs.push(hoaDonID);
    localStorage.setItem('hoaDonIDs', JSON.stringify(existingIDs));

    return hoaDonID;
}
function checkInput(input, valid){
    if(!valid){
    input.classList.remove('is-valid')
    input.classList.add('is-invalid')
    input.nextElementSibling.classList.add('text-danger')
    input.nextElementSibling.classList.remove('text-success')
    input.nextElementSibling.innerHTML='Không được để trống'
    input.focus()
    return false
}
return true;
}
btn.addEventListener('click', function(){
    let index=1
    check.forEach(e=>{
        if(e==0){
            index=0
        }
    })
    if(index==1){
        let hoaDonID = checkAndGenerateUniqueID(); 
        let hoaDon={
            hoaDonID: hoaDonID,
            name:hoten.value,
            phone:sdt.value,
            email:mail.value,
            address:dc.value,
            usrID: JSON.parse(localStorage.getItem('currentUser')).id,
            tourID: obj.id,
            note: note.value,
            slNL: nguoiLon.value,
            slTE: treEm.value,
            slTN: treNho.value,
            tongtien: gia.value,
            ngaykh: ngaykh.value,
            tentour: obj.tenTour,
            ks: obj.ks,
            pt: obj.vanChuyen,
            songay: obj.thoiGian,
            giaNL: obj.giaNguoiLon,
            giaTE: obj.giaTreEm,
        }
        let dsHoaDon = JSON.parse(localStorage.getItem('dsHoaDon')) || [];
        dsHoaDon.push(hoaDon);
        localStorage.setItem('dsHoaDon',JSON.stringify(dsHoaDon))
        document.getElementById('btn-modal').click()
        console.log(hoaDon)
    }
    else{
        const nameValid= nameReg.test(hoten.value)
        const phoneValid= phoneRegex.test(sdt.value)
        const emailValid= emailRegex.test(mail.value)
        const addressValid= dc.value!=''
        const slNL= nguoiLon.value>0
        const dateValid= check[5]==1
        if(checkInput(hoten,nameValid)&&checkInput(sdt,phoneValid)&&checkInput(mail,emailValid)&&checkInput(dc,addressValid)&&checkInput(nguoiLon,slNL)&&checkInput(ngaykh,dateValid)){
            console.log('loi')
        }
        
    }
})
})