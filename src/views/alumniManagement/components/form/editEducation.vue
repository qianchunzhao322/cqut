<template>
    <div class="edit_work_record_container">
        <div class="form_container">
            <div class="form_head">
                <div class="head_left">
                    <img src="@/assets/unitManagement/head_left.png" alt="" />
                    <div class="form_head_title">教育经历</div>
                </div>
                <div>
                    <el-button type="text" @click="showEducationDialog('add')"><i class="iconfont icon-tianjia"></i>
                        添加教育经历</el-button>
                </div>
            </div>
            <div class="base_info_container flex">
                <slot name="left" />
                <div class="flex-1 right_container">
                    <educationRecords @edit="editEducation" :list.sync="educationList" :isEdit="true" />
                </div>
            </div>
        </div>
        <education-form ref="educationRef" :title="educationTitle" @confirmUpdate="confirmUpdateEducation"
            :data="currentEducation" />
    </div>
</template>

<script>
import educationForm from '@/views/alumniManagement/components/form/base/educationalExperience.vue'
import educationRecords from "@/views/alumniManagement/components/detail/educationRecords.vue";
export default {
    name: "mainProduct",
    components: {
        educationRecords,
        educationForm
    },
    data() {
        return {
            currentEducation: null,
            currentEducationIndex: -1,
            educationTitle: "添加教育经历",
            educationList: []
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
        }
    },
    watch: {
        list: {
            handler(newValue, oldValue) {
                this.educationList = newValue?.length ? newValue.slice(0) : [];
            },
            deep: true,
        },
    },
    methods: {
        editEducation({ item, index }) {
            this.currentEducation = { ...item };
            this.currentEducationIndex = index;
            this.educationTitle = "编辑教育经历";
            this.showEducationDialog('edit');
        },
        showEducationDialog(flag) {
            if (flag == 'add') {
                this.currentEducation = null;
                this.currentEducationIndex = -1;
                this.educationTitle = "添加教育经历";
            }
            this.$refs.educationRef.showDialog();
        },
        confirmUpdateEducation(data) {
            let dataParam = {
                ...data,
                classmateId: this.id,
            };
            if (this.currentEducationIndex == -1) {
                if (this.educationList?.length) {
                    this.educationList.push(dataParam);
                } else {
                    this.educationList = [dataParam];
                }
            } else {
                this.$set(
                    this.educationList,
                    this.currentEducationIndex,
                    dataParam
                );
                this.currentEducation = null;
                this.currentEducationIndex = -1;
            }
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
                padding: 30px;
                max-height: 50vh;
                overflow: auto;
            }
        }
    }
}
</style>
