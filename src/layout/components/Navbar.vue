<template>
  <div class="navbar">
    <div class="navbar_header">
      <div class="navbar_title">
        {{ title }}
      </div>
      <div class="right-menu">
        <el-dropdown
          class="avatar-container"
          trigger="click"
        >
          <span class="avatar-wrapper">
            <img
              src="../../assets/navbar/avatar.png"
              class="user-avatar"
            >
            <div class="user-name">{{ realName }}</div>
            <i class="el-icon-caret-bottom" />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            class="user-dropdown"
          >
            <el-dropdown-item>
              <span
                style="display:block;"
                @click="showPerson"
              >个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span
                style="display:block;"
                @click="showChangePass"
              >修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="showLogout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      :modal-append-to-body="false"
      title="个人信息"
      :visible.sync="dialogVisible"
      width="504px"
      @closed="resetForm('changePersonRef')"
    >
      <el-form
        ref="changePersonRef"
        :rules="personRules"
        label-width="80px"
        :model="formAll"
      >
        <el-form-item
          label="用户ID"
          prop="userId"
        >
          <el-input
            v-model.trim="formAll.userId"
            maxlength="20"
            disabled
            placeholder="请输入用户ID"
          />
        </el-form-item>
        <el-form-item
          label="用户姓名"
          prop="realName"
        >
          <el-input
            v-model.trim="formAll.realName"
            maxlength="20"
            disabled
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item
          label="身份证号"
          prop="identityNumber"
        >
          <el-input
            v-model.trim="formAll.identityNumber"
            placeholder="请输入身份证号"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          label="联系手机"
          prop="phoneNumber"
        >
          <el-input
            v-model.trim="formAll.phoneNumber"
            placeholder="请输入联系手机"
            maxlength="20"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="resetInfo"
        >确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :modal-append-to-body="false"
      title="修改密码"
      :visible.sync="changePassDialogVisible"
      custom-class="change_pass_container"
      width="504px"
      @closed="resetForm('changePassRef')"
    >
      <el-form
        ref="changePassRef"
        :rules="rules"
        label-width="80px"
        :model="formPwd"
      >
        <el-form-item
          label="旧密码"
          prop="oldPwd"
        >
          <el-input
            v-model.trim="formPwd.oldPwd"
            type="password"
            placeholder="请输入旧密码"
            maxlength="20"
          >
            <i
              slot="suffix"
              :class="['iconfont', inputType1 == 'text' ? 'icon-a-bianzu42beifen' : 'icon-a-bianzu42']"
              @click.stop="togglePasswordType('inputType1')"
            />
          </el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPwd"
        >
          <el-input
            v-model.trim="formPwd.newPwd"
            placeholder="请输入新密码"
            :type="inputType2"
            maxlength="20"
            @clear="clearPassword('name2')"
          >
            <i
              slot="suffix"
              :class="['iconfont', inputType2 == 'text' ? 'icon-a-bianzu42beifen' : 'icon-a-bianzu42']"
              @click.stop="togglePasswordType('inputType2')"
            />
          </el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cNewPwd"
        >
          <el-input
            v-model.trim="formPwd.cNewPwd"
            :type="inputType3"
            placeholder="请再次输入新密码"
            maxlength="20"
            @clear="clearPassword('name3')"
          >
            <i
              slot="suffix"
              :class="['iconfont', inputType3 == 'text' ? 'icon-a-bianzu42beifen' : 'icon-a-bianzu42']"
              @click.stop="togglePasswordType('inputType3')"
            />
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="controlFunc()">取消</el-button>
        <el-button
          type="primary"
          @click="changPwd"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const sha256 = require('js-sha256').sha256
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
// import { title } from '@/settings'
import {
  getUserInfo
} from '@/utils/auth'
import { getInfo } from '@/api/user'
export default {
  components: {
  },
  data() {
    return {
      // title,
      changePassDialogVisible: false,
      dialogVisible: false,
      accountModify: null,
      formAll: {
        id: '',
        userId: '',
        realName: '',
        identityNumber: '',
        phoneNumber: '',
        permissionCode: ''
      },
      options: [{
        value: '0',
        label: '管理员'
      }, {
        value: '1',
        label: '用户'
      }],
      formPwd: {
        oldPwd: '',
        newPwd: '',
        cNewPwd: ''
      },
      personRules: {
        userId: [
          { message: '用户ID不能为空', trigger: ['blur', 'change'] }
        ],
        realName: [
          { message: '用户名不能为空', trigger: ['blur', 'change'] }
        ],
        identityNumber: [
          { required: true, message: '身份证号不能为空', trigger: ['blur', 'change'] },
          {
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: '请输入正确的身份证号',
            trigger: ['blur', 'change']
          }
        ],
        phoneNumber: [{
          required: true,
          message: '联系手机不能为空',
          trigger: ['blur', 'change']
        },
        {
          pattern:
            /^1(3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/,
          message: '请输入正确的手机号',
          trigger: ['blur', 'change']
        }]
      },
      rules: {
        oldPwd: [{ required: true, message: '旧密码不能为空', trigger: ['blur', 'change'] }],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: ['blur', 'change'] },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: ['blur', 'change'] },
          {
            validator: (rule, value, callback) => {
              const reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[@])\S*$/
              if (!reg.test(value)) {
                callback(new Error('密码强度不够,必须由大小写字母、数字、@组成'))
              }
              this.$refs.changePassRef.validateField('cNewPwd')
              callback()
            }
          }
        ],
        cNewPwd: [
          { required: true, message: '请再次输入新密码', trigger: ['blur', 'change'] },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: ['blur', 'change'] },
          {
            validator: (rule, value, callback) => {
              if (value !== this.formPwd.newPwd) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      inputType1: 'password',
      inputType2: 'password',
      inputType3: 'password'

    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    realName() {
      if (this.userInfo) {
        return this.userInfo.realName || ''
      } else {
        return ''
      }
    },
    title() {
      const themeDataJSON = localStorage.getItem('theme')
      const themeData = JSON.parse(themeDataJSON)
      return themeData ? themeData.name : '选课数据服务平台'
    }
  },
  mounted() {
    this.$store.dispatch('user/getInfo')
    this.init()
  },
  methods: {
    init() {
      getInfo(getUserInfo().id).then((res) => {
        this.accountModify = res.data.accountModify
        if (this.accountModify === 0) {
          this.changePassDialogVisible = true
        }
      })
    },
    controlFunc() {
      if (this.accountModify === 0) {
        this.changePassDialogVisible = true
        this.$message.warning('第一次登陆请修改密码以保证账号安全')
      } else {
        this.changePassDialogVisible = false
      }
      // this.accountModify === 0 ? this.changePassDialogVisible = true : this.changePassDialogVisible = false
    },
    clearPassword(name) {
      this.formLabelAlign[name] = ''
    },
    togglePasswordType(name) {
      this[name] = this[name] === 'password' ? 'text' : 'password'
    },
    showChangePass() {
      this.changePassDialogVisible = true
    },
    changPwd() {
      this.$refs.changePassRef.validate((valid) => {
        if (valid) {
          const { oldPwd, cNewPwd } = this.formPwd
          this.$store.dispatch('user/resetPwd', { oldPassword: sha256(oldPwd), newPassword: sha256(cNewPwd) }).then((res) => {
            if (res.code !== 200) {
              Message({
                message: '操作失败，请重试',
                type: 'error'
              })
            } else {
              Message({
                message: '修改成功, 请重新登录',
                type: 'success'
              })
              this.logout()
              this.changePassDialogVisible = false
            }
          })
        }
      })
    },
    showPerson() {
      getInfo(getUserInfo().id).then((res) => {
        this.formAll = {
          ...res.data
        }
        this.accountModify = res.data.accountModify
        console.log(this.accountModify)
      })
      // this.$store.dispatch('user/getInfo').then((res) => {
      //   this.dialogVisible = true
      //   this.formAll.userName = res.userName
      //   this.formAll.status = res.status
      //   this.formAll.phone = res.phone
      //   this.formAll.name = res.name
      // })
      // this.formAll = {
      //   ...getUserInfo()
      // }
      this.dialogVisible = true
    },
    resetInfo() {
      this.$refs.changePersonRef.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/resetInfo', { ...this.formAll }).then((res) => {
            this.$message.success('修改成功')
            this.dialogVisible = false
            this.$store.dispatch('user/getInfo')
          })
        }
      })
    },
    resetForm(formName) {
      this.controlFunc()
      if (this.accountModify !== 0) {
        this.$refs[formName].resetFields()
      }
    },
    showLogout() {
      this.$confirm('请确认是否退出登陆?', '退出登陆', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // 退出
        this.logout()
      }).catch(() => {
        // 取消
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.change_pass_container {
  .iconfont {
    cursor: pointer;
    padding: 10px;
    font-size: 20px;
  }
}

.navbar {
  padding: 0 20px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  flex-direction: column;

  .navbar_header {
    height: 86px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbar_title {
    font-size: 22px;
    font-weight: bold;
    color: #26406e;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;

        .user-name {
          margin: 0 10px;
        }

        .user-avatar {
          width: 24px;
          height: 24px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
