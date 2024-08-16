<template>
    <div class="card_list">
        <el-checkbox-group class="card_item_list" v-model="checkedList" @change="handleCheckedCitiesChange">
            <div class="card_item" v-for="(item, index) in list" :key="item.id">
                <div class="card_item_content_container">
                    <el-checkbox :label="item" :key="`${item.name}_${index}`" class="item_checkbox"></el-checkbox>
                    <preview-img :image-url="item.image" />
                    <div class="card_item_info">
                        <div class="card_title">
                            {{ item.name }} <span v-if="item.sex" class="sex_icon"><i v-if="item.sex == '男'" class="boy_icon iconfont icon-a-bianzu43" /><i v-else class="girl_icon iconfont icon-a-bianzu44" /></span>
                        </div>
                        <div class="card_item_content" v-for="(keyItem, index) in valueMap" :key="keyItem.name">
                            <div class="card_item_label">{{ keyItem.label }}：</div>
                            <template v-if="keyItem.columnType == 'slot'" >
                                <div class="card_item_value" v-if="keyItem.slotName == 'oldProvince'">
                                    <div v-if="(item.oldProvince && item.oldProvince.length) || (item.oldCity && item.oldCity.length)">
                                        {{ item.oldProvince || '' }} {{ item.oldCity || '' }}
                                    </div>
                                    <div v-else>{{ defaultSettings.defaultTableEmptyText }}</div>
                                </div>
                                <div class="card_item_value" v-if="keyItem.slotName == 'birthday'">{{ getBirthDay(item.birthday, '') || defaultSettings.defaultTableEmptyText }}</div>
                            </template>
                            <div class="card_item_value" v-else >{{ item[keyItem.name] || defaultSettings.defaultTableEmptyText }}</div>
                        </div>
                        <div class="card_item_content">在校经历：{{ getEducationValue(item) }}</div>
                        <div class="card_item_content" v-for="n in 3" :key="`card_${n}`">
                            <div class="card_item_value">{{ getEducationList(item, n, '') }}</div>
                        </div>
                    </div>
                </div>
                <div class="card_control_container" @click="detail(item)">
                    <div class="left_btns">
                        <div class="control_btn able_btn" v-if="type == '2'" @click.stop="edit(item)">
                            <i class="iconfont icon-a-bianzu182"></i>
                            <span>编辑</span>
                        </div>
                        <div class="control_btn" :class="item.update == '1' ? 'able_btn' : 'disable_btn'" v-if="type == '2'" @click.stop="update(item)">
                            <i class="iconfont icon-shangchuan"></i>
                            <span>更新</span>
                        </div>
                        <div class="control_btn able_btn" v-if="type == '1'" @click.stop="confirm(item)">
                            <i class="iconfont icon-bianzu3"></i>
                            <span>确定</span>
                        </div>
                        <div class="control_btn el-button--text del_text_btn" @click.stop="del(item)">
                            <i class="iconfont icon-a-xingzhuang2beifen"></i>
                            <span>删除</span>
                        </div>
                    </div>
                    <div class="right_btns">
                        <div class="control_btn">
                            <i class="iconfont icon-chuizhijiantou"></i>
                        </div>
                    </div>
                </div>
            </div>
        </el-checkbox-group>
    </div>
</template>

<script>
export default {
    name: "unitCardList",
    data() {
        return {
            isIndeterminate: false,
            checkedList: [],
            valueMap: [
                {
                    label: '籍贯',
                    columnType: 'slot',
                    slotName: 'oldProvince'
                },
                {
                    label: '出生日期',
                    columnType: 'slot',
                    slotName: 'birthday'
                },
                {
                    label: '单位',
                    name: 'company'
                },
                {
                    label: '职务',
                    name: 'position',
                },
                // {
                //     label: '在校经历',
                //     name: '',
                // },
            ]
        }
    },
    watch: {
        selectedList(newValue, oldValue) {
            this.checkedList = newValue.slice(0)
        }
    },
    props: {
        selectedList: {
            type: Array,
            default: () => []
        },
        list: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: ''
        },
        checkAll: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isCheckAll() {
            return this.checkAll 
        }
    },
    methods: {
        handleCheckedCitiesChange(value){
            this.$emit('select', value)
        },
        getEducationValue(data, defaultText='--'){
            let list = data.classmateEducationRecordList || data.educationRecords
            if(list?.length){
                return ''
            }else{
                return `${defaultText}`
            }
        },
        getEducationList(data, index, defaultText='-'){
            try {
                let list = data.classmateEducationRecordList || data.educationRecords
                if(list[index - 1]){
                    let item = list[index - 1]
                    let time = this.showTime({startTime: item.startTime, endTime: item.endTime})
                    return `${time}: ${item.school} ${item.major} ${item.tag}`
                }else{
                    return `${defaultText}`
                }
            } catch (error) {
                return `${defaultText}`
            }
        },
        del(item) {
            this.$emit('delete', item)
        },
        detail(item) {
            this.$emit('detail', item)
        },
        confirm(item) {
            this.$emit('confirm', [item])
        },
        edit(item){
            this.$emit('edit', item)
        },
        update(item){
            if(item.update == '1'){
                this.$emit('update', item)
            }
        }
    },
}
</script>

<style lang="scss" scoped>

.card_list{
    height: 100%;
    .card_item_list{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        height: 100%;
        .card_item{
            margin-right: 23px;
            margin-bottom: 16px;
            padding: 8px 12px 0 12px;
            border: 1px solid #ECF0F8;
            background: #FCFDFE;
            border-radius: 8px;
            height: calc((100% - 48px)/3);
            width: calc((100% - 69px)/4);
            ::v-deep {
                .el-checkbox {
                    transform: scale(1.7);
                    .el-checkbox__label{
                        display: none;
                    }
                }
            }
            &:hover{
                box-shadow: 5px 5px 20px 0px rgba(0,0,0,0.05);
            }
            &:nth-of-type(4n + 0){
                margin-right: 0;
            }
    
            .card_item_content_container{
                height: 75%;
                display: flex;
                position: relative;
                .item_checkbox{
                    position: absolute;
                    right: 12px;
                    top: 8px;
                }
                .card_item_info{
                    display: flex;
                    flex-direction: column;
                    width: calc(100% - 100px);
                    .card_title{
                        font-size: 1rem;
                        font-weight: bold;
                    }
                    .card_item_content{
                        display: flex;
                        font-size: 0.75rem;
                        height: 0.9rem;
                        align-items: center;
                        color: #272A31;
                        width: 100%;
                        // flex: 1;
                        .card_item_label{
                            white-space: nowrap;
                        }
                        .card_item_value{
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
            .card_control_container{
                color: #9BA5BB;
                border-top: 2px solid #DDDFE7;
                display: flex;
                height: 25%;
                align-items: center;
                justify-content: space-between;
                .left_btns{
                    display: flex;
                    align-items: center;
                }
                .right_btns{
                    .icon-chuizhijiantou{
                        transform: rotate(90deg);
                    }
                }
                .control_btn{
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    font-size: 12px;
                    width: 36px;
                    align-items: center;	
                    &.able_btn{
                        color: #2488ff;
                    }
                    &.disable_btn{
                        cursor: not-allowed;
                    }
                }
            }
        }

    }
}
</style>