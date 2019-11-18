<template>
  <div class="layout-bread">
    <div class="btn-con left-btn">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="btn-con right-btn">
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="bar-content" ref="scrollOuter">
      <div class="bar-scroll" ref="scrollBody" :style="{left: tagBodyLeft + 'px'}">
          <el-tabs>
            <el-tab-pane calss="el-tabs">测试</el-tab-pane>
          </el-tabs>
      </div>
    </div>
    <!-- <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item,index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.title"
        calss="el-tabs"
      >
    <span slot="label" @click="hendleTabg(index)" class="spanIcon">-->
    <!-- <i :class="activeClass == index ? 'el-icon-open':'el-icon-turn-off'"></i> {{item.name}} -->
    <!-- <i class="el-icon-location"></i>
          {{item.title}}
        </span>
      </el-tab-pane>
    </el-tabs>-->
    <div class="bar-tool">
      <el-dropdown>
        <el-button type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>关闭其他</el-dropdown-item>
          <el-dropdown-item>关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeClass: -1,
      editableTabsValue: this.$store.state.activename,
      tabIndex: 0,
      editableTabs: this.$store.state.tagslist,
      items: [
        {
          title: "异常信息"
        }
      ]
    }
  },
  methods: {
    // addTab(targetName) {
    //   let newTabName = ++this.tabIndex + ""
    //   this.editableTabs.push({
    //     title: "New Tab",
    //     name: newTabName,
    //     content: "New Tab content"
    //   })
    //   this.editableTabsValue = newTabName
    // },
    hendleTabg(index) {
      this.activeClass = index
    },
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
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
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag {
  text-align: center;
  color: #676f80;
  width: 120px;
  margin: 4px 2px;
  border-radius: 0;
}
.el-button {
  background: #409eff;
  color: rgb(247, 247, 247);
  border: 0;
  width: 90px;
  height: 25px;
  margin: 6px;
  font-size: 13px;
  padding: 2px;
}
.el-tabs {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  padding: 5px;
}
.el-tabs /deep/ .el-tabs__item {
  border-bottom: 1px solid #e4e7ed !important;
  background: #fff;
  margin: 0 5px 0 0;
}
</style>
<style>
</style>
