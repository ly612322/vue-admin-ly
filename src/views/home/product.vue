<template>
  <div>
    <template>
      <el-table
        v-loading="loading"
        :data="productdata"
        border
        style="width: 100%"
        max-height="800"
        highlight-current-row
      >
        <el-table-column prop="编号" label="编号" width="250" align="center" sortable></el-table-column>
        <el-table-column prop="创建" label="创建" width="120" align="center"></el-table-column>
        <el-table-column prop="日期" label="日期" width="120" align="center" sortable></el-table-column>
        <el-table-column prop="LOT" label="LOT" width="120" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click.prevent="queryLot(scope.row.LOT)">{{ scope.row.LOT}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="设备" label="设备" width="120" align="center"></el-table-column>
        <el-table-column prop="异常" label="异常" width="180" align="center"></el-table-column>
        <el-table-column prop="现象" label="现象" align="center"></el-table-column>
        <el-table-column
          prop="处置"
          label="处置"
          width="120"
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
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button @click="dealrouter(scope.$index, scope.row)" type="primary" size="small">处置</el-button>
            <el-button
              @click="changerouter(scope.$index, scope.row)"
              type="warning"
              size="small"
              style="margin-left:0"
            >修改</el-button>
            <el-button
              type="danger"
              @click.native.prevent="deleteRow(scope.$index, productdata)"
              size="small"
              style="margin-left:0"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-drawer :visible.sync="table" direction="rtl" size="60%" title="LOT履历">
      <h3 style="margin:0">LOT:{{Lot}}</h3>
      <el-table
        :data="LotData"
        v-loading="loading"
        border
        style="width:100%;overflow:auto"
        max-height="620"
      >
        <el-table-column property="品名" label="品名"></el-table-column>
        <el-table-column property="LOT_NO" label="LOT_NO"></el-table-column>
        <el-table-column property="工单号" label="工单号"></el-table-column>
        <el-table-column property="RECIPE" label="RECIPE"></el-table-column>
        <el-table-column property="制品类型" label="制品类型"></el-table-column>
        <el-table-column property="工程CODE" label="工程CODE"></el-table-column>
        <el-table-column property="大工程详细" label="大工程详细"></el-table-column>
        <el-table-column property="小工程详细" label="小工程详细"></el-table-column>
        <el-table-column property="设备群" label="设备群"></el-table-column>
        <el-table-column property="设备" label="设备"></el-table-column>
        <el-table-column property="SHEET开始数量" label="SHEET开始数量"></el-table-column>
        <el-table-column property="SHEET结束数量" label="SHEET结束数量"></el-table-column>
        <el-table-column property="履历Status" label="履历Status"></el-table-column>
        <el-table-column property="开始时刻" label="开始时刻"></el-table-column>
        <el-table-column property="终了时刻" label="终了时刻"></el-table-column>
        <el-table-column property="开始操作" label="开始操作"></el-table-column>
        <el-table-column property="结束操作" label="结束操作"></el-table-column>
        <el-table-column property="作业Memo" label="作业Memo"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      table: false,
      Lot: "",
      LotData: []
    };
  },
  props: ["productdata"],
  methods: {
    dealrouter(index, row) {
      this.$router.push({
        name: "productProcess",
        params: {
          id: row.编号 //row.hid为变量
        }
      });
    },
    changerouter(index, row) {
      this.$router.push({
        name: "productchange",
        params: {
          id: row.编号 //row.hid为变量
        }
      });
    },
    //页面筛选函数
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    async queryLot(lot) {
      this.Lot = lot;
      const { data } = await axios.post(
        "/API/异常处置系统/工程实绩_LOT履历.py",
        qs.stringify({
          LOT_ID: lot,
          工厂: ""
        })
      );
      if (data.state === "") {
        this.LotData = data.data;
      } else {
        alert(data.state);
      }
      this.table = true;
    },
    deleteRow(index, rows) {
      this.$confirm("此操作将删除该异常单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          this.$notify({
            title: "提示",
            message: "删除成功！",
            type: "success",
            duration: "1400"
          });
        })
        .catch(() => {
          this.$notify({
            title: "提示",
            message: "已取消删除",
            type: "warning",
            duration: "1400"
          });
        });
    }
  },
  created() {
    // this.getNewsList();
  }
};
</script>
<style  scoped>
</style>