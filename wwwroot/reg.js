document.forms[0].onsubmit = function (event) {

    event.preventDefault()

    var data = new FormData(this)
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var res = JSON.parse(xhr.responseText)
                alert(res.message)
                location.href = 'login.html'
            } else {
                alert('网络错误')
            }
        }
    }
    //发送post请求
    xhr.open('POST', '/reg')
    xhr.send(data)
}