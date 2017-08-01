exist = true
pointLength = 6000
music = 'sounds/s2.mp3'
picStyle = 'desert'

verPic = '../images/1.jpg'
parPic = '../images/d5.jpg'
bgPic = '../images/bg6.jpg'
blockPic = '../images/1.jpg'
triPic = '../images/d5.jpg'


triangle = [
    {
        xx: 600,
        yy: 0
    },
    {
        xx: 630,
        yy: 0
    },
    {
        xx: 660,
        yy: 0
    },
    {
        xx: 1330,
        yy: 0
    },
     {
        xx: 2030,
        yy: 0
    },
     {
        xx: 2730,
        yy: 0
    },
    //
    {
        xx: 3800,
         yy: 0
    },
    {
        xx: 3950,
         yy: 0
    },
    //
    {
        xx: 4520,
         yy: 75
    },
    {
        xx: 4620,
         yy: 0
    },
    
    {
        xx: 4980,
         yy: 60
    },
    {
        xx: 5150,
         yy: 60
    },

]

block = [
    {
        x: 100,
        y: 30,
        xx: 3480,
        yy: 0
    },
     {
        x: 100,
        y: 90,
        xx: 3580,
        yy: 0
    },
    //
    {
        x: 100,
        y: 30,
        xx: 4200,
        yy: 0
    },
    {
        x: 250,
        y: 30,
        xx: 4330,
        yy: 30
    },
   {
        x: 75,
        y: 15,
        xx: 4530,
        yy: 60
    },
//      //这个面有点难，先注释
      {
        x: 100,
        y: 30,
        xx: 4900,
        yy: 30
    },
     {
        x: 300,
        y: 30,
        xx: 5100,
        yy: 30
    },
     {
        x: 200,
        y: 30,
        xx: 5250,
        yy: 60
    },
    

]


spring = [
    {
        xx: 580,
        yy: 0
    },

]



candy = [
    {
        xx: 4550,
        yy: 10
    },
    {
        xx: 620,
        yy: 120
    },
    {
        xx: 2550,
        yy: 80
    },
     {
        xx: 2550,
        yy: 10
    },

]



// 更新关卡分
function update(e) {
    var data = new FormData()
    data.append('score', e)
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var res = JSON.parse(xhr.responseText)
                console.log(res.message)
            }
        }
    }
    //发送post请求
    xhr.open('POST', '/update/s2')
    xhr.send(data)
}


// 更新总分
function upTotal(e) {
    var data = new FormData()
    data.append('total', total + e - score)
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var res = JSON.parse(xhr.responseText)
                console.log(res.message)
            }
        }
    }
    //发送post请求
    xhr.open('POST', '/upTotal')
    xhr.send(data)
}




function finsh() {
    // 如果分数更高，更新
    if (newScore > score) {
        update(newScore)
        upTotal(newScore)
    }
}
