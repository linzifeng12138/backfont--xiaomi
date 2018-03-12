<template>

    <div>
        <h3>伪小米商城后台管理系统</h3>
    </div>

</template>

<script>
    import common from '../../../common/common.js'

    export default{
        data(){
            return {
                lanType: common.lanType
            }
        },
        mounted(){
            console.log(this.$store.state.header.lanType);
        }     
    }
</script>