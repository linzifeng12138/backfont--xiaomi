//模块化路由
//以路由router.js作为中继站，设置的组件的路劲？投射到app.js，
//因为app.js才是真正的投射HTML的端口

// 设置入口，第一步，开端
import Vue from 'vue';
//加载组件路由模块
//记得去安装 npm install vue-router --save -dev
import VueRouter from 'vue-router';
//路由：1、vue实例化
// 要告诉 vue 使用 vueRouter--全局作用过滤器
Vue.use(VueRouter)


// 把其他的vue 的组件引入进来
import HomeComponent from '../components/home/home.vue'
import productsComponent from '../components/products/products.vue'
import clientsComponent from '../components/clients/clients.vue'



// 重新获取根路由
const router = new VueRouter({
    routes:[
        //根组件路由
        // {path:'/', component: HomeComponent},

        // 其他组件的路由--取消上面的根路由设置，
        // 直接以下面的第一条路由显示
        {path:'/products', component:productsComponent},
        {path:'/clients', component:clientsComponent}
    ]
})

// 模块化输出
export default router;