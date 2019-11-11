<template>
  <div style="height: 100vh;width: 100%;">
    <el-card class="login-form-layout">
      <el-form
        autocomplete="on"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <i
            class="el-icon-user-solid"
            style="width: 56px;height: 56px;color: #409EFF;font-size:60px"
          ></i>
        </div>
        <h2 class="login-title color-main" style="color:#409EFF">LY</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
            autocomplete="on"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            show-password
            prefix-icon="el-icon-key"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 45%" type="primary" @click.native.prevent="handleLogin">登录</el-button>
          <el-button style="width: 45%" type="primary" @click.native.prevent="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="loginCenter" class="login-center-layout" />
  </div>
</template>
<script>
import loginCenter from '../../assets/images/login_center_bg.png'
export default {
  data () {
    return {
      loginCenter,
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入登陆名', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
      //   note: {
      //     backgroundImage:
      //       'url(' + require('../../assets/images/login.jpg') + ')',
      //     backgroundRepeat: 'no-repeat',
      //     backgroundSize: '100% 100%'
      //   },
      //   form: {
      //     name: '12345',
      //     passward: '12345'
      //   }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(async valid => {
        // 表单预检验 校验成功valid为true
        if (!valid) return
        const { data: res } = await this.$http.post(
          '/login',
          this.$qs.stringify(this.loginForm)
        )
        if (res.meta.status !== 200) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>
<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
