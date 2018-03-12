//引入mongodb模块
const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var db = null;

//实现与数据库的连接
mongo.connect('mongodb://localhost:27017/test1708lzf', (_error, _db)=>{
    if(_error){
        console.log(_error);
    }else{
        db = _db;
        //只有连接没有error才把db进行赋值
    }
});

module.exports={
    //格式化成mongodbID数据类型objectID
    objectid: (_id) =>{
        return _id ? new ObjectID(_id) : new ObjectID();
    },
    
    //查：按条件加载数据到前端页面函数
    select: (_collection, _condition) =>{
        return new Promise((resolve, reject)=>{
            db.collection(_collection).find(_condition || {}).toArray((error, result)=>{
                //把查询到的数据传递出去，注意这里ajax请求是异步操作，必须用回调函数或promise传递参数，否则获取不了数据result
                if(error){
                    reject(error);
                }else{
                     resolve(result);
                }
            })
        })
    },

    // 增加:
    insert: (_collection, _data) =>{
        return new Promise((resolve, reject)=>{
            db.collection(_collection).insert(_data).then((result, error)=>{
                resolve(result);
            })
        })
    },

    //删除
    remove: (_collection, _condition)=>{
        return new Promise((resolve, reject)=>{
            db.collection(_collection).remove(_condition).then((result, error)=>{
                resolve(result);
            })
        })
    }
}
