<template>
  <div>
    <el-scrollbar>
    <el-menu
      class="el-menu-vertica"
      background-color="#304156"
      text-color="white"
      :show-timeout="200"
      router
      unique-opened
      :collapse="this.$store.state.collapse"
      :collapse-transition="true"
      :default-active="this.$route.path"
    >
      <template>
        <el-menu-item>
          <i class="el-icon-warning" style="margin-right:4px"></i>
          <span v-show="!this.$store.state.collapse"><h3>异常处置系统</h3></span>
        </el-menu-item>
      </template>
      <template v-for="item in menulist">
        <el-menu-item
          v-if="item.children.length == 0 "
          :key="item.id"
          :index="'/' + item.path"
        >
          <i :class="iconlist[item.id]"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu v-else :key="item.id + '' " :index="'/' + item.path">
          <template slot="title">
            <i :class="iconlist[item.id]"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item
            :index="'/' + subitem.path"
            v-for="subitem in item.children"
            :key="subitem.id"
          >
            <i class="el-icon-edit-outline"></i>
            <span slot="title">{{subitem.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconlist: {
        "101": "el-icon-s-home",
        "102": "el-icon-edit-outline",
        "106": "el-icon-document-checked",
        "107": "el-icon-search",
        "108": "el-icon-data-line"
      }
    }
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get("/menulist")
      if (res.mate.status !== 200) {
        this.$message.error("获取失败")
      } else {
        this.menulist = res.data
      }
    },
    collapse() {
      this.$store.commit("toCollapse")
    }
  },
  created() {
    this.getMenuList()
  }
}
</script>

<style lang='less'>
.el-menu-vertica:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}
.el-menu-vertica {
  width: 60px;
  height: 100vh;
}

h3 {
  display: inline-block;
  color: #fff;
  text-align: center;
  font-size: 20px;
  margin: 0px 0px 0px  0px;
  padding: 0;
}
</style>
