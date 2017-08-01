// 显示过关情况
function getPoint() {

    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var arr = JSON.parse(xhr.responseText)
                
                
                console.log(arr)
                for (var i = 0; i < arr.score.length; i++) {
                    
                        var s = ''
                   
                        for (var j = 0; j < eval(' arr.score[i].s' + (i+1)); j++) {
                            s += '★'
                        }
                        var l = 4-s.length
                        for(var n = 0; n < l; n++){
                            s += '☆'
                        }
                        
                    document.getElementsByTagName('span')[i].innerHTML = s
                }  
            }
        }
    }

    xhr.open('get', '/getUser?n=' + parseInt(Math.random() * 10000))
    xhr.send()

}

getPoint()