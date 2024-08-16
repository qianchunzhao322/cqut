<template>
    <div class="alumni_avatar">
        <img v-if="imageUrl && imageUrl.length" :src="imageUrl" alt="">
        <img v-else :src="defaultImage" alt="">
        <div class="mask">
            <i @click.stop="previewImage" class="iconfont icon-a-bianzu18beifen lookBig"></i>
        </div>
    </div>
</template>

<script>
const defaultImage = require('@/assets/avatar.jpeg')
export default {
    name: 'PreviewImage',
    props: {
        imageUrl: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            defaultImage
        }
    },
    methods: {
        previewImage() {
            if (this.imageUrl?.length) {
                this.$hevueImgPreview(this.imageUrl)
            } else {
                this.$hevueImgPreview(this.defaultImage)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.alumni_avatar {
    width: 90px;
    min-width: 90px;
    height: 90px;
    margin-right: 16px;
    cursor: pointer;
    position: relative;

    &:hover {
        .mask {
            display: block;
        }
    }

    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.27);

        display: none;
        .lookBig {
            padding: 0 5px;
            font-size: 20px;
            position: absolute;
            right: 0;
            bottom: 0;
            color: #FFFFFF;

            &:hover {
                transform: scale(1.1);
            }
        }
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}</style>