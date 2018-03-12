const db = require('../db');
//const filter = require('../utils/filter');

module.exports = {
    register(app){
        app.post('/generateorder', (req, res) => {
            //从前端获取到数据pro
            let pros = JSON.parse(req.body.pros);
            // console.log(pros);
            let total = 0;
            // 计算总消费金额
            for(let item of pros){
                total += item.price;
            }

            //生成数据流
            let order = {
                orderno: parseInt(Math.random()*1000000),
                total,
                status:0,
                products:pros
            }

            //写入数据库
            db.mongodb.insert('order', order).then((result) =>{
                res.send(result);
            })
        })
    }
}