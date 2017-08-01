var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var cookieParser = require('cookie-parser')
var session = require('express-session')
// var mongoStore = require('connect-mongo')
var mongoose = require('mongoose')


var app = express()
var form = multer()

app.use(express.static('wwwroot'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ 
    secret: 'goji',
    resave: true,
    saveUninitialized: false
    // store: new mongoStore({ url: 'mongodb://127.0.0.1/goji',collection: 'sessions'})
}))
app.use(cookieParser())

// 连接数据库
mongoose.connect('mongodb://127.0.0.1/goji')
var db = mongoose.connection
db.on('error',err=>{console.error('数据库连接失败：',err)})
db.on('open',()=> {console.log('成功连接数据库')})

// 首页
app.get('/', (req,res)=>{
    res.render('index.html')
})

// -----------------------------注册登录---------------------------------------

// 创建数据模型（users表）
var User = mongoose.model('users', {
    username: String, // 用户名
    password: String, //密码
    name: String, //昵称
    score: [], //分数
    total: Number, //总分
    skin: String,//皮肤
    ip: String, // ip
    time: Date // 创建时间
})

// 判断登录
app.post('/isLand',(req, res) => {

    if(!req.session.user){
        res.status(200).json({ code: 'noLand'})
    }else{
        res.status(200).json({ code: 'landed'})
    }
})

//注册
app.post('/reg', form.array(),(req, res) => {

    req.body.score = [ 
        {
            "s1" : 0
        }, 
        {
            "s2" : 0
        }, 
        {
            "s3" : 0
        }
    ]
    req.body.total = 0
    req.body.skin = '../images/d6.jpg'
    req.body.ip = req.ip
    req.body.time = new Date()   

    User.findOne({ 'username': req.body.username }).select('username').exec((err, docs) => {
        if (err) {
            res.status(200).json({ code: 'error', message: '抱歉，系统错误。。。' })
        } else if (docs) {
            res.status(200).json({ code: 'registered', message: '这个账号已经被占了，换个名字吧' })
        } else {
            new User(req.body).save(err => {
                if (err) {
                    res.status(200).json({ code: 'error', message: '系统错误' })
                } else {
                    res.status(200).json({ code: 'success', message: '骚年，注册成功了' })
                }
            })
        }
    })
})

//登录
app.post('/login', form.array(), (req, res) => {   

    User.findOne({ 'username': req.body.username }).select('username name password score total').exec((err, docs) => {
        if (err) {
            res.status(200).json({ code: 'error', message: '抱歉，系统错误。。。' })
        } else {
            if (docs == null) {
                res.status(200).json({ code: 'noLand', message: '骚年，你还没有注册呢' })
            } else if (docs.password == req.body.password) {
                
                req.session.user = docs 
                res.status(200).json({ code: 'success', message: '登录成功啦' })
            } else {
                res.status(200).json({ code: 'passError', message: '密码错了大兄弟' })
            }
        }
    })
})

// --------------------------------排行榜--------------------------------------

// 更新关卡分
app.post('/update/s1', form.array(),(req,res)=>{
    
    var score = parseInt(req.body.score)

    User.update({ "username": req.session.user.username },{$set:{"score.0.s1": score}},{safe:true},(err,docs)=>{ //{safe:true}在执行更新操作之后，驱动都会发送getLastError命令来确保更新成功
        if(err){
            res.status(200).json({ code: 'error', message: '系统错误' })
        }else{
            res.status(200).json({ code: 'success', message: '分数上传成功' })
        }
    })
})

app.post('/update/s2', form.array(),(req,res)=>{
    
    var score = parseInt(req.body.score)

    User.update({ "username": req.session.user.username },{$set:{"score.1.s2": score}},{safe:true},(err,docs)=>{
        if(err){
            res.status(200).json({ code: 'error', message: '系统错误' })
        }else{
            res.status(200).json({ code: 'success', message: '分数上传成功' })
        }
    })
})

app.post('/update/s3', form.array(),(req,res)=>{
    
    var score = parseInt(req.body.score)

    User.update({ "username": req.session.user.username },{$set:{"score.2.s3": score}},{safe:true},(err,docs)=>{
        if(err){
            res.status(200).json({ code: 'error', message: '系统错误' })
        }else{
            res.status(200).json({ code: 'success', message: '分数上传成功' })
        }
    })
})

// 更新总分
app.post('/upTotal', form.array(),(req,res)=>{
    
    var total = parseInt(req.body.total)

    User.update({ "username": req.session.user.username },{$set:{"total": total}},{safe:true},(err,docs)=>{ 
        if(err){
            res.status(200).json({ code: 'error', message: '系统错误' })
        }else{
            res.status(200).json({ code: 'success', message: '总分更新成功' })
        }
    })
})


// 显示排行
app.get('/ranking',(req,res)=>{
    
    User.find().sort({total:-1}).limit(10).select('username name total').exec((err,data)=>{
        if(err){
            // 错误页
        }else{
            // model.toObject()可以将数据从模型实例中剥离出来
            var result = data.map(m => {
                var m = m.toObject()
                delete m._id
                return m 
            })
            res.status(200).send(result)
        }
    })
})

// --------------------------------用户--------------------------------------

// 显示用户信息
app.get('/getUser', (req,res)=>{
    
    // 重新拉取数据
    User.findOne({ 'username': req.session.user.username }).select('username name password score total skin').exec((err, docs) => {
                 res.status(200).send(docs)
    })
})

// 更新皮肤
app.post('/upSkin', form.array(),(req,res)=>{

    User.update({ "username": req.session.user.username },{$set:{"skin": req.body.skin}},{safe:true},(err,docs)=>{ 
        if(err){
            res.status(200).json({ code: 'error', message: '系统错误' })
        }else{
            res.status(200).json({ code: 'success', message: '皮肤更换成功' })
        }
    })
})



// 退出登陆
app.get('/logout',(req,res)=>{
    delete req.session.user
    res.redirect('/')
})


app.listen(80, ()=>{console.log('server is running')})