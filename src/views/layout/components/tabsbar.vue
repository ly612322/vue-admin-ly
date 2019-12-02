<template>
  <div class="layout-bread" v-show='this.$store.state.tabsbar'>
    <!-- <div class="btn-con left-btn">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="btn-con right-btn">
      <i class="el-icon-arrow-right"></i>
    </div>-->
    <div class="bar-content" ref="scrollOuter">
      <div class="bar-scroll" ref="scrollBody">
        <el-tabs v-model="activeMenu" type="card" closable @tab-remove="removeTab" class>
          <el-tab-pane
            v-for="(item,index) in editableTabs"
            :key="item.title"
            :label="item.title"
            :name="item.title"
            calss="el-tabs"
          >
            <span slot="label" @click="hendleTabg(item.title,index)" class="spanIcon">
              <!-- <i :class="activeClass == index ? 'el-icon-open':'el-icon-turn-off'"></i> {{item.name}} -->
              <i class="el-icon-location"></i>
              {{item.title}}
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="bar-tool">
      <el-dropdown @command="handleCommand">
        <el-button type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeClass: -1,
      tabIndex: 0,
      activeMenu: '制品单',
      editableTabs: []
    }
  },
  methods: {
    hendleTabg (title, index) {
      this.$router.push(`/${title}`)
      this.activeClass = index
    },
    removeTab (targetName) {
      let tabs = this.editableTabs
      let activeName = this.activeMenu
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.activeMenu = activeName
      this.$router.push(`/${activeName}`)
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    },
    handleCommand (command) {
      if (command === 'other') {
        this.editableTabs = this.editableTabs.filter(
          tab => tab.name == this.activeMenu
        )
      } else {
        this.editableTabs = []
        this.$router.push('/home')
      }
    }
  },
  watch: {
    // 路由监听：监听路由的变化，从而做出相应操作
    $route: {
      immediate: true, // 一旦监听到路由的变化立即执行
      handler (to, from) {
        // 给activeMenu重新赋值为当前组件的路由地址
        let flag = true
        this.editableTabs.forEach(ele => {
          if (ele.title === to.meta.title) {
            flag = false
            this.activeMenu = to.name
          }
        })
        if (flag) {
          this.editableTabs.push({
            title: to.meta.title,
            name: to.meta.title
          })
          this.activeMenu = to.name
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-tabs /deep/ .el-tabs__item {
  background: #fff;
  margin: 4px 5px 0 0;
  height: 30px;
  line-height: 30px;
}
.el-tabs--card {
  border: 0 !important;
}
.el-button {
  background: #409eff;
  color: rgb(247, 247, 247);
  border: 0;
  width: 105px;
  height: 32px;
  margin: 2px;
  font-size: 13px;
  padding: 2px;
}
</style>
