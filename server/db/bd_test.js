const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/guigu');
const conn=mongoose.connection;
const md5=require('blueimp-md5');



conn.on('connected',()=>{
    console.log('数据库连接成功...')
})

const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    userType:{type:String,required:true},
    header:{type:String}
})

/*定义Model*/
const UserModel=mongoose.model('user',userSchema);  /*user为集合名字相当于表名字*/

/*通过model的实例的save()方法添加数据*/
function saveUser(){
    const user=new UserModel({username: "史珍香",password: md5('szx123456'),userType:'laoban'})

    user.save((err,user)=>{
        console.log(err)
        if(!err){
            console.log("保存成功");
            console.log(user);
        }

    })
}

saveUser();