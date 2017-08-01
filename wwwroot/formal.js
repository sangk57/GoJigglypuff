// 显示用户信息
function getUser() {

    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var arr = JSON.parse(xhr.responseText)

                document.getElementsByTagName('span')[0].innerHTML = arr.name

            }
        }
    }

    xhr.open('get', '/getUser?n=' + parseInt(Math.random() * 10000))
    xhr.send()

}

getUser()





