<template>
<div> 
    <fieldset>
            <legend>
                Create New Products
            </legend>
            <div class="form-group">
                <label>Product name:</label>
                <input type="text" id="proname" v-model="newpro.proname"/>
            </div>
            <div class="form-group">
                <label>Barcode:</label>
                <input type="text" id="barcode" v-model="newpro.barcode"/>
            </div>
            <div class="form-group">
                <label>Price:</label>
                <input type="number" id="price" v-model="newpro.price"/>
            </div>
            <div class="form-group">
                <label>Unit:</label>
                <input type="text" value="元" id="unit" v-model="newpro.unit"/>
            </div>
            <div class="form-group">
                <label>PCS:</label>
                <input type="text" value="个" id="pcs" v-model="newpro.pcs"/>
            </div>
            <div class="form-group">
                <label></label>
                <button  @click="createPro">Create</button>
            </div>
           
    </fieldset>

    <table class="table table-striped text-center" :config="config">
        <thead>
            <tr>
                <th v-for="(val, key) in dataset[0]" v-if="config.cols.indexOf(key) > -1">
                    {{key}}
                </th>
                <th>delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(obj, idx) in dataset">
                <td v-for="(val, key) in obj"  v-if="config.cols.indexOf(key) > -1">{{val}}</td>
                <td><input type="button" value="delete" @click="remove(obj)"/></td>
            </tr> 
        </tbody>
    </table>
   
</div>
</template>

<script>
    import './products.css'

    //axios的ajax请求的二次封装httpclient
    import http from '../../utils/httpclient.js'

    export default{
        //components:{
        //也就是说datagrid是products的子组件，也是说可以用prop传数据
            //datagrid
        //},
        
        data(){
            return{
                
                newpro:{
                    proname:'',
                    //存在bug，价格无法保存成数值类型
                    price: Number(''),
                    barcode:'',
                    unit:'￥',
                    pcs:'个'
                },
                //盛放后端请求过来的数据的容器dataset
                dataset: [],

                //动态改变参数内容，根据需要加载内容config
                //这里的数据是传过去datagrid组件进行显示
                config:{
                    api:"http://localhost:8080/myproduct",
                    //默认查找全部信息                   
                    params:{},

                    cols:['barcode', 'proname', 'price', 'pcs', 'unit']
                }
            }
        },

        methods:{
            createPro: function(){
                http.post("http://localhost:8080/addproduct", this.newpro ).then((res) => {
                    if(res.status){
                        alert('添加商品信息成功');
                        location.reload();
                    }else{
                        alert('添加商品信息不成功');
                    }                 
                });    
            },
            remove: function(obj){
                console.log(obj);
                //获取点击当前行的产品的唯一id：_id
                //console.log(obj._id);
                let currentid = obj._id;
                http.post("http://localhost:8080/delproduct", {currentid}).then((res) => {

                    if(res.status){
                        alert('删除商品信息成功');
                        location.reload();
                    }else{
                       alert('删除商品信息不成功');
                    }                 
                });   
            }
        },
        //发起ajax请求
        mounted(){
            //发起请求前为显示加载中
            this.show = true;
            //加载静态资源dictionary文件
            //http.get('http://localhost:88/src/dictionary/common.txt').then((res)=>{
                //console.log(res);
                //this.dictionary = res.data;
            //})

            //console.log(this.config.api);

            http.post(this.config.api, this.config.params || {}).then((res) => {
                this.dataset = res.data.data;
                this.show = false;
            })          
        }
    }
</script>