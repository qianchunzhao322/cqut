<template>
    <span class="copy_icon_contianer" v-if="targetValue && targetValue.length">
        <i v-if="!copySuccess" class="copy_icon iconfont icon-fuzhi" @click="copy"></i>
        <i v-else class="copy_icon iconfont icon-fuzhichenggong"></i>
    </span>
</template>

<script>
export default {
    name: 'CopyIcon',
    props: {
        targetValue: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            copySuccess: false
        }
    },
    methods: {
		copy(){
			this.$copyText(this.targetValue).then(()=>{
                // success
                this.copySuccess = true;
                setTimeout(() => {
                    this.copySuccess = false
                }, 1000);
                this.$message.success('复制成功')
            }, ()=>{
                // fail
                this.$message.warning('复制失败')
            })
		},
    },
}
</script>

<style lang="scss" scoped>
    .copy_icon_contianer{
        margin-left: 5px;
        .copy_icon{
            cursor: pointer;
            color: #1E89FF;
            font-size: 16px;
        }
        .el-icon-document-copy{
        }
    }
</style>