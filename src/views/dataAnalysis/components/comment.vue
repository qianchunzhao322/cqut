<!--评论模块-->
<template>
  <div class="container">
    <div class="title_container">
      <div class="left_title">
        <img src="../../../assets/index/circle.png" alt="">
        <div class="title_content">留言板</div>
      </div>
      <div v-show="userInfo.permissionCode == '3'" class="right_title">
        <el-button size="mini" @click="dialogFormVisible = true">问老师</el-button>
      </div>
    </div>
    <el-scrollbar style="width: 100%;height: calc(100% - 60px);">
      <div v-for="item in comments" :key="item.id" class="comment">
        <div class="info">
          <img class="avatar" src="@/assets/navbar/avatar.png" width="36" height="36">
          <div class="right">
            <div class="name">{{ item.userName }}</div>
            <div class="date">{{ item.commentDate }}</div>
          </div>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="control">
          <span class="comment-reply" @click="showCommentInput(item)">
            <i class="iconfont icon-comment" />
            <span>回复</span>
          </span>
          <span class="comment-reply" @click="del(item)">
            <i class="iconfont icon-comment" />
            <span v-show="userInfo.permissionCode == '3'" style="color: #F74B4B;">删除</span>
          </span>
        </div>
        <div class="reply">
          <div v-for="reply in item.reply" :key="reply.id" class="item">
            <div class="reply-content">
              <span class="from-name">{{ reply.userName }}</span><span>: </span>
              <span class="to-name">@{{ reply.replyUserName }}</span>
              <span>{{ reply.content }}</span>
            </div>
            <div class="reply-content">
              <span style="font-size: 12px;color: #909399;">{{ reply.commentDate }}</span>
            </div>
            <div class="reply-bottom">
              <span>{{ reply.date }}</span>
              <span class="reply-text" @click="showCommentInput(item, reply)">
                <i class="iconfont icon-comment" />
                <span>回复</span>
              </span>
              <span v-show="userRealId == reply.userId" class="reply-text" @click="del(item, reply)">
                <i class="iconfont icon-comment" />
                <span style="color: #F74B4B;">删除</span>
              </span>
            </div>
          </div>
          <div v-if="item.reply" class="write-reply" @click="showCommentInput(item)">
            <i class="el-icon-edit" />
            <span class="add-comment">添加新评论</span>
          </div>
          <transition name="fade">
            <div v-if="showItemId === item.id" class="input-wrapper">
              <el-input
                v-model="inputComment"
                class="gray-bg-input"
                type="textarea"
                :rows="3"
                :placeholder="placeholder"
                autofocus
              />
              <div class="btn-control">
                <span class="cancel" @click="cancel">取消</span>
                <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </el-scrollbar>
    <el-dialog title="向老师留言" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="选择教师" :label-width="formLabelWidth">
          <el-select v-model="form.teaId" placeholder="请选择想要咨询的教师">
            <el-option
              v-for="item in teaList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="留言内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitComment">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { selectUser } from '@/api/systemSettings/userOpt'
import { addComment, deleteComment } from '@/api/comment'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        teaId: null,
        content: null
      },
      formLabelWidth: '120px',
      teaList: [],
      inputComment: '',
      placeholder: '',
      showItemId: '',
      currentItem: null,
      currentReply: null
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userRealId'])
  },
  created() {
    this.getTea()
    console.log(this.userInfo)
  },
  methods: {
    getTea() {
      const params = { permissionCode: 2, page: 1, pageSize: 100 }
      selectUser(params).then((res) => {
        res.data.records.forEach(e => {
          var temp = {
            value: e.userId,
            label: e.realName
          }
          this.teaList.push(temp)
        })
      })
    },
    cancel() {
      this.showItemId = ''
      this.inputComment = ''
      this.currentItem = null
      this.currentReply = null
    },
    commitComment() {
      this.dialogFormVisible = false
      const params = {
        userId: this.userRealId, // 评论者ID
        userName: this.userInfo.realName, // 评论者名字
        commentDate: moment().format('yyyy-MM-DD HH:mm:ss') // 评论时间
      }
      if (this.currentItem) {
        // 这是回复
        params.parentId = this.currentItem.id // 父评论id，即父亲的id
        this.currentReply ? params.replyId = this.currentReply.userId : params.replyId = this.currentItem.userId // 被评论者id
        params.content = this.inputComment // 评论内容
      } else {
        // 这是新增
        params.objectId = this.form.teaId // 被评论者id
        params.content = this.form.content // 评论内容
      }
      // console.log(params)
      addComment(params).then((res) => {
        if (res.code === 200) {
          this.cancel()
          this.$message.success('留言成功……')
          this.$emit('getData')
        }
      })
    },

    /**
       * 点击评论按钮显示输入框
       * item: 当前大评论
       * reply: 当前回复的评论
       */
    showCommentInput(item, reply) {
      console.log(item, reply)
      if (reply) {
        this.inputComment = ''
        this.placeholder = '@' + reply.userName + '……'
      } else {
        this.placeholder = '请写下你的发言……'
        this.inputComment = ''
      }
      this.showItemId = item.id
      this.currentItem = item
      this.currentReply = reply
    },
    del(item, reply) {
      let id = null
      reply ? id = reply.id : id = item.id
      deleteComment(id).then((res) => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.$emit('getData')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

  .container {
    padding: 0 10px;
    box-sizing: border-box;
    .title_container {
        display: flex;
        height: 60px;
        align-items: center;
        padding: 0 20px;
        // padding: 34px 32px 0 20px;
        justify-content: space-between;

        .left_title {
            display: flex;
            align-items: center;
        }

        img {
            width: 18px;
            height: 18px;
        }

        .title_content {
            margin-left: 10px;
            font-size: 16px;
            color: #162C5B;
            font-weight: bold;
        }
    }
    .comment {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-bottom: 1px solid #e5e5e6;
      border-radius: 2px;
      .info {
        display: flex;
        align-items: center;
        .avatar {
          border-radius: 50%;
        }
        .right {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          .name {
            font-size: 16px;
            color: #409EFF;
            margin-bottom: 5px;
            font-weight: 500;
          }
          .date {
            font-size: 12px;
            color: #909399;
          }
        }
      }
      .content {
        font-size: 16px;
        color: #303133;
        line-height: 20px;
        padding: 10px 0;
      }
      .control {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #909399;
        .like {
          display: flex;
          align-items: center;
          margin-right: 20px;
          cursor: pointer;
          &.active, &:hover {
            color: #409EFF;
          }
          .iconfont {
            font-size: 14px;
            margin-right: 5px;
          }
        }
        .comment-reply {
          display: flex;
          align-items: center;
          cursor: pointer;
          &:hover {
            color: #C0C4CC;
          }
          .iconfont {
            font-size: 16px;
            margin-right: 5px;
          }
        }

      }
      .reply {
        margin: 10px 0;
        border-left: 2px solid #DCDFE6;
        .item {
          margin: 0 10px;
          padding: 10px 0;
          border-bottom: 1px dashed #EBEEF5;
          .reply-content {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #303133;
            .from-name {
              color: #409EFF;
            }
            .to-name {
              color: #409EFF;
              margin-left: 5px;
              margin-right: 5px;
            }
          }
          .reply-bottom {
            display: flex;
            align-items: center;
            margin-top: 6px;
            font-size: 12px;
            color: #909399;
            .reply-text {
              display: flex;
              align-items: center;
              margin-left: 10px;
              cursor: pointer;
              &:hover {
                color: #C0C4CC;
              }
              .icon-comment {
                margin-right: 5px;
              }
            }
          }
        }
        .write-reply {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #909399;
          padding: 10px;
          cursor: pointer;
          &:hover {
            color: #303133;
          }
          .el-icon-edit {
            margin-right: 5px;
          }
        }
        .fade-enter-active, fade-leave-active {
          transition: opacity 0.5s;
        }
        .fade-enter, .fade-leave-to {
          opacity: 0;
        }
        .input-wrapper {
          padding: 10px;
          .gray-bg-input, .el-input__inner {
            /*background-color: #67C23A;*/
          }
          .btn-control {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-top: 10px;
            .cancel {
              font-size: 16px;
              color: #606266;
              margin-right: 20px;
              cursor: pointer;
              &:hover {
                color: #C0C4CC;
              }
            }
            .confirm {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
</style>
