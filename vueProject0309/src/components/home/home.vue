<template>
    <div>
        <div class="header">
            <dkheader></dkheader>
        </div>

        <div class="body">
            <div class="nav">
                <dknav></dknav>
            </div>

            <div class="container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

    import './home.css'
    //把nav和header两个组件引入进来，并特定化两个对应的标签
    //目的是为了显示两处指定内容到里面
    //
    //其余组件就默认放置在<router-view></router-view>---
    //只有根组件才能设置
    import dknav from './nav/nav.vue'

    import dkheader from './header/header.vue'


    export default{
        components:{
            dknav,
            dkheader
        }
    }

</script>