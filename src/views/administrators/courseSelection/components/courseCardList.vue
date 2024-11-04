<template>
  <div class="card_list">
    <el-checkbox-group v-model="checkedList" class="card_item_list" @change="handleCheckedCitiesChange">
      <div v-for="(item, index) in list" :key="item.id" class="card_item">
        <div class="card_item_content_container">
          <el-checkbox :key="`${item.name}_${index}`" :label="item" class="item_checkbox" />
          <div class="card_title" :title="item.name">{{ item.name }}</div>
          <div class="card_info">
            <div v-for="(keyItem, index) in valueMap" :key="keyItem.name" class="card_item_content">
              <div class="card_item_label">{{ keyItem.label }}：</div>
              <div class="card_item_value">{{ item[keyItem.name] || defaultSettings.defaultTableEmptyText }}</div>
            </div>
          </div>
        </div>
        <div class="card_control_container" @click="detail(item)">
          <div class="left_btns">
            <div class="control_btn" @click.stop="edit(item)">
              <i class="iconfont icon-a-bianzu182" />
              <span>编辑</span>
            </div>
            <!-- <div class="control_btn el-button--text del_text_btn" @click.stop="del(item)">
              <i class="iconfont icon-a-xingzhuang2beifen" />
              <span>删除</span>
            </div> -->
          </div>
          <div class="right_btns">
            <div class="control_btn">
              <i class="iconfont icon-chuizhijiantou" />
            </div>
          </div>
        </div>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'UnitCardList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    selectedList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      valueMap: [
        {
          label: '课程编号',
          name: 'courseId'
        },
        {
          label: '课程名称',
          name: 'courseName'
        },
        {
          label: '课程人数限制',
          name: 'courseLimit'
        },
        {
          label: '课时要求',
          name: 'courseHours'
        }
      ],
      checkedList: []
    }
  },
  watch: {
    selectedList(newValue, oldValue) {
      this.checkedList = newValue.slice(0)
    }
  },
  methods: {
    handleCheckedCitiesChange(value) {
      this.$emit('select', value)
    },
    del(item) {
      this.$emit('delete', item)
    },
    detail(item) {
      this.$emit('detail', item)
    },
    edit(item) {
      this.$emit('edit', item)
    }
  }
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
            padding: 14px 14px 0 14px;
            border: 1px solid #ECF0F8;
            background: rgb(241,245,251);
            border-radius: 8px;
            // height: 190px;
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
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                .item_checkbox{
                    position: absolute;
                    right: 12px;
                    top: 8px;
                }
                .card_title{
                    font-size: 1.125rem;
                    font-weight: bold;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .card_item_content{
                    display: flex;
                    font-size: 0.75rem;
                    height: 30px;
                    align-items: center;
                    color: #272A31;
                    .card_item_label{

                    }
                    .card_item_value{

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
                    font-size: 0.75rem;
                    width: 36px;
                    align-items: center;
                }
            }
        }

    }
}
</style>
