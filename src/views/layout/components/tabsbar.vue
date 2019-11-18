<template>
  <div class="tab-container">
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item,index) in editableTabs"
        :key="index"
        :label="item.title"
        :name = "item.title"
        calss="el-tabs"
      >
        <span slot="label" @click="hendleTabg(index)" class="spanIcon">
          <!-- <i :class="activeClass == index ? 'el-icon-open':'el-icon-turn-off'"></i> {{item.name}} -->
          <i class="el-icon-location"></i>
          {{item.title}}
        </span>
      </el-tab-pane>
      <template>
        <el-dropdown placement="bottom">
          <el-button type="primary">
            <i class="el-icon-circle-close"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>关闭其他</el-dropdown-item>
            <el-dropdown-item>关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeClass: -1,
      editableTabsValue: this.$store.state.activename,
      tabIndex: 0,
      editableTabs:this.$store.state.tagslist
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
.tab-container {
  background: #ebebeb;
  margin-bottom: 2px;
  .el-tabs {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
    padding: 5px;
  }
}
.el-tabs /deep/ .el-tabs__item {
  border-bottom: 1px solid #e4e7ed !important;
  background: #fff;
  margin: 0 5px 0 0;
}
.el-button {
  background: #fff;
  color: #000;
  height: 50px;
  border: 0;
  font-size: 18px;
}
.spanIcon {
  font-size: 16px;
}
</style>
<style>
.el-tabs__header {
  margin: 5px !important;
}
.el-icon-close {
  line-height: 12px !important;
}
</style>
