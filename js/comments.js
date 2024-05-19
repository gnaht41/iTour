window.addEventListener("DOMContentLoaded",function() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    let commnetField = document.querySelector("#comment_field")
    let commentsBox = document.querySelector(".comments")
    let start = document.querySelectorAll("#star-comment input")
    let numberRate = document.querySelector("#numberRate")
    let luotDanhGia = document.querySelector("#luotDanhGia")
    let startTotal = document.querySelectorAll("#totalStar label")
    let submitComment = document.querySelector("#summitComment")
    if(currentUser != null) {
        commnetField.removeAttribute("disabled")
    }
    else {
        commnetField.setAttribute("disabled",true)
    }

    function totalRate(map) {
        let totalRate = 0.0
        for(const [key,value] of map ) {
            totalRate += value
        }
        if(map.size != 0) totalRate = parseFloat(totalRate /  map.size)
        numberRate.innerText = totalRate
        let i=0
        for(i; i<Math.floor(totalRate); i++) startTotal[i].style = "color:#ff8c08"
        for(i; i<5; i++) startTotal[i].style = "color:#838383"
        luotDanhGia.innerText = map.size + ' lượt đánh giá'
    }

    loadComment()
    function loadComment() {
        let currentIdTour = localStorage.getItem("idTour")
        let comments = JSON.parse(localStorage.getItem("comments"))
        let commentsInThisPage = []
        let map = new Map()
        if(comments == null) comments = []
        comments.forEach(function(item) {
            if(item.idTour == currentIdTour) {
                commentsInThisPage.push(item)
                map.set(item.username,parseInt(item.starts))
            }
        })
        commentsBox.innerHTML = `<p style="font-size: 30px; font-weight: 500;" id="binhluan">Bình luận:</p>`
        commentsInThisPage.reverse()
        commentsInThisPage.forEach(element => {
            let st = ["","","","",""]
            let index = parseInt(element.starts)
            st[index-1] = "checked"
            commentsBox.innerHTML += `<div class="user-comment">
            <div class="avt d-flex" style="gap: 20px">
              <img src="${element.avatar}" class="img-fluid" style="width: 30px;" alt="">
              <div class="user-name">${element.username}</div>
            </div>
            <div class="comment-content mt-3">
              <div class="star">
                <input type="radio" name="" value="1" ${st[0]}>
                <label  class="fa-solid fa-star"></label>
                <input type="radio" name=""  value="2" ${st[1]}>
                <label class="fa-solid fa-star"></label>
                <input type="radio" name=""  value="3" ${st[2]}>
                <label  class="fa-solid fa-star"></label>
                <input type="radio" name=""  value="4" ${st[3]}>
                <label  class="fa-solid fa-star"></label>
                <input type="radio" name=""  value="5" ${st[4]}>
                <label class="fa-solid fa-star"></label>
              </div>
              <p class="comment-text">${element.content}</p>
            </div>
          </div>`
        });
        totalRate(map)
    }

    submitComment.onclick = saveComment

    function saveComment() {
        if(commnetField.value != '') {
            let imageSrc = '../img/thongtincanhan/9187604.png'
            let rate
            start.forEach(function(x) {
                if(x.checked) rate = x.value
            })
            if(currentUser.sex != null) {
                if(currentUser.sex == 1) imageSrc = '../img/thongtincanhan/male.png'
                else imageSrc = '../img/thongtincanhan/female.png'
            }
            let comment = {
                username : currentUser.name,
                content : commnetField.value,
                avatar : imageSrc,
                starts : rate,
                idTour : localStorage.getItem("idTour")
            }  
            let comments = JSON.parse(localStorage.getItem("comments"))
            if(comments == null) comments = []
            comments.push(comment)
            localStorage.setItem("comments",JSON.stringify(comments))
            commnetField.value = ""
            loadComment()
        } 
    }
})