var blue =  document.getElementsByTagName('button')[1]
var yellow =  document.getElementsByTagName('button')[2]
var black =  document.getElementsByTagName('button')[3]
var total


getScore()

// 监听更换
blue.addEventListener('click',function () {
    if(blue.className == ''){
        upSkin('../images/11.jpg')
    }
})

yellow.addEventListener('click',function () {
    if(yellow.className == ''){
        upSkin('../images/777.jpg')
    }
})

black.addEventListener('click',function () {
    if(black.className == ''){
        upSkin('../images/6.jpg')
    }
})


// 显示分数
function getScore() {

    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var arr = JSON.parse(xhr.responseText)

                document.getElementsByTagName('span')[0].innerHTML = arr.name
                document.getElementsByTagName('span')[1].innerHTML = arr.total
                
                if(arr.total < 3){
                    blue.innerHTML = '解锁条件：3★'
                    blue.className = 'disabled'
                }
                if(arr.total < 7){
                    yellow.innerHTML = '解锁条件：7★'
                    yellow.className = 'disabled'
                }
                if(arr.total < 12){
                    black.innerHTML = '解锁条件：12★'
                    black.className = 'disabled'
                }
            }
        }
    }

    xhr.open('get', '/getUser?n=' + parseInt(Math.random() * 10000))
    xhr.send()

}


// 更新皮肤
function upSkin(e) {
    var data = new FormData()
    data.append('skin', e)
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
               var res = JSON.parse(xhr.responseText)
               alert(res.message)
            }
        }
    }

    xhr.open('post', '/upSkin')
    xhr.send(data)

}


