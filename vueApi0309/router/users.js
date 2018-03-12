//使用token模块引入--查看packjson是否已安装该插件
const jwt = require('jsonwebtoken');
//连接数据库
const db = require('../db');

//连接自定义公共模块--数据返回的格式化封装模块
const apiResult = require('../utils/apiResult');

module.exports={
    register(app){
        app.post('/login', (req,res)=>{
            db.mongodb.select('users', {}).then((result) => {    
                res.send(apiResult(result && result.length > 0, result));
                // 返回给前端的数据格式是{status:_result}
                // 里面的_result参数要么true--登录成功；false表示登录失败:
            })

        }),
        // 产品增加
        app.post('/adduser', (req, res) => {
            var keys;
            for(var key in req.body){
                keys = JSON.parse(key);
            };

            console.log(keys);
            // 数据的格式：
            // {
            //     proname: 'wwwww',
            //     barcode: '33333333',
            //     price: '23',
            //     pcs: '个',
            //     unit: '元'
            // }
            
            let username = keys.username;
            let password = keys.password;
           
            //写入数据库
            db.mongodb.insert('users', {username, password}).then((result)=>{
                res.send(apiResult(true, result));
            })

        }),
        //删除用户
        app.post('/deluser', (req, res) => {
            var del_key;
            var id;
            for(var key in req.body){
                del_key = JSON.parse(key);
            };
            for(var realkey in del_key){
                id = del_key[realkey];
            };
            // 转化成符合格式的id数据
            let oid = db.mongodb.objectid(id);
            //console.log(oid);

            db.mongodb.remove('users', {"_id":oid}).then((result)=>{
                res.send(apiResult(true, result));
            })
        })
    }
}
