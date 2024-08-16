<template>
    <div class="edit_work_record_container">
        <div class="form_container">
            <div class="form_head">
                <div class="head_left">
                    <img src="@/assets/unitManagement/head_left.png" alt="" />
                    <div class="form_head_title">成果荣誉</div>
                </div>
                <div>
                    <el-button type="text" @click="showEducationDialog('add')"><i class="iconfont icon-tianjia"></i>
                        添加成果荣誉</el-button>
                </div>
            </div>
            <div class="base_info_container flex">
                <slot name="left" />
                <div class="flex-1 right_container">
                    <honorList @edit="editHonor" :list.sync="honorList" :isEdit="true" />
                </div>
            </div>
        </div>
        <honor-form ref="honorRef" :title="honorTitle" @confirmUpdate="confirmUpdateHonor" :data="currentHonor" />
    </div>
</template>

<script>
import honorForm from '@/views/alumniManagement/components/form/base/honorForm.vue'
import honorList from "@/views/alumniManagement/components/detail/honorList.vue";
export default {
    name: "editHonor",
    components: {
        honorList,
        honorForm
    },
    data() {
        return {
            currentHonor: null,
            currentHonorIndex: -1,
            honorTitle: "添加成果荣誉",
            honorList: []
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
                this.honorList = newValue?.length ? newValue.slice(0) : [];
            },
            deep: true,
        },
    },
    methods: {
        editHonor({ item, index }) {
            this.currentHonor = { ...item };
            this.currentHonorIndex = index;
            this.honorTitle = "编辑成果荣誉";
            this.showEducationDialog('edit');
        },
        showEducationDialog(flag) {
            if (flag == 'add') {
                this.currentHonor = null;
                this.currentHonorIndex = -1;
                this.honorTitle = "添加成果荣誉";
            }
            this.$refs.honorRef.showDialog();
        },
        confirmUpdateHonor(data) {
            let dataParam = {
                ...data,
                classmateId: this.id,
            };
            if (this.currentHonorIndex == -1) {
                if (this.honorList?.length) {
                    this.honorList.push(dataParam);
                } else {
                    this.honorList = [dataParam];
                }
                this.$forceUpdate();
            } else {
                this.$set(this.honorList, this.currentHonorIndex, dataParam);
                this.currentHonor = null;
                this.currentHonorIndex = -1;
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
