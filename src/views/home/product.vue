<template>
  <div>
    <template>
      <el-table
        :data="productdata.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%;white-space:nowrap"
        max-height="800"
        highlight-current-row
        :header-cell-style="{background:'#E3E3E3',color:'#606266'}"
      >
        <el-table-column prop="编号" label="编号" width="215" align="center" sortable></el-table-column>
        <el-table-column prop="创建" label="创建" width="75" align="center"></el-table-column>
        <el-table-column prop="日期" label="日期" width="100" align="center" sortable></el-table-column>
        <el-table-column prop="LOT" label="LOT" width="90" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click.prevent="queryLot(scope.row.LOT)">{{ scope.row.LOT}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="设备" label="设备" width="90" align="center"></el-table-column>
        <el-table-column prop="异常" label="异常" width="150" align="center"></el-table-column>
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
              @click.native.prevent="deleteRow(scope.$index, productdata)"
              size="small"
              style="margin-left:5px"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="productdata.length"
        ></el-pagination>
      </div>
    </template>
    <el-drawer :visible.sync="table" direction="ttb" size="60%" title="LOT履历">
      <h3 style="margin:0">LOT:{{Lot}}</h3>
      <el-table :data="LotData" border style="width:100%;overflow:auto" max-height="620">
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
    <transition name="dialog">
      <el-dialog
        title="制品单处置"
        :visible.sync="dealproduct"
        v-if="dealproduct"
        width="85%"
        top="3%"
        destroy-on-close
        center
      >
        <deal :id="ticNumber"></deal>
      </el-dialog>
    </transition>
    <transition name="dialog">
    <el-dialog
      title="制品单修改"
      :visible.sync="changeproduct"
      v-if="changeproduct"
      width="85%"
      top="4%"
      destroy-on-close
      center
    >
      <change :id="ticNumber"></change>
    </el-dialog>
    </transition>
  </div>
</template>
<script>
import deal from './components/proalert/dealproduct'
import change from './components/proalert/changepro'
export default {
  data () {
    return {
      table: false,
      dealproduct: false,
      changeproduct: false,
      Lot: '',
      ticNumber: null,
      productdata: [
        {
          编号: '制品异常-面板厂-2019-19847',
          创建: '周亦睿',
          日期: '2019-09-20',
          LOT: '19914051',
          设备: 'MMO004',
          异常: '成膜区域超规格',
          现象:
            'S6.2..3.13成膜区域超规格,S6.2..3.13成膜区域超规格,S6.2..3.13成膜区域超规格',
          处置: 'CVD'
        },
        {
          编号: '制品异常-面板厂-2019-19846',
          创建: '熊琴',
          日期: '2019-09-20',
          LOT: '19914037',
          设备: 'REP005',
          异常: '线状异物',
          现象: 'S5 P6-99 线状异物 发生率4%',
          处置: 'TEST'
        },
        {
          编号: '制品异常-面板厂-2019-19846',
          创建: '熊琴',
          日期: '2019-09-20',
          LOT: '19914037',
          设备: 'REP005',
          异常: '线状异物',
          现象: 'S5 P6-99 线状异物 发生率4%',
          处置: 'TEST'
        }
      ],
      LotData: [],
      currentPage: 1, // 初始页
      pagesize: 9 //    每页的数据
    }
  },
  components: { deal, change },
  methods: {
    // dialog开关
    dealrouter (index, row) {
      this.ticNumber = row.编号
      this.dealproduct = true
    },
    changerouter (index, row) {
      this.ticNumber = row.编号
      this.changeproduct = true
    },

    // 制品数据
    async getNewsList () {
      const { data } = await this.$http.post(
        '/api/API/异常处置系统/异常单_面板厂.py'
      )
      // 把数据挂载到 data上
      const h = this.$createElement
      if (data.state === '') {
        this.productdata = data.制品单
        this.$message({
          title: '提示',
          message: '加载成功',
          type: 'success',
          duration: '1200'
        })
      } else {
        const h = this.$createElement
        this.$message({
          title: '错误！',
          message: h('i', { style: 'color: teal' }, data.state),
          type: 'error',
          duration: '4000'
        })
      }
    },
    // 页面筛选函数
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },

    async queryLot (lot) {
      this.table = true
      this.Lot = lot
      const { data } = await this.$http.post(
        '/API/异常处置系统/工程实绩_LOT履历.py',
        this.$qs.stringify({
          LOT_ID: lot,
          工厂: ''
        })
      )
      if (data.state === '') {
        this.LotData = data.data
      } else {
        alert(data.state)
      }
    },
    deleteRow (index, rows) {
      this.$confirm('此操作将删除该异常单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rows.splice(index, 1)
          this.$notify({
            title: '提示',
            message: '删除成功！',
            type: 'success',
            duration: '1400'
          })
        })
        .catch(() => {
          this.$notify({
            title: '提示',
            message: '已取消删除',
            type: 'warning',
            duration: '1400'
          })
        })
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    }
  },
  created () {
    this.getNewsList()
  },
  computed: {
    cellStyle: () => {

    }
  }
}
</script>
<style>
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 8vh;
}
</style>
