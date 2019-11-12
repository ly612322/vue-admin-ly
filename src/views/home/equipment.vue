<template>
  <div>
    <template>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        max-height="800"
        highlight-current-row
      >
        <el-table-column prop="编号" label="编号" width="250" align="center" sortable></el-table-column>
        <el-table-column prop="创建" label="创建" width="120" align="center"></el-table-column>
        <el-table-column prop="日期" label="日期" width="120" align="center" sortable></el-table-column>
        <el-table-column prop="设备" label="设备" width="120" align="center"></el-table-column>
        <el-table-column prop="Main" label="Main" width="120" align="center"></el-table-column>
        <el-table-column prop="Sub" label="Sub" width="180" align="center"></el-table-column>
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
            <router-link :to="{name:'equipmentprocess',params:{id:scope.row.编号}}">
              <el-button type="primary" size="small">处置</el-button>
            </router-link>
            <router-link :to="{name:'equipmentchange',params:{id:scope.row.编号}}">
              <el-button type="warning" size="small">修改</el-button>
            </router-link>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import qs from 'qs';
import axios from "axios";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    //页面筛选函数
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    async getNewsList() {
      //
      const { data } = await axios.post("/API/异常处置系统/异常单_面板厂.py");
      //把数据挂载到 data上
      if (data.state === "") return (this.tableData = data.制品单);
    }
  },
  created() {
    // this.getNewsList();
  }
};
</script>