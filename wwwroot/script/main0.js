// FPS
var stat = new Stats()
stat.domElement.style.position = 'absolute'
stat.domElement.style.left = '0px'
stat.domElement.style.top = '0px'
document.body.appendChild(stat.domElement)

// color
var Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0
}


// --------------------------渲染器，场景，相机------------------------------------------
var scene, camera, renderer

function createScene() {
    // 场景
    scene = new THREE.Scene()

    // 雾效（颜色，最小距离，最大距离）
    // scene.fog = new THREE.Fog(0x6600CC, 100, 950)

    // 相机（透视相机：视角，纵横比，近平面，远平面)
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000)

    // 相机位置

    camera.position.x = 200
    camera.position.y = 100
    camera.position.z = 400
    camera.rotation.y = 0


    // 渲染器(透明背景，抗锯齿)
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    // 初始化渲染尺寸（全屏）
    renderer.setSize(window.innerWidth, window.innerHeight)

    // 打开阴影地图
    renderer.shadowMap.enabled = true

    // 添加到DOM
    document.getElementById('world').appendChild(renderer.domElement)

    // 实时更新屏幕尺寸
    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    }, false)
}

// --------------------------music------------------------------------------

var music
// 初始化侦听器
var audioListener = new THREE.AudioListener()
// 侦听器添加到相机中
// camera.add( audioListener )
// 实例化音频对象
var oceanAmbientSound = new THREE.Audio( audioListener )
// 音频对象添加到场景中
// scene.add(oceanAmbientSound)

// 实例化加载器
var loader = new THREE.AudioLoader()

// 加载音频资源（路径，回调函数）
loader.load(music,function (audioBuffer ) {
    oceanAmbientSound.setBuffer( audioBuffer );
		// 播放音频
		oceanAmbientSound.play();
    },// 资源加载过程中的回调函数
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% 音乐loaded' );
	},
	// 资源下载错误的回调函数
	function ( xhr ) {
		console.log( 'An error happened' );
	})






// --------------------------Lights------------------------------------------
var shadowLight

function createLights() {
    // 平行光
    shadowLight = new THREE.DirectionalLight(0xffffff, .95)

    // 光源方向
    shadowLight.position.set(250, 300, 250)

    // 开启光源阴影
    shadowLight.castShadow = true

    // 可见域的投射阴影
    shadowLight.shadow.camera.left = -400
    shadowLight.shadow.camera.right = 400
    shadowLight.shadow.camera.top = 400
    shadowLight.shadow.camera.bottom = -400  //显示否？
    shadowLight.shadow.camera.near = 1          //投射最小距离
    shadowLight.shadow.camera.far = 1000 //投射最大距离

    // 分辨率
    shadowLight.shadow.mapSize.width = 2048
    shadowLight.shadow.mapSize.widht = 2048

    scene.add(shadowLight)
}




// --------------------------floor------------------------------------------
var floor

var Floor = function () {
    this.mesh = new THREE.Object3D()

    // 垂直面
    var geomFloorVertical = new THREE.PlaneGeometry(10000, 200)
    
    var  matFloorVertical = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture('../images/b1.jpg')
     } )
    
    // var matFloorVertical = new THREE.MeshLambertMaterial({
    //     color: Colors.blue,
    //     side: THREE.DoubleSide,
    //     // shading: THREE.FlatShading
    // })
    var floorVertical = new THREE.Mesh(geomFloorVertical, matFloorVertical)
    this.mesh.add(floorVertical) //把垂直面加入地板
    floorVertical.position.y = -115
    floorVertical.position.z = 25

    // 平行面
    var geomFloorParallel = new THREE.PlaneGeometry(10000, 50)
    var matFloorParallel = new THREE.MeshLambertMaterial({
        // color: 0xffff,
        side: THREE.DoubleSide,
        // shading: THREE.FlatShading,
        alphaMap: THREE.ImageUtils.loadTexture('../images/b1.jpg'),
        // bumpScale: 0
        
    })
    var floorParallel = new THREE.Mesh(geomFloorParallel, matFloorParallel)
    floorParallel.receiveShadow = true //接收阴影
    this.mesh.add(floorParallel)
    floorParallel.position.y = -15
    floorParallel.rotation.x = Math.PI / 2


}

function createFloor() {
    floor = new Floor()
    floor.mesh.position.x = 5000
    scene.add(floor.mesh)
}
// --------------------------obstacle------------------------------------------
var obstacle,triangle,block,matBlock,mater4,texture



var Obstacle = function () {
    this.mesh = new THREE.Object3D()
    
    // var loader = new THREE.CubeTextureLoader()
    // loader.setPath( '../images/' )

    // var textureCube = loader.load( [
    //     'bg6.jpg', 'bg6.jpg',
    //     'bg6.jpg', 'bg6.jpg',
    //     'bg6.jpg', 'bg6.jpg'
    // ])

    // var matBlock = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } )
    
    
    
// 加载皮肤
    // var loader1 = new THREE.TextureLoader()
    
    // loader1.load(
    //     '../images/bg6.jpg',
    //     // 资源加载完成的回调函数
    //     function (texture) {
        
        

    // },
    // // 资源加载过程中的回调函数
    // function ( xhr ) {
	// 	console.log( (xhr.loaded / xhr.total * 100) + '% 皮肤loaded' )
	// },
    // // 资源下载错误的回调函数
	// function ( xhr ) {
	// 	console.log( 'An error happened' )
	// })

    // console.log(matBlock)
    
    

    // matBlock = new THREE.MultiMaterial(mater4)
    //方块
    // var matBlock = new THREE.MeshLambertMaterial({
    //     color: Colors.white,
    //     shading: THREE.FlatShading
    // })
    texture = THREE.ImageUtils.loadTexture('../images/b1.jpg',{},function () {
       console.log('皮肤加载完毕')
       
   })
    
        mater4 = [
            new THREE.MeshStandardMaterial( { alphaMap: texture } ), // right
            new THREE.MeshStandardMaterial( { alphaMap: texture } ), // left
            new THREE.MeshStandardMaterial( { alphaMap: texture  } ), // top
            new THREE.MeshStandardMaterial( { alphaMap: texture  } ), // bottom
            new THREE.MeshStandardMaterial( { alphaMap: texture  } ), // back
            new THREE.MeshStandardMaterial( { alphaMap: texture } )  // front
        ]
    
     matBlock = new THREE.MultiMaterial(mater4)
    
    for(var i = 0; i < block.length; i++){
        
        eval('var geoBlock = new THREE.BoxGeometry(' + block[i].x + ',' + block[i].y + ',30)' )
        
        eval('var block' + i + '=' + 'new THREE.Mesh(geoBlock, matBlock)')

        eval('block' + i + '.castShadow = true')

        eval('block' + i + '.position.x =' + block[i].xx)
                    
        eval('block' + i + '.position.y =' + block[i].yy)
        
        eval('this.mesh.add(block' + i + ')')
 
    }
    

    // 三角
    var geoTriangle = new THREE.ConeGeometry(15, 30, 8)
    var matTriangle = new THREE.MeshLambertMaterial({
        // color: Colors.pink  ,
        // shading: THREE.FlatShading
        map: THREE.ImageUtils.loadTexture('../images/b3.jpg')
    })

    for (var i = 0; i < triangle.length; i++) {

        eval('var triangle' + i + '=' + 'new THREE.Mesh(geoTriangle, matTriangle)')

        eval('triangle' + i + '.castShadow = true')

        eval('triangle' + i + '.position.x =' + triangle[i].xx)
                    
        eval('triangle' + i + '.position.y =' + triangle[i].yy)
        
        eval('this.mesh.add(triangle' + i + ')')

    }  
}
 
//实例化障碍物
function createObstacle() {
    obstacle = new Obstacle()
    obstacle.mesh.position.y = -3
    obstacle.mesh.children[0].castShadow = true
    obstacle.mesh.children[0].receiveShadow = true
    scene.add(obstacle.mesh)
}
// --------------------------candy------------------------------------------
var candy

var Candy = function () {
    this.mesh = new THREE.Object3D()
       
    // 甜甜圈
    var geoCandy = new THREE.TorusGeometry(12,6,16,100)
    var matCandy = new THREE.MeshLambertMaterial({
        color: Colors.pink  ,
        shading: THREE.FlatShading
        // map: THREE.ImageUtils.loadTexture('../images/bg2.jpg')
    })

    for (var i = 0; i < candy.length; i++) {

        eval('var candy' + i + '=' + 'new THREE.Mesh(geoCandy, matCandy)')

        eval('candy' + i + '.castShadow = true')

        eval('candy' + i + '.position.x =' + candy[i].xx)
                    
        eval('candy' + i + '.position.y =' + candy[i].yy)
        
        eval('this.mesh.add(candy' + i + ')')
    }
}
 
//实例化糖果
function createCandy() {
    candy = new Candy()
    candy.mesh.position.y = -3
    candy.mesh.children[0].castShadow = true
    candy.mesh.children[0].receiveShadow = true
    scene.add(candy.mesh)
}
// --------------------------spring------------------------------------------
var spring

var Spring = function () {
    this.mesh = new THREE.Object3D()
       
    // 弹簧
    var geoSpring = new THREE.ConeGeometry(15, 15, 8)
    var matSpring = new THREE.MeshLambertMaterial({
        color: Colors.white ,
        shading: THREE.FlatShading
        // map: THREE.ImageUtils.loadTexture('../images/bg2.jpg')
    })

    for (var i = 0; i < spring.length; i++) {

        eval('var spring' + i + '=' + 'new THREE.Mesh(geoSpring, matSpring)')

        eval('spring' + i + '.castShadow = true')

        eval('spring' + i + '.position.x =' + spring[i].xx)
                    
        eval('spring' + i + '.position.y =' + spring[i].yy)
        
        eval('this.mesh.add(spring' + i + ')')
    }
}
 
//实例化弹簧
function createSpring() {
    spring = new Spring()
    spring.mesh.position.y = -3
    spring.mesh.children[0].castShadow = true
    spring.mesh.children[0].receiveShadow = true
    scene.add(spring.mesh)
}

// --------------------------character------------------------------------------
var character
var ground = 0 //起跳点
// 定义人物
var Character = function () {
    this.mesh = new THREE.Object3D()

    // 身体
    var geomBody = new THREE.SphereGeometry(65, 32, 32)
    var matBody = new THREE.MeshPhongMaterial({
        // color: Colors.white,
        // shading: THREE.FlatShading
        map: THREE.ImageUtils.loadTexture('../images/666.jpg')
    })
    var body = new THREE.Mesh(geomBody, matBody)
    body.castShadow = true// 投掷阴影
    body.position.y = 20
    // 把body添加到人物
    this.mesh.add(body)

    // 耳朵
    var geoEar = new THREE.ConeGeometry( 50, 30, 7 )
    
    // geoEar.vertices[0].x = 100
    geoEar.vertices[2].x = 70
    geoEar.vertices[2].z = 10
    geoEar.vertices[3].x = 90
    geoEar.vertices[4].x = 60
    geoEar.vertices[4].z = -30
    geoEar.vertices[5].x = 30
    geoEar.vertices[5].z = -40
    geoEar.vertices[1].x = 50
    geoEar.vertices[1].z = 25
    
    
    var matEar = new THREE.MeshPhongMaterial({
        color: Colors.white,
        // shading: THREE.FlatShading
        // map: THREE.ImageUtils.loadTexture('../images/bg6.jpg')
    })
    
    this.earLeft = new THREE.Mesh(geoEar,matEar)
    this.earRight = new THREE.Mesh(geoEar,matEar)
    
    this.earLeft.position.y = 40
    this.earLeft.position.z = -25
    this.earLeft.rotation.x = -1
    this.earLeft.rotation.z = 1.5
    
    this.earRight.position.y = 30
    this.earRight.position.z = 35
    this.earRight.rotation.x = 1
    this.earRight.rotation.z = 1.5
    
    body.add(this.earLeft)
    body.add(this.earRight)
    
    
    // 眼睛
    var geoEye = new THREE.SphereGeometry( 20, 32)
    
    var matEye = new THREE.MeshPhongMaterial({
        color: Colors.brownDark,
        // shading: THREE.FlatShading
        // map: THREE.ImageUtils.loadTexture('../images/bg6.jpg')
    })
    
    this.eyeLeft = new THREE.Mesh(geoEye,matEye)
    this.eyeRight = new THREE.Mesh(geoEye,matEye)
    
    this.eyeLeft.position.x = 33
    this.eyeLeft.position.y = 15
    this.eyeLeft.position.z = -35
    
    this.eyeRight.position.x = 37
    this.eyeRight.position.y = 15
    this.eyeRight.position.z = 30

    
    body.add(this.eyeLeft)
    body.add(this.eyeRight)
    
    // 脚
    var geomFoot = new THREE.SphereGeometry(27, 32, 32)
    var matFoot = new THREE.MeshPhongMaterial({
        color: Colors.white,
        // shading: THREE.FlatShading
        // map: THREE.ImageUtils.loadTexture('../images/bg3.jpg')
    })
    this.footLeft = new THREE.Mesh(geomFoot, matFoot)
    this.footRight = new THREE.Mesh(geomFoot, matFoot)
    this.footLeft.castShadow = true
    this.footRight.castShadow = true
    this.footLeft.position.x = -35
    this.footLeft.position.y = -50
    this.footLeft.position.z = 25

    this.footRight.position.x = 35
    this.footRight.position.y = -50
    this.footRight.position.z = -25
    body.add(this.footLeft)
    body.add(this.footRight)
    
    // 披风
    var points = []
    for ( var i = 0; i < 10; i ++ ) {
        points.push( new THREE.Vector2( Math.cos( i * 0.2 ) * 60 + 30, ( i - 5 ) * 15 ) )
    }
    var geoCloak = new THREE.LatheGeometry( points,4,0,2 )
    var matCloak = new THREE.MeshPhongMaterial({
        color: 0xFF3333,
        // shading: THREE.FlatShading
        // map: THREE.ImageUtils.loadTexture('../images/bg3.jpg')
    })
    this.cloak = new THREE.Mesh( geoCloak, matCloak )
    this.cloak.rotation.y = -2.5
    this.cloak.position.x = -25
    this.cloak.position.y = 20
    this.cloak.rotation.z = .2
    
    // x在同一平面
    // this.cloak.geometry.vertices[0].x = 90
    // this.cloak.geometry.vertices[10].x = 90
    this.cloak.geometry.vertices[20].x = 90
    this.cloak.geometry.vertices[20].z = 10
    this.cloak.geometry.vertices[30].x = 90
    this.cloak.geometry.vertices[40].x = 90
    this.cloak.geometry.vertices[0].z = 90
    this.cloak.geometry.vertices[10].z = 50
    // this.cloak.geometry.vertices[20].z = 100
    // this.cloak.geometry.vertices[30].z = 100
    // this.cloak.geometry.vertices[40].z = 100
    
    // console.log( this.cloak.geometry.vertices)
    this.mesh.add( this.cloak )
}


// 实例化人物
function createCharacter() {
    character = new Character()
    // console.log(character.mesh.children[0].geometry.vertices)
    character.mesh.scale.set(.25, .25, .25)
    
    // character.mesh.position.x = 3000
    character.mesh.position.y = 100

    character.mesh.rotation.z = -.3
    scene.add(character.mesh)
}


// 奔跑动画
var s, p, s1
function running1() {
    if (character.footLeft.position.x == -43) {
        s = 'goRight'
    } else if (character.footLeft.position.x == 45) {
        s = 'goLeft'
    }
    if (s == 'goRight') {
        character.footLeft.position.x += 8
        // character.footLeft.position.y -= 5
    } else {
        character.footLeft.position.x -= 8
        // character.footLeft.position.y += 5
    }
}

function running2() {
    if (character.footRight.position.x == -45) {
        s1 = 'goRight'
    } else if (character.footRight.position.x == 43) {
        s1 = 'goLeft'
    }

    if (s1 == 'goRight') {
        character.footRight.position.x += 8
        // character.footRight.position.y += 5
    } else {
        character.footRight.position.x -= 8
        // character.footRight.position.y -= 5
    }
}



// 操作
var canJump = true
var jumpping = false

var onMouseDown
var a //加速度
var view = true //视角模式
// 鼠标按下
onMouseDown = function (event) {


    switch (event.button) {

        case 0: // 左键
            if (canJump === true) {
                jumpping = true
                // canJump = false
            }
            break

        // if(character.mesh.position.y == 250){
        //     jumpping = false
        //     break
        // }

        // g = .3


        case 2: //右键
            if (view === true) { // 第三人称视角
                camera.position.x = 0
                camera.position.z = 0
                camera.rotation.y = -Math.PI / 2
                view = false
            } else {            // 第一人称视角
                camera.position.x = 200
                camera.position.z = 400
                camera.rotation.y = 0
                view = true
            }
            break
    }
}
//屏蔽右键
document.oncontextmenu = function () { return false }
document.addEventListener('mousedown', onMouseDown)




//fasdfasdfasdfadsfasdfasdfasdfsdafasdf
// document.addEventListener('click',jump)

// function jump() {
//     if(character.mesh.position.y == -36){
//         p = 'goUp'
//     }else if(character.mesh.position.y == 0){
//         p = 'goDown'
//     }

//     if(p == 'goUp'){
//         character.mesh.position.y += 1
//     }else{
//         character.mesh.position.y -= 1
//     }

// }





// ----------------------------动画----------------------------------------
var shang, a = 0
var newScore = 0
//光线投射器
// var raycaster = new THREE.Raycaster()

function animate() {
    requestAnimationFrame(animate)   //循环渲染

    // 落地奔跑
    if(character.mesh.position.y == ground){
        running1()
        running2()
    }else{
        character.footLeft.position.x = -35
        character.footRight.position.x = 35
    }
   
    
    // 跳跃
    if (jumpping === true) {       //跳跃状态（给初速度）
        
        
        if(character.cloak.rotation.z <= 1){
             character.cloak.rotation.z += .03
        }
       
       if(character.mesh.rotation.z <= .1){
            character.mesh.rotation.z += .03
        }
       
        character.mesh.position.y += 8.3 - a
        a += .5
        
    }else{  //下落状态（自由落体）
  
        character.mesh.position.y -= a
        a += .5
    }
    


    if (character.mesh.position.y <= ground) {
        
        if(character.cloak.rotation.z >= .2){
            character.cloak.rotation.z -= .03
        }
        
        // 初始化位置和加速度
        // character.mesh.rotation.y = 0
        character.mesh.rotation.z = -.3
        character.mesh.position.y = ground
        a = 0
        
        jumpping = false
        // canJump = true
    }

    // 测试
    // character.mesh.rotation.y += .03

    // character.cloak.rotation.z += .01
    // character.cloak.geometry.vertices[10].x += 1
    // character.cloak.geometry.vertices[10].z += 1
    // character.cloak.geometry.vertices[20].x += 1
    // character.cloak.geometry.vertices[30].x += 1

    //行走速度
    character.mesh.position.x += 3

    if (view === true) {// 垂直视角
        camera.position.x = character.mesh.position.x + 50
    } else {// 平行视角
        camera.position.x = character.mesh.position.x + -280
    }

    // 镜头高度跟进(平缓动画？？？？)
    if(character.mesh.position.y > 100){
        camera.position.y = character.mesh.position.y
    }
     
    
    // 糖果旋转
    for(var i = 0;i < candy.mesh.children.length; i++){
           candy.mesh.children[i].rotation.y -= .1
    }
    
    // candy.mesh.children[1].rotation.y -= .1
    // candy.mesh.children[2].rotation.y -= .1
    // candy.mesh.children[3].rotation.y -= .1
    

    // 检测 character.mesh 是否与障碍物数组 obstacle.mesh 中的元素发生了碰撞

    //设置起始点，人物的坐标
    var originPoint = character.mesh.position.clone();
    // console.log(character.mesh.children[0].geometry.vertices)

    // 遍历人物身体的顶点
    for (var vertexIndex = 0; vertexIndex < character.mesh.children[0].geometry.vertices.length; vertexIndex++) {
        // 顶点原始坐标
        var localVertex = character.mesh.children[0].geometry.vertices[vertexIndex].clone();

        // 顶点经过变换后的坐标（将物体的本地坐标乘以变换矩阵，得到了这个物体在世界坐标系中的值，处理之后的值才是我们所需要的）
        var globalVertex = localVertex.applyMatrix4(character.mesh.matrix);

        // 获得由中心指向顶点的向量
        var directionVector = globalVertex.sub(character.mesh.position);

        // 创建一个新的光线投射器对象（起点向量，方向向量）
        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        // 检测射线与障碍物的相交情况（和射线相交的物体，是否检查检测所有后代)
        var collisionResults = ray.intersectObjects(obstacle.mesh.children, false)
        
         // 检测射线与糖果的相交情况（和射线相交的物体，是否检查检测所有后代)
        var collisionResults1 = ray.intersectObjects(candy.mesh.children, true)
        
        // 如果返回结果不为空，且交点与射线起点的距离小于物体中心至顶点的距离，则发生了碰撞
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            if (collisionResults[0].faceIndex == 5 || collisionResults[0].faceIndex == 4 || collisionResults[0].faceIndex == 0 ||collisionResults[0].faceIndex == 1) {
                // console.log(collisionResults[0].point.y)
                ground = collisionResults[0].point.y + 14
                
                // console.log(collisionResults[0].faceIndex)
            } else {
                // alert('GG')
                // console.log(collisionResults[0].faceIndex)
                window.location.reload()
                
                
                // console.log(collisionResults[0])
            }

            // crash = true;   // crash 是一个标记变量
        } else if(collisionResults1.length > 0 && collisionResults1[0].distance < directionVector.length()) {
                
                // 去掉碰撞的物体
                candy.mesh.remove( collisionResults1[0].object )
                
                newScore = newScore + 1
                
        }  else {
            ground = 0

        }
        
       
    }
       
   
    // 进度（显示进度条：2D小人和甜甜圈）
    document.getElementById('progress').innerHTML =  '进度：' + parseInt(character.mesh.position.x/8000*100 ) + '%，分数：' + newScore
    
    if(character.mesh.position.x > 8000){
        // finsh()  
        alert('厉害哟！你得了'+ newScore + '分，然而正式版才好玩！')
        location.href = 'index.html'
    }



    renderer.render(scene, camera)    // 渲染场景
    stat.update()          //显示FPS

}

// ----------------------------开始----------------------------------------

window.addEventListener('load', init, false)

function init() {
    createScene()
    createLights()
    createFloor()
    
    // var loader1 = new THREE.TextureLoader()
    
    // loader1.load(
    //     '../images/bg3.jpg',
    //     // 资源加载完成的回调函数
    //     function (texture) {
        
    //     console.log(texture)
    //     animate()

    // },
    // // 资源加载过程中的回调函数
    // function ( xhr ) {
	// 	console.log( (xhr.loaded / xhr.total * 100) + '% 皮肤loaded' )
	// },
    // // 资源下载错误的回调函数
	// function ( xhr ) {
	// 	console.log( 'An error happened' )
	// })

    // console.log(matBlock)
        
    createCandy()
    createObstacle()
    createCharacter()
    animate()
    // 网格辅助
    // var size = 10000;
    // var step = 1000;
    // var gridHelper = new THREE.GridHelper( size, step );
    // gridHelper.rotation.x = Math.PI/2
    // scene.add( gridHelper );
    
    
    // 顶点法向量辅助
    // geometry = new THREE.BoxGeometry( 10, 10, 10, 2, 2, 2 );
    // material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    // object = new THREE.Mesh( geometry, material );

    // edges = new THREE.VertexNormalsHelper( object, 2, 0x00ff00, 1 );

    // scene.add( object );
    // scene.add( edges );
}



