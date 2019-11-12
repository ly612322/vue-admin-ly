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
          <el-link class="changepassword" @click="dialogVisible = true">修改密码?</el-link>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="loginCenter" class="login-center-layout" />
    <el-dialog title="密码修改" :visible.sync="dialogVisible" width="30%" class="password" center >
      <el-form :model="changeform" label-width="90px" >
        <el-form-item label="用户名" >
          <el-input v-model="changeform.name"></el-input>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input v-model="changeform.beforePassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="changeform.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="changeform.againnewPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import loginCenter from "../../assets/images/login_center_bg.png"
export default {
  data() {
    return {
      loginCenter,
      dialogVisible: false,
      loginForm: {
        username: "admin",
        password: "123456"
      },
      changeform:{ //密码修改表单
        name:'',
        beforePassword:'',
        newPassword:'',
        againnewPassword:''
      },
      rules: { //登陆表单验证
        username: [
          { required: true, message: "请输入登陆名", trigger: "blur" },
          { min: 3, max: 7, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        // 表单预检验 校验成功valid为true
        if (!valid) return
        const { data: res } = await this.$http.post(
          "/login",
          this.$qs.stringify(this.loginForm)
        )
        if (res.meta.status !== 200) return this.$message.error("登陆失败")
        this.$message.success("登陆成功")
        window.sessionStorage.setItem("token", res.data.token) // 存储返回的token
        this.$router.push("/home") //跳转主页
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields() // 重置登陆表单信息
    }
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       done()
    //     })
    //     .catch(_ => {})
    // }
  }
}
</script>
<style lang='less' scoped>
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
.changepassword {
  text-align: center;
  position: absolute;
  left: 50%;
  color: #409eff;
  line-height: 30px;
  margin-top: 20%;
  transform: translate(-50%);
}
.el-dialog{
  .el-input{
    width: 85%;
  }
}
</style>
