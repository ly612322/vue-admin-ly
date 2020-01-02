<template>
  <div>
    <el-menu
      background-color="#304156"
      text-color="white"
      mode="horizontal"
      active-text-color="#2498FF"
      style="height:56px"
      :show-timeout="200"
      router
      unique-opened
      :collapse-transition="false"
      :default-active="this.$route.path"
    >
      <template>
        <el-menu-item>
          <i class="el-icon-warning" style="margin-right:4px"></i>
          <span>
            <h3>异常处置系统</h3>
          </span>
        </el-menu-item>
      </template>
      <template v-for="item in menulist">
        <el-menu-item v-if="item.children.length == 0 " :key="item.id" :index="'/' + item.path">
          <i :class="iconlist[item.id]"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu v-else :key="item.id + '' " :index="'/' + item.path" class="el-title">
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
      <user class="user"></user>
    </el-menu>
  </div>
</template>

<script>
import user from "./user"
export default {
  components: { user },
  data() {
    return {
      menulist: [
        {
          id: 101,
          title: "首页",
          path: "home",
          children: [
            {
              id: 110,
              title: "预开票",
              path: "预开票",
              children: []
            },
            {
              id: 111,
              title: "制品单",
              path: "制品单",
              children: []
            },
            {
              id: 112,
              title: "设备单",
              path: "设备单",
              children: []
            }
          ]
        },
        {
          id: 102,
          title: "新建",
          path: "新建",
          children: [
            {
              id: 103,
              title: "新建制品单",
              path: "新建制品单",
              children: []
            },
            {
              id: 104,
              title: "新建设备单",
              path: "新建设备单",
              children: []
            },
            {
              id: 105,
              title: "新建关联单",
              path: "新建关联单",
              children: []
            }
          ]
        },
        {
          id: 106,
          title: "制品指示确认",
          path: "制品指示确认",
          children: []
        },
        {
          id: 107,
          title: "异常单查询",
          path: "异常单查询",
          children: []
        },
        {
          id: 108,
          title: "高级查询",
          path: "highquery",
          children: [
            {
              id: 109,
              title: "制品异常分析",
              path: "制品异常分析",
              children: []
            },
            {
              id: 122,
              title: "设备异常分析",
              path: "设备异常分析",
              children: []
            },
            {
              id: 123,
              title: "票据关联",
              path: "票据关联",
              children: []
            },
            {
              id: 124,
              title: "品名查LOT",
              path: "品名查LOT",
              children: []
            },
            {
              id: 125,
              title: "LOT查异常",
              path: "LOT查异常",
              children: []
            },
            {
              id: 126,
              title: "开票数统计",
              path: "开票数统计",
              children: []
            },
            {
              id: 127,
              title: "故障时间统计",
              path: "故障时间统计",
              children: []
            },
            {
              id: 128,
              title: "异常名称查票据",
              path: "异常名称查票据",
              children: []
            }
          ]
        }
      ],
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
    // async getMenuList () {
    //   const { data: res } = await this.$http.get('/menulist')
    //   if (res.mate.status !== 200) {
    //     this.$message.error('获取失败')
    //   } else {
    //     this.menulist = res.data
    //   }
    // },
    collapse() {
      this.$store.commit("toCollapse")
    }
  },
  created() {}
}
</script>

<style lang='less' scoped>
h3 {
  display: inline-block;
  color: #fff;
  text-align: center;
  font-size: 20px;
  margin: 0px;
  padding: 0;
}
.user {
  margin-top: 6px;
  color: #fff;
}
.el-tabs__item {
  width: 40%;
}
.el-menu-item {
  height: 56px !important;
  line-height: 56px !important;
}
.el-submenu__title {
  height: 40px !important;
}
.el-title /deep/ .el-submenu__title {
  height: 56px !important;
  line-height: 56px !important;
}
</style>
