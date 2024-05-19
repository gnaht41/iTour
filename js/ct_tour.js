window.addEventListener('DOMContentLoaded',function(){
    let images = document.querySelectorAll('.image img')
    let Close = document.querySelector('.close')
    let right = document.querySelector('.right')
    let left = document.querySelector('.left')
    let gallery = document.querySelector('.gallery')
    let inner = document.querySelector('.inner')
    let current = document.querySelector('.inner img')
    let index = 0;
    function show(x){
        index = x
        current.src = images[index].src
        gallery.classList.add('show')
    }
    for(let i=0; i<images.length; i++){
        images[i].onclick = function(){
            show(i)
        }
    }
    // close gallery
    Close.onclick = function(){
        gallery.classList.remove('show')
    }
    document.onkeydown = function(e){
        if(e.keyCode == 27) gallery.classList.remove('show')
        else if(e.keyCode == 37 && gallery.classList.contains('show') == true){
            left.onclick()
        }
        else if(e.keyCode == 39 && gallery.classList.contains('show') == true){
            right.onclick()
        }
    }
    left.onclick = function(){
        if(index > 0){
            index -= 1
            show(index)
        }
        else if(index == 0){
            index = images.length - 1
            show(index)
        }
    }
    right.onclick = function(){
        if(index < images.length - 1){
            index += 1
            show(index)
        }
        else if(index == images.length - 1){
            index = 0
            show(index)
        }
    }
    let currentUser= JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser)
    
    let btn= document.querySelectorAll('.btn-booking')
    let modalDangNhap=document.getElementById('modal')
    console.log(btn)
    btn.forEach(function(e) {
        e.onclick = function(event) {
            if(currentUser){
              window.location.href = "../html/booktour.html"
            }
            else{
              modalDangNhap.click()
            }
        }
    })
})
