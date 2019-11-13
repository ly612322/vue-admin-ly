<template>
  <div>
    <template>
      <el-table
        v-loading="loading"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        max-height="800"
        highlight-current-row
        :header-cell-style="{background:'#E3E3E3',color:'#606266'}"
      >
        <el-table-column prop="编号" label="编号" width="215" align="center" sortable></el-table-column>
        <el-table-column prop="创建" label="创建" width="75" align="center"></el-table-column>
        <el-table-column prop="日期" label="日期" width="100" align="center" sortable></el-table-column>
        <el-table-column prop="设备" label="设备" width="90" align="center"></el-table-column>
        <el-table-column prop="号机" label="号机" width="60" align="center"></el-table-column>
        <el-table-column prop="Main" label="Main" width="100" align="center"></el-table-column>
        <el-table-column prop="Sub" label="Sub" width="140" align="center"></el-table-column>
        <el-table-column prop="现象" label="现象" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          prop="处置"
          label="处置"
          width="100"
          align="center"
          sortable
          :filters="[{ text: 'PVD', value: 'PVD' }, { text: 'CVD', value: 'CVD' },{text:'TEST',value:'TEST'}
          ,{text:'AT',value:'AT'}
          ,{text:'C-TEST',value:'C-TEST'}
          ,{text:'DET',value:'DET'}
          ,{text:'PHOTO',value:'PHOTO'}
          ,{text:'WET',value:'WET'}
          ,{text:'前工程',value:'前工程'}
          ,{text:'中工程',value:'中工程'}
          ,{text:'材料管理科',value:'材料管理科'}]"
          :filter-method="filterHandler"
        ></el-table-column>
        <!-- <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <router-link :to="{name:'equipmentprocess',params:{id:scope.row.编号}}">
              <el-button type="primary" size="small">处置</el-button>
            </router-link>
            <router-link :to="{name:'equipmentchange',params:{id:scope.row.编号}}">
              <el-button type="warning" size="small">修改</el-button>
            </router-link>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button @click="dealrouter(scope.$index, scope.row)" type="primary" size="small">处置</el-button>
            <el-button
              @click="changerouter(scope.$index, scope.row)"
              type="warning"
              size="small"
              style="margin-left:5px"
            >修改</el-button>
            <el-button
              type="danger"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              size="small"
              style="margin-left:5px"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
    <el-dialog
      title="设备单处置"
      :visible.sync="dealequipment"
      width="72%"
      top="4%"
      destroy-on-close
      center
      fullscreen
    >
      <deal></deal>
    </el-dialog>
    <el-dialog
      title="设备单修改"
      :visible.sync="changeequipment"
      width="72%"
      top="4%"
      center
      destroy-on-close
      fullscreen
    >
      <change></change>
    </el-dialog>
  </div>
</template>
<script>
import deal from "./components/equalert/dealequipment"
import change from "./components/equalert/changeequip"
export default {
  data() {
    return {
      dealequipment: false,
      changeequipment: false,
      tableData: [
        {
          编号: "设备异常-面板厂-2019-19847",
          创建: "周亦睿",
          日期: "2019-09-20",
          设备: "MMO004",
          号机: "1",
          Main: "19914051",
          Sub: "HSD1",
          异常: "成膜区域超规格",
          处置: "CVD",
          现象: "S6.2..3.13成膜区域超规格"
        },
        {
          编号: "设备异常-面板厂-2019-19847",
          创建: "周亦睿",
          日期: "2019-09-20",
          设备: "MMO004",
          号机: "2",
          Main: "19914051",
          Sub: "扫描Sensor",
          处置: "PVD",
          异常: "成膜区域超规格",
          现象: "S6.2..3.13成膜区域超规格3.13成膜区域超规格,3.13成膜区域超规格"
        }
      ],
      currentPage: 1, //初始页
      pagesize: 10 //    每页的数据
    }
  },
  components: {
    deal,
    change
  },
  methods: {
    dealrouter(index, row) {
      this.dealequipment = true
    },
    changerouter(index, row) {
      this.changeequipment = true
    },
     async getNewsList() {
      const { data } = await this.$http.post("/API/异常处置系统/异常单_面板厂.py");
      //把数据挂载到 data上
      const h = this.$createElement;
      if (data.state === "") {
        this.tableData = data.设备单;
        this.$notify({
          title: "提示",
          message: h("i", { style: "color:teal" }, "加载成功"),
          type: "success",
          duration: "1200"
        });
      } else {
        const h = this.$createElement;
        this.$notify({
          title: "错误！",
          message: h("i", { style: "color: teal" }, data.state),
          type: "error",
          duration: "4000"
        });
      }
    },
    //页面筛选函数
    filterHandler(value, row, column) {
      const property = column["property"]
      return row[property] === value
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    deleteRow(index, rows) {
      this.$confirm("此操作将删除该异常单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1)
          this.$notify({
            title: "提示",
            message: "删除成功！",
            type: "success",
            duration: "1400"
          })
        })
        .catch(() => {
          this.$notify({
            title: "提示",
            message: "已取消删除",
            type: "warning",
            duration: "1400"
          })
        })
    }
  },
  created() {
    this.getNewsList();
  }
}
</script>

<style scoped>
.el-button {
  margin-left: 5px;
}
</style>