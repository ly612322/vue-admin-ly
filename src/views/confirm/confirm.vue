<template>
  <div>
    <template>
      <el-table
        :data="confirmdata"
        border
        style="width: 100%"
        max-height="650"
        highlight-current-row
      >
        <el-table-column prop="编号" label="编号" width="250" align="center" sortable></el-table-column>
        <el-table-column prop="指示" label="指示" width="400" align="center"></el-table-column>
        <el-table-column prop="指示人员" label="指示人员" width="120" align="center" sortable></el-table-column>
        <el-table-column
          prop="确认组"
          label="确认组"
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
        <el-table-column prop="结果" label="结果" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.结果.replace('None','') }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
              <el-button @click="handleClick(scope.$index, scope.row)" type="primary" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <transition name="dialog">
        <el-dialog
      title="制品指示确认"
      :visible.sync="proconfirm"
      v-if="proconfirm"
      width="70%"
      top="2%"
      destroy-on-close
      center
    >
      <con :id="ticNumber"></con>
    </el-dialog>
    </transition>
  </div>
</template>
<script>
import con from './alertconfirm'
export default {
  name: 'confirm',
  data () {
    return {
      ticNumber: null,
      proconfirm: false,
      confirmdata: [
        {
          编号: '制品异常-面板厂-2019-19847',
          指示: '成膜区域超规格',
          指示人员: '周亦睿',
          确认组: 'PVD',
          结果: 'S6.2..3.13成膜区域超规格'
        },
        {
          编号: '制品异常-面板厂-2019-19847',
          指示: '成膜区域超规格',
          指示人员: '周亦睿',
          确认组: 'CVD',
          结果: 'S6.2..3.13成膜区域超规格'
        }
      ]
    }
  },
  components: {
    con
  },
  methods: {
    handleClick (index, row) {
      this.proconfirm = true
      this.ticNumber = row.编号
    },
    // 页面筛选函数
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    async getList () {
      const { data } = await this.$http.post(
        '/api/API/异常处置系统/查询_制品指示确认.py'
      )
      // 把数据挂载到 data上
      if (data.state === '') {
        this.confirmdata = data.data
        this.$message({
          message: '加载成功~',
          type: 'success',
          duration: '1200'
        })
      } else {
        this.$notify({
          title: '错误！',
          message: data.state,
          type: 'error'
        })
      }
    }
  },
  created () {
    this.getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
