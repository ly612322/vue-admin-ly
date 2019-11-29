<template>
  <div>
    <el-row type="flex">
      <el-form
        ref="queryForm"
        label-width="90px"
        class="demo-ruleForm"
        size="small"
        label-position="top"
      >
        <el-col :span="20">
          <el-form-item label="LOT" prop="LOT" width="200px">
            <el-input type="textarea" v-model="LOT" :rows="10" style="min-height:200px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :span="20">
        <el-tabs type="border-card">
          <el-table :data="tabledata" height="550" border style="width: 100%">
            <el-table-column prop="异常单" label="异常单"></el-table-column>
            <el-table-column prop="LOT" label="LOT"></el-table-column>
            <el-table-column prop="创建人员" label="创建人员"></el-table-column>
            <el-table-column prop="处置组" label="处置组"></el-table-column>
            <el-table-column prop="最后处置人" label="最后处置人"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain @click="productEdit(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog
      title="制品处置详情"
      :visible.sync="querypro"
      v-if="querypro"
      width="85%"
      top="3%"
      destroy-on-close
      center
    >
      <querypro :id="ticNumber" :group="group" @proclose="proclose"></querypro>
    </el-dialog>
  </div>
</template>
<script>
import querypro from "../query/components/alertpro"
export default {
  data() {
    return {
      querypro:false,
      LOT: "",
      tabledata: [],
      ticNumber: "",
      group: ""
    }
  },
  components:{querypro},
  methods: {
    async onSubmit() {
      const { data } = await this.$http.post(
        "/API/异常处置系统/LOT查异常_高级查询_面板厂.py",
        this.$qs.stringify({
          LOT: this.LOT.split("\n").join()
        })
      )
      this.tabledata = data.data
    },
    productEdit(num) {
      this.ticNumber = num.异常单
      this.group = num.处置
      this.querypro = true
    },
    proclose() {
      this.querypro = false
    }
  }
}
</script>
<style lang="less" scoped>
.el-tabs {
  height: 80vh;
}
</style>
