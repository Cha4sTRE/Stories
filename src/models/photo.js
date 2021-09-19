const {Schema,model}=require('mongoose')

const Photos= new Schema({
    title:String,
    description:String,
    imageURL:String,
    public_id:String
})

module.exports=model('photos',Photos)