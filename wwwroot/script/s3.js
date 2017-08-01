exist = true
pointLength = 7000
music = 'sounds/s1.mp3'
picStyle = 'ice'

verPic = '../images/b1.jpg'
parPic = '../images/b1.jpg'
bgPic = '../images/bg8.jpg'
blockPic = '../images/b1.jpg'
triPic = '../images/b3.jpg'


triangle = [
    {
        xx: 900,
        yy: 0
    },
    {
        xx: 1000,
        yy: 0
    },
    {
        xx: 1100,
        yy: 0
    },
    {
        xx: 1300,
        yy: 0
    },

    {
        xx: 1500,
        yy: 0
    },
    {
        xx: 2000,
        yy: 0
    },

    {
        xx: 2600,
        yy: 0
    },

    {
        xx: 2800,
        yy: 0
    },
    {
        xx: 3850,
        yy: 0
    },

    {
        xx: 3920,
        yy: 100
    },


    {
        xx: 4300,
        yy: 0
    },

    {
        xx: 4400,
        yy: 0
    },



    {
        xx: 4700,
        yy: 0
    },


    {
        xx: 4925,
        yy: 0
    },


    {
        xx: 5100,
        yy: 0
    },


    {
        xx: 5225,
        yy: 0
    },

    {
        xx: 5450,
        yy: 0
    },


    {
        xx: 5900,
        yy: 0
    },

    {
        xx: 6000,
        yy: 0
    },
    {
        xx: 6200,
        yy: 50
    },
    {
        xx: 6300,
        yy: 110
    },
    {
        xx: 6680,
        yy: 100
    },
    {
        xx: 6780,
        yy: 0
    },



]

block = [
    {
        x: 100,
        y: 30,
        xx: 1300,
        yy: 45
    },
    {
        x: 100,
        y: 30,
        xx: 1450,
        yy: 99
    },
    {
        x: 100,
        y: 30,
        xx: 1700,
        yy: 60
    },
    {
        x: 100,
        y: 30,
        xx: 2000,
        yy: 45
    },
    {
        x: 100,
        y: 30,
        xx: 2100,
        yy: 90
    },
    {
        x: 100,
        y: 30,
        xx: 2200,
        yy: 135
    },
    {
        x: 100,
        y: 30,
        xx: 2300,
        yy: 180
    },
    {
        x: 110,
        y: 30,
        xx: 2400,
        yy: 120
    },

    {
        x: 50,
        y: 30,
        xx: 2573,
        yy: 160
    },

    {
        x: 50,
        y: 30,
        xx: 2700,
        yy: 180
    },



    {
        x: 40,
        y: 30,
        xx: 3000,
        yy: 30
    },

    {
        x: 40,
        y: 30,
        xx: 3050,
        yy: 75
    },


    {
        x: 50,
        y: 30,
        xx: 3400,
        yy: 70
    },
    {
        x: 50,
        y: 30,
        xx: 3500,
        yy: 70
    },
    {
        x: 100,
        y: 30,
        xx: 3600,
        yy: 70
    },
    {
        x: 50,
        y: 30,
        xx: 3750,
        yy: 70
    },
    {
        x: 100,
        y: 30,
        xx: 3920,
        yy: 70
    },
    {
        x: 50,
        y: 30,
        xx: 4000,
        yy: 35
    },

    {
        x: 10,
        y: 30,
        xx: 4400,
        yy: 45
    },


    {
        x: 100,
        y: 30,
        xx: 4650,
        yy: 45
    },

    {
        x: 100,
        y: 30,
        xx: 4750,
        yy: 75
    },

    {
        x: 10,
        y: 30,
        xx: 5000,
        yy: 45
    },

    {
        x: 10,
        y: 30,
        xx: 5100,
        yy: 45
    },

    {
        x: 10,
        y: 30,
        xx: 5225,
        yy: 45
    },

    {
        x: 100,
        y: 30,
        xx: 5650,
        yy: 45
    },

    {
        x: 50,
        y: 30,
        xx: 5800,
        yy: 100
    },
    {
        x: 100,
        y: 30,
        xx: 6200,
        yy: 20
    },
    {
        x: 120,
        y: 30,
        xx: 6300,
        yy: 80
    },
    {
        x: 250,
        y: 30,
        xx: 6540,
        yy: 45
    },
    {
        x: 30,
        y: 60,
        xx: 6680,
        yy: 60
    },





]


spring = [

    {
        xx: 1600,
        yy: 0
    },
    {
        xx: 1900,
        yy: 0
    },
    {
        xx: 3320,
        yy: 0
    },

    {
        xx: 5800,
        yy: 125
    }

]



candy = [
    {
        xx: 1400,
        yy: 20
    },

    {
        xx: 2700,
        yy: 280
    },

    {
        xx: 5900,
        yy: 220
    },
    {
        xx: 6600,
        yy: 100
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
                // alert(res.message)
            }
        }
    }
    //发送post请求
    xhr.open('POST', '/update/s3')
    xhr.send(data)
}


// 更新总分
function upTotal(e) {
    var data = new FormData()
    console.log(total + e - score)
    data.append('total', total + e - score)
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var res = JSON.parse(xhr.responseText)
                // alert(res.message)
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
