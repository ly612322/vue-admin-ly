<template>
  <div>
    <el-menu
      class="el-menu-vertica"
      background-color="#304156"
      text-color="white"
      router
      unique-opened
      :collapse="this.$store.state.collapse"
      :collapse-transition="true"
      :default-active="this.$route.path"
    >
      <template v-for="item in menulist">
        <el-menu-item v-if="item.children.length == 0 " :key="item.id" :index="'/' + item.path">
          <i :class="iconlist[item.id]"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu v-else :key="item.id + '' " :index="'/' + item.path">
          <template slot="title">
            <i :class="iconlist[item.id]"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item :index="'/' + subitem.path" v-for="subitem in item.children" :key="subitem.id">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">{{subitem.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<style>
.el-menu-vertica:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}
.el-menu-vertica {
  width: 200px;
  height: 100vh;
}
</style>

<script>
export default {
  data () {
    return {
      menulist: [],
      iconlist: {
        '101': 'el-icon-s-home',
        '102': 'el-icon-edit-outline',
        '106': 'el-icon-document-checked',
        '107': 'el-icon-search',
        '108': 'el-icon-data-line'
      }
    }
  },
  methods: {
    async getMenuList () {
      const { data: res } = await this.$http.get('/menulist')
      if (res.mate.status !== 200) {
        this.$message.error('获取失败')
      } else {
        this.menulist = res.data
      }
    }
  },
  created () {
    this.getMenuList()
  }
}
</script>
