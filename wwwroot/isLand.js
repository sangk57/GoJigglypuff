var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var res = JSON.parse(xhr.responseText)

            if (res.code == 'noLand') {
                location.href = 'login.html'
            }

        } else {
            alert('网络错误')
        }
    }
}
xhr.open('post', '/isLand')
xhr.send()

