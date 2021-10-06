const express= require('express')
const morgan= require('morgan')
const multer= require('multer')
const path= require('path')
const exphbs= require('express-handlebars')
const { urlencoded } = require('express')
const { ExpressHandlebars } = require('express-handlebars')

//inicializacion
const app= express()
require('./databse')
//setting
app.set('port',process.env.PORT || 4000)
app.set('views',path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

app.set('view engine','.hbs')

//midlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const storage= multer.diskStorage({
    destination:path.join(__dirname,'public/upload'),
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'))

//routes
app.use(require('./routes'))

app.use(express.static(path.join(__dirname,'public')))

module.exports=app