const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

// 目的是为了保证用户必须先登录成功才可以使用，使用方式见代码的第十一行的filter
//app.post('/myproduct', filter, (req, res) => {})

module.exports = {
    register(app){
        //一、产品管理的接口：
        //产品查询
        app.post('/myproduct', (req, res) => {

            //必须查看或新建mongo或MySQL数据库数据先
            //接收前端传过来的数据参数，req.body.barcode
            // let barcode = req.body.barcode;
            // console.log(barcode);
            // 得到的是字符串---数据库里面的barcode也必须是字符串

            db.mongodb.select('products', {}).then((result)=>{
                
                if(result && result.length > 0){
                    res.send(apiResult(true, result));
                }else{
                    //和数据库比对之后找不到该产品
                    res.send(apiResult(false));
                }
            })
        }),

        // 产品增加
        app.post('/addproduct', (req, res) => {
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
            
            let barcode = keys.barcode;
            let proname = keys.proname;
            let price = keys.price;
            let pcs = keys.pcs;
            let unit = keys.unit;
            //写入数据库
            db.mongodb.insert('products', {barcode, proname, price, unit, pcs}).then((result)=>{
                res.send(apiResult(true, result));
            })

        }),
        //产品删除
        app.post('/delproduct', (req, res) => {
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

            db.mongodb.remove('products', {"_id":oid}).then((result)=>{
                res.send(apiResult(true, result));
            })
        })
    }
}