const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/guigu',{useNewUrlParser: true});
const conn=mongoose.connection;
conn.on('connected',()=>{
    console.log('数据库连接成功...')
})
const Schema=mongoose.Schema;


const userSchema=new Schema({
    userName:{type:String,required:true},
    passWord:{type:String,required:true},
    userType:{type:String,required:true},
    header:{type:String},
    post:{type:String},
    info:{type:String},
    company:{type:String},
    salary:{type:String}
});
/*定义Model*/
const UserModel=mongoose.model('user',userSchema);  /*user为集合名字相当于表名字*/


const chatSchema=new Schema({
   from:{type:String,required:true},/*发送用户id*/
    to:{type:String,required:true},/*接收用户id*/
    chat_id:{type:String,required:true},/*聊天id*/
    content:{type:String,required:true},/*聊天内容*/
    read:{type:Boolean,default:false},  /*标识是否已读*/
    create_time:{type:Number}
});
const ChatModel=mongoose.model('chat',chatSchema);






exports.UserModel=UserModel;
exports.ChatModel=ChatModel;
//  module.exports = UserModel;

