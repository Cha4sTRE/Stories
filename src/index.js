if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const app=require('./app')



app.listen(app.get('port'),(req,res)=>{
    console.log('server on port',app.get('port'))
})