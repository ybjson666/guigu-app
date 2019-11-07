const express = require('express');
const router = express.Router();
const md5=require('blueimp-md5');
const { UserModel,ChatModel } =require('../db/models');
const filter={passWord:0,_v:0}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});


/*
注册接口
 **/
router.post('/api/register',(req,res)=>{
  //1.获取请求参数
    const { userName , passWord,userType}=req.body;
    //判断用户是否存在，如果存在则注册失败

    UserModel.findOne({ userName },(err,user)=>{
        if(user){
            res.send({code:201,msg:"此用户已存在,去登陆吧"})
        }else{
            new UserModel({userName,userType,passWord:md5(passWord)}).save((err,user)=>{
                /*持久化cookie，浏览器会保持在本地文件(7天)*/
                res.cookie('userId',user._id,{maxAge: 1000*60*60*24*7});
                const data={userName,userType,_id:user._id};
                res.send({code:200,msg:"注册成功",data})
            })
        }
    })
});

/*登录接口*/
router.post('/api/login',(req,res)=>{
    const { userName, passWord} =req.body;
    //根据userName和passWord查询用户是否存在，不存在就登录失败
    UserModel.findOne({ userName,passWord:md5(passWord)},filter,(err,user)=>{
        if(!err){
            if(user){
                res.cookie('userId',user._id,{maxAge: 1000*60*60*24*7});
                res.send({code:200,msg:"登录成功",data:user})
            }else{
                res.send({code:201,msg:"用户名或密码错误"})
            }
        }
    })
});

/*更新用户信息*/
router.post('/api/update',(req,res)=>{
    //从请求的cookie中获取用户id
    const userId=req.cookies.userId;
    if(!userId){//不存在cookies userId
        res.send({code:201,msg:"请先登录"})
    }else{
        const user = req.body;
        UserModel.findByIdAndUpdate({_id:userId},user,(err,oldUser)=>{
            if(!oldUser){
                res.clearCookie('userId');
                res.send({code:202,msg:"登录已过期,请从新登录"})
            }else{
                const { _id,userName,userType } =oldUser;
                res.send({code:200,msg:"提交成功",data:Object.assign(user,{_id,userName,userType })})
            }
        })
    }

});

/*获取用户信息*/

router.get('/api/user',(req,res)=>{
    const userId=req.cookies.userId;
    if(!userId){//不存在cookies userId
        res.send({code:201,msg:"请先登录"})
    }else{
        UserModel.findOne({_id:userId},filter,(err,user)=>{
            if(user){
                res.send({code:200,msg:"请求成功",data:user})
            }else{
                res.send({code:202,msg:"数据错误"})
            }
        })
    }
});

/*获取用户列表*/
router.get('/api/userList',(req,res)=>{
    const { userType } =req.query;
    UserModel.find({userType},filter,(err,users)=>{

        res.send({code:200,msg:"获取成功",data:users});
    })
});

/*修改指定消息为已读*/

router.post('/api/readMsg',(req,res)=>{
    const from =req.body.from;
    const to=req.cookies.userId;
    ChatModel.update({from,to,read:false},{read:true},{multi:true},(err,doc)=>{
        console.log(doc);
        res.send({code:200,msg:'操作成功',data:doc.nModified})
    });

});

/*获取当前用户的聊天消息列表*/
router.get('/api/msgList',(req,res)=>{
    const userId=req.cookies.userId;

    /*查询到所有用户的文档数组*/
    UserModel.find((err,userDocs)=>{
        /*数组遍历写法*/

        // const users={};
        // userDocs.forEach((doc)=>{
        //     users[doc._id]={ userName:doc.userName,header:doc.header}
        // });

        /*reduce写法*/

        const users=userDocs.reduce((users,user)=>{
            users[user._id]={ userName:user.userName,header:user.header};
            return users;
        },{});

    /*查询userId的相关的所有聊天信息*/
        ChatModel.find({'$or':[{from:userId},{to:userId}]},filter,(err,chatMsgs)=>{
            res.send({code:200,msg:'获取成功',data:{users,chatMsgs}});
        })
    })

});

module.exports = router;
