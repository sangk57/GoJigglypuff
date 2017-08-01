// 显示排行
function ranking() {

    var xhr = new XMLHttpRequest()
    var ranks = ''

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var arr = JSON.parse(xhr.responseText)
                
                console.log(xhr.responseText)
                for (var i = 0; i < arr.length; i++) {
                    
                    ranks += '<section>'

                    var j = i + 1
                    
                    ranks += '<span>第' + j + '名</span>：&nbsp;'
                  
                    ranks += '<span>' + arr[i].name + '</span>'
                    
                    ranks += '&#x3000;<span>分数：' + arr[i].total + '</span>'

                    ranks += '</section>'
                }
                
                document.getElementsByTagName('div')[0].innerHTML = ranks


            }
        }
    }

    xhr.open('get', '/ranking?n=' + parseInt(Math.random() * 10000))
    xhr.send()

}
ranking()



var arr = []

function getRandomItem(arr) {
    
  var n = Math.random(arr.length)* Math.pow(10,arr.length.toString().length) 
    
   return arr[n]
}