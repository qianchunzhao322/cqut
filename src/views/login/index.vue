<template>
  <div class="login-container">
    <div class="page-left" style="background-color: rgb(231, 239, 254);">
      <img
        src="@/assets/login/login.png"
        style="object-fit: contain; width: 80%;"
        alt=""
      >
    </div>
    <div class="page-right">
      <div class="right-top">
        <div class="logo">
          <img
            src="@/assets/sidebar/logo.png"
            alt=""
          >
        </div>
        <div class="nav">你好，欢迎来到</div>
        <div class="title">重庆理工大学选课数据服务平台</div>
      </div>
      <div class="right-bottom">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
          <el-form-item
            label-width="0"
            prop="username"
          >
            <el-input
              v-model.trim="formData.username"
              name="username"
              autocomplete="off"
              placeholder="用户名"
              :style="{ width: '100%' }"
            />
          </el-form-item>
          <el-form-item
            style="margin-bottom: 16px;"
            label-width="0"
            prop="password"
          >
            <el-input
              v-model.trim="formData.password"
              :type="showPwd ? '' : 'password'"
              autocomplete="off"
              placeholder="密码"
              :style="{ width: '100%' }"
              @keyup.enter.native="handleLogin"
            >
              <template #suffix>
                <svg-icon
                  :icon-class="showPwd?'eye-open':'eye'"
                  @click="showPwd = !showPwd"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-checkbox v-model="formData.remember">记住密码</el-checkbox>
          <el-form-item
            style="margin-top: 36px;height: 50px;"
            label-width="0"
          >
            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%;"
              size="medium"
              @click.native.prevent="handleLogin"
            > 登录 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
const sha256 = require('js-sha256').sha256
export default {
  name: 'Login',
  data() {
    return {
      formData: {
        username: '',
        password: '',
        remember: false
      },
      rules: {
        username: [{ required: true, trigger: ['blur'], message: '请输入用户名' }],
        password: [{ required: true, trigger: ['blur'], message: '请输入密码' }]
      },
      loading: false,
      showPwd: false,
      passwordType: 'password',
      redirect: '/dataAnalysis'
    }
  },
  created() {
    const loginForm = localStorage.getItem('loginForm')
    if (loginForm) {
      const Form = JSON.parse(loginForm)
      this.formData = {
        ...Form
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.elForm.validate(valid => {
        if (valid) {
          this.loading = true
          let userInfo = JSON.parse(JSON.stringify(this.formData))
          userInfo = {
            ...userInfo,
            userId: userInfo.username.trim(),
            password: sha256(userInfo.password)
          }
          this.$store.dispatch('user/login', userInfo).then((res) => {
            console.log('ok')
            if (this.formData.remember) {
              localStorage.setItem('loginForm', JSON.stringify(this.formData))
            } else {
              localStorage.clear('loginForm')
            }
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((res) => {
            this.formData.password = null
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;

  .page-left {
    height: 100%;
    width: 62.5%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .page-right {
    height: 100%;
    width: 37.5%;
    padding: 0 5%;
    display: flex;
    flex-direction: column;

    .right-top {
      width: 100%;
      height: 35%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .logo {
        width: 120px;
        height: 120px;
      }

      .nav {
        margin-top: 20px;
        font-size: 24px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #26406e;
        line-height: 33px;
      }

      .title {
        margin-top: 16px;
        font-size: 24px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #26406e;
        line-height: 33px;
      }
    }

    .right-bottom {
      width: 100%;
      height: 65%;
      padding-top: 66px;
    }
  }
}
</style>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #34363d;
$cursor: #3f3a3a;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      font-size: 16px;
      caret-color: $cursor;
      border-bottom: 1px solid #dee4f8;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    background: #fff;
    border-radius: 5px;
    color: #454545;

    .el-form-item__content {
      height: 100%;

      .el-button {
        height: 100%;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  ::v-deep .el-input__suffix {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
