<template>
    <div class="classmate_education_container">
        <el-timeline v-if="educationList && educationList.length != 0">
            <el-timeline-item :hide-timestamp="true" timestamp="2018/4/12" placement="top" v-for="(item, index) in educationList"
                :key="'education' + index">
                <div class="timeline_title">
                    <div class="title">
                        教育时间：{{ showTime({startTime: item.startTime, endTime: item.endTime}) }}
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
                        <el-col :span="8" class="flex card_item_field" v-for="valueItem in valueMap" :key="item.label">
                            <div class="label">{{ valueItem.label }}：</div>
                            <div class="value" :title="item[valueItem.valueKey]">{{ item[valueItem.valueKey] || '' }}</div>
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
    data(){
        return {
            educationList: [],
            valueMap: [
                {
                    label: '学校名称',
                    valueKey: 'school'
                },
                {
                    label: '专业',
                    valueKey: 'major'
                },
                {
                    label: '学历',
                    valueKey: 'tag'
                }
            ]
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
        list: {
            handler(newValue, oldValue) {
                if (newValue?.length) {
                    this.educationList = newValue.slice(0);
                } else {
                    this.educationList = []
                }
            },
            deep: true,
        },
    },
    methods: {
        confirmDelWorkRecord(index) {
            this.list.splice(index, 1);
        },
        editWordRecord(item, index) {
            this.$emit('edit', {item, index})
        },
    }
}
</script>

<style lang="scss" scoped>
.classmate_education_container {
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
                    .value {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
}</style>
