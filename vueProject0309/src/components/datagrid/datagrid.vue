<template>
<div style="width:1000px;">
    <table class="table table-striped text-center" >
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
    <spinner v-if="show"></spinner>
</div>
</template>

<script>
//第一步生成数据表结构，并输出到student模块使用
//请在这里发起数据ajax请求----生命周期的---钩子  函数---mounted---axios
//如果可以的话请对axios进行二次封装
    //axios的ajax请求的二次封装httpclient
    import http from '../../utils/httpclient.js'

    import common from '../../common/common.js'

    import spinner from '../spinner/spinner.vue'

    export default {
        data(){
            return {
                dataset: [],
                dictionary: {},
                lanType: common.lanType,
                show: false
            }
        },
        //在datagrid.vue组件使用config,传递了请求地址过来
        props:['config'],

        components:{
            spinner
        },

        methods:{
            remove: function(obj){
                console.log(obj);
                //获取点击当前行的产品的唯一id：_id
                //console.log(obj._id);
                let currentid = obj._id;
                http.post("http://localhost:8080/delproduct", {currentid}).then((res) => {

                    //if(res.status){
                        //alert('添加商品信息成功');
                        //location.reload();
                    //}else{
                       //alert('添加商品信息不成功');
                    //}                 
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
                //console.log(res.data.data);
                this.dataset = res.data.data;
                this.show = false;
            })          
        }
    }
</script>