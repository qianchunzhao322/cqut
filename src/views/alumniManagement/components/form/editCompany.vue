<template>
    <div class="edit_work_record_container">
        <div class="form_container">
            <div class="form_head">
                <div class="head_left">
                    <img src="@/assets/unitManagement/head_left.png" alt="" />
                    <div class="form_head_title">工作履历</div>
                </div>
                <div>
                    <el-button type="text" @click="showWorkDialog('add')"><i class="iconfont icon-tianjia"></i>
                        添加工作履历</el-button>
                </div>
            </div>
            <div class="base_info_container flex">
                <slot name="left" />
                <div class="flex-1 right_container">
                    <companyList :valueMap="valueMap" @editWorkRecord="editWorkRecord" :list.sync="classmateCompanyRecords" :isEdit="true" />
                </div>
            </div>
        </div>
        <workRecord-form ref="wordRecordRef" :title="wordRecordTitle" @confirmUpdate="confirmUpdateWorkRecord"
            :data="currentWorkRecord" />
    </div>
</template>

<script>
import workRecordForm from "@/views/alumniManagement/components/form/base/workRecordForm.vue";
import companyList from "@/views/alumniManagement/components/detail/companyList.vue";
export default {
    name: "mainProduct",
    components: {
        workRecordForm,
        companyList
    },
    data() {
        return {
            currentWorkRecord: null,
            currentWorkIndex: -1,
            wordRecordTitle: "添加工作履历",
            classmateCompanyRecords: []
        };
    },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        id: {
            type: String,
            default: ''
        },
        valueMap: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        list: {
            handler(newValue, oldValue) {
                this.classmateCompanyRecords = newValue?.length ? newValue.slice(0) : []
            },
            deep: true,
        },
    },
    methods: {
        editWorkRecord({ item, index }) {
            // console.log(item, index)

            this.currentWorkIndex = index;
            this.currentWorkRecord = { ...item };
            this.wordRecordTitle = "编辑工作履历";
            this.showWorkDialog('edit')
        },
        confirmUpdateWorkRecord(data) {
            let dataParam = {
                ...data,
                classmateId: this.id,
                productList: data.products?.length ? data.products.split(",") : [],
                otherNames: data.otherName?.length ? data.otherName.split(",") : [],
            };
            delete data.name;
            if (this.currentWorkIndex == -1) {
                if (this.classmateCompanyRecords?.length) {
                    this.classmateCompanyRecords.push(dataParam);
                } else {
                    this.classmateCompanyRecords = [dataParam];
                }
            } else {
                this.$set(
                    this.classmateCompanyRecords,
                    this.currentWorkIndex,
                    dataParam
                );
                this.currentWorkRecord = null;
                this.currentWorkIndex = -1;
            }
        },
        showWorkDialog(flag) {
            if (flag == 'add') {
                this.currentWorkIndex = -1;
                this.currentWorkRecord = null;
                this.wordRecordTitle = "添加工作履历";
            }
            this.$refs.wordRecordRef.showDialog();
        },
    },
};
</script>

<style lang="scss" scoped>
.edit_work_record_container {
    height: 100%;

    .form_container {
        padding: 0 24px;
        background: #fcfdfe;
        border-radius: 4px;
        border: 1px solid #ecf0f8;
        margin-bottom: 14px;

        .form_head {
            height: 55px;
            border-bottom: 1px solid #eceef5;
            display: flex;
            font-size: 14px;
            align-items: center;
            justify-content: space-between;

            .head_left {
                display: flex;
                align-items: center;
            }

            img {
                width: 10px;
                height: 17px;
                margin-right: 4px;
            }
        }

        .base_info_container {

            .left_container,
            .right_container {
                max-height: 50vh;
                overflow: auto;
                padding: 30px;
            }
        }
    }
}
</style>
