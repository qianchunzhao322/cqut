<template>
    <div class="classmate_honor_container">
        <el-timeline v-if="honors && honors.length != 0">
            <el-timeline-item :hide-timestamp="true" timestamp="2018/4/12" placement="top" v-for="(item, index) in honors"
                :key="'honor' + index">
                <!-- <div class="timeline_title">获奖时间：{{ item.time || '' }}</div> -->
                <div class="timeline_title">
                    <div class="title">
                        获奖时间：{{ getDay(item.time, '') || "" }}
                    </div>
                    <div class="contorl_btns" v-if="isEdit">
                        <span class="contorl_btn btn_edit" @click="editWordRecord(item, index)"><i
                                class="iconfont icon-a-bianzu182"></i></span>
                        <span class="contorl_btn btn_del">
                            <el-popconfirm title="是否确定删除？" @onConfirm="confirmDelWorkRecord(index)">
                                <i slot="reference" class="iconfont icon-a-xingzhuang2beifen"></i>
                            </el-popconfirm>
                        </span>
                    </div>
                </div>
                <el-card class="card_item" :gutter="10">
                    <el-row class="h-[100%]">
                        <el-col :span="24" class="flex card_item_field">
                            <div class="label">成果荣誉：</div>
                            <div class="value">{{ item.honorName }}</div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <EmptyCom v-else />
    </div>
</template>

<script>
import EmptyCom from '@/components/EmptyCom/index.vue'
export default {
    name: 'mainProduct',
    components: {
        EmptyCom,
    },
    data() {
        return {
            honors: []
        }
    },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        list(newValue, oldValue) {
            this.honors = newValue?.length ? newValue.slice(0) : []
        }
    },
    methods: {
        confirmDelWorkRecord(index) {
            this.list.splice(index, 1);
        },
        editWordRecord(item, index) {
            this.$emit('edit', { item, index })
        },
    },
}
</script>

<style lang="scss" scoped>
.classmate_honor_container {
    height: 100%;

    .timeline_title {
        margin-bottom: 10px;
        color: #2488ff;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .contorl_btns {
            display: flex;

            .contorl_btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 22px;
                height: 22px;
                border-radius: 4px;
                color: #162c5b;
                cursor: pointer;

                &:hover {
                    background: #ecf0fe;
                    color: #2488ff;
                }
            }
        }
    }

    .card_item {
        width: calc(100% - 20px);
        height: 123px;

        ::v-deep.el-card__body {
            height: 100%;

            .el-row {
                display: flex;
                flex-wrap: wrap;

                .card_item_field {
                    align-items: center;

                    .label {
                        min-width: 7em;
                    }
                }
            }
        }
    }
}</style>
