<template>
    <div class="classmate_company_container">
        <el-timeline v-if="classmateCompanyRecords && classmateCompanyRecords.length != 0">
            <el-timeline-item :hide-timestamp="true" timestamp="2018/4/12" placement="top"
                v-for="(item, index) in classmateCompanyRecords" :key="'company' + index">
                <div class="timeline_title">
                    <div class="title">
                        任职时间：{{ showTime({startTime: item.startTime, endTime: item.endTime}) }}
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
                <el-card class="card_item">
                    <el-row class="h-[100%]" :gutter="10">
                        <el-col :span="8" class="flex card_item_field" v-for="valueItem in valueMap" :key="item.showName">
                            <div class="showName">{{ valueItem.showName }}：</div>
                            <!-- <div class="value" v-if="valueItem.slot == 'place'">
                                {{ item.province }} {{ item.city }}
                            </div>
                            <div v-else-if="valueItem.slot == 'product'">
                                <div class="value" v-if="item.productList && item.productList.length != 0">{{ item.productList.join(",") }}</div>
                            </div> -->
                            <div class="value" :title="getCompanyValue(item, valueItem.name)">{{ getCompanyValue(item, valueItem.name) }}</div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <Empty-com v-else />
    </div>
</template>

<script>
import EmptyCom from "@/components/EmptyCom/index.vue";
export default {
    name: "mainProduct",
    components: {
        EmptyCom,
    },
    data() {
        return {
            classmateCompanyRecords: [],
            // valueMap: [
            //     {
            //         showName: '单位',
            //         name: 'companyName'
            //     },
            //     {
            //         showName: '行业',
            //         name: 'industryName'
            //     },
            //     {
            //         showName: '任职部门',
            //         name: 'department'
            //     },
            //     {
            //         showName: '市值',
            //         name: 'price'
            //     },
            //     {
            //         showName: '任职岗位',
            //         name: 'position'
            //     },
            //     {
            //         showName: '所在地',
            //         name: '',
            //         slot: 'place'
            //     },
            //     {
            //         showName: '别称',
            //         name: 'otherName'
            //     },
            //     {
            //         showName: '标签属性',
            //         name: 'attributeName'
            //     },
            //     {
            //         showName: '单位类型',
            //         name: 'typeName'
            //     },
            //     {
            //         showName: '主营产品',
            //         name: 'productList',
            //         slot: 'product'
            //     },
            // ]
        }
    },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
        valueMap: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        list: {
            handler(newValue, oldValue) {
                if (newValue?.length) {
                    this.classmateCompanyRecords = newValue.slice(0);
                } else {
                    this.classmateCompanyRecords = []
                }
            },
            deep: true,
        },
    },
    methods: {
        getCompanyValue(item, name){
            try {
                const json = JSON.parse(item.showJson)
                return json[name]
            } catch (error) {
                return ''
            }
        },
        confirmDelWorkRecord(index) {
            this.list.splice(index, 1);
        },
        editWordRecord(item, index) {
            this.$emit('editWorkRecord', { item, index })
        },
    },
};
</script>

<style lang="scss" scoped>
.classmate_company_container {
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

        ::v-deep.el-card__body {

            .el-row {
                display: flex;
                flex-wrap: wrap;
                min-height: 80px;
                max-height: 183px;

                .card_item_field {
                    align-items: center;

                    .showName {
                        min-width: 5em;
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
}
</style>
