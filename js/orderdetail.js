document.addEventListener('DOMContentLoaded', function(){
    let dsHoaDon = JSON.parse(localStorage.getItem('dsHoaDon')) || []; 
    let select = document.getElementById('select');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let dsHoaDonUsr=[]
    if(currentUser){
         dsHoaDonUsr= dsHoaDon.filter(e => e.usrID == currentUser.id).reverse();
    }
    
    dsHoaDonUsr.forEach(e => {
        select.innerHTML += `
            <option value="${e.hoaDonID}">${e.hoaDonID}-${e.tentour}-${e.ngaykh}</option>
        `;
    });
    console.log(dsHoaDonUsr);
    let hoten = document.getElementById('hoten');
    let sdt = document.getElementById('sdt');
    let mail = document.getElementById('mail');
    let dc = document.getElementById('dc');
    let note = document.getElementById('note');
    let tenTour = document.getElementById('tenTour');
    let tg= document.getElementById('tg');
    let pt= document.getElementById('pt');
    let ks= document.getElementById('ks');
    let nguoiLon= document.getElementById('nguoilon');
    let treEmails = document.getElementById('treEm');
    let treNho = document.getElementById('treNho');
    let giaNguoiLon = document.getElementById('giaNguoiLon');
    let giaTreEm = document.getElementById('giaTreEm');
    let ngaykh = document.getElementById('ngaykh');
    let tongtien = document.getElementById('tongtien');
    let empty=document.getElementById('empty');
    let tours=document.getElementById('tours');
    console.log(dsHoaDonUsr.length)
    if(dsHoaDonUsr.length==0){
        empty.classList.add('d-block')
        empty.classList.remove('d-none')
        tours.classList.remove('d-flex')
        tours.classList.add('d-none')
    }
    else{
        tours.classList.add('d-flex')
        tours.classList.remove('d-none')
        empty.classList.remove('d-block')
        empty.classList.add('d-none')
    }
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    let selectedOption = select.options[select.selectedIndex].value;
        console.log(selectedOption)
        let obj = dsHoaDonUsr.find(e => e.hoaDonID == selectedOption);
        
        if(obj){
            hoten.value=obj.name
            sdt.value=obj.phone
            mail.value=obj.email
            dc.value=obj.address
            note.value=obj.note
            tenTour.value=obj.tentour
            tg.value=obj.songay
            pt.value=obj.pt
            ks.value=obj.ks+' sao'
            nguoiLon.value=obj.slNL
            treEmails.value=obj.slTE
            treNho.value=obj.slTN
            giaNguoiLon.value=formatCurrency(obj.giaNL)
            giaTreEm.value=formatCurrency(obj.giaTE)
            ngaykh.value=obj.ngaykh
            tongtien.value=obj.tongtien
            
        } else {
            console.log('Không tìm thấy');
        }
    select.addEventListener('change', function() {
        let selectedOption = select.options[select.selectedIndex].value;
        
        let obj = dsHoaDonUsr.find(e => e.hoaDonID == selectedOption);
        console.log(obj);
        if(obj){
            hoten.value=obj.name
            sdt.value=obj.phone
            mail.value=obj.email
            dc.value=obj.address
            note.value=obj.note
            
            tenTour.value=obj.tentour
            tg.value=obj.songay
            pt.value=obj.pt
            ks.value=obj.ks+' sao'
            nguoiLon.value=obj.slNL
            treEmails.value=obj.slTE
            treNho.value=obj.slTN
            giaNguoiLon.value=formatCurrency(obj.giaNL)
            giaTreEm.value=formatCurrency(obj.giaTE)
            ngaykh.value=obj.ngaykh
            tongtien.value=obj.tongtien
        } else {
            console.log('Không tìm thấy');
        }
    });
    let huy=document.getElementById('huy')
    let btn=document.getElementById('btn')
    huy.addEventListener('click',function(){
        btn.click()
    })
    let huyBtn=document.getElementById('huyBtn')
    huyBtn.addEventListener('click',function(){
        let dsHoaDonHuy= dsHoaDon.filter(e=>e.hoaDonID!=selectedOption)
        console.log(dsHoaDon)
        console.log(dsHoaDonHuy)
        localStorage.setItem('dsHoaDon', JSON.stringify(dsHoaDonHuy));
        window.location.reload()
    })
});
