<template>
  <div>
    <table class="table table-bordered" style="margin-bottom:10px;">
      <tr>
        <td>工号</td>
        <td id="12"></td>
        <td>编号</td>
        <td id="13"></td>
      </tr>
      <tr>
        <td>故障时间</td>
        <td id="14"></td>
        <td>状态</td>
        <td id="15"></td>
      </tr>
      <tr>
        <td>处置组</td>
        <td id="16"></td>
        <td>设备群</td>
        <td id="17"></td>
      </tr>
      <tr>
        <td>号机</td>
        <td id="18"></td>
        <td>大单元</td>
        <td id="19"></td>
      </tr>
      <tr>
        <td>小单元</td>
        <td id="20"></td>
        <td>品名</td>
        <td id="21"></td>
      </tr>
      <tr>
        <td>故障类型</td>
        <td colspan="3" id="22"></td>
      </tr>
      <tr>
        <td>故障现象</td>
        <td colspan="3" id="23"></td>
      </tr>
      <tr>
        <td>原因</td>
        <td colspan="3" id="24"></td>
      </tr>
      <tr>
        <td>处置方法</td>
        <td colspan="3" id="25"></td>
      </tr>
      <tr>
        <td>处置结果</td>
        <td colspan="3" id="26"></td>
      </tr>
      <tr>
        <td>更换备件</td>
        <td colspan="3" id="27"></td>
      </tr>
      <tr>
        <td>处置完成时间</td>
        <td id="28"></td>
        <td>量产时间</td>
        <td id="29"></td>
      </tr>
      <tr>
        <td>水平展开</td>
        <td id="30"></td>
        <td>最后处置人员</td>
        <td id="31"></td>
      </tr>
    </table>
        <el-card class="box-card el-card__head el-card-body" shadow="never">
      <div slot="header" class="clearfix">
        <span>设备处置记录</span>
      </div>
      <el-table :data="equipmentItem" border max-height="300" align="center">
        <el-table-column align="center" prop="编号" width="240" label="编号"></el-table-column>
        <el-table-column align="center" prop="确认项" width="150" label="项目"></el-table-column>
        <el-table-column
          align="center"
          prop="上限"
          width="120"
          label="上限"
          :formatter="this.common.removeNone"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="下限"
          width="120"
          label="下限"
          :formatter="this.common.removeNone"
        ></el-table-column>
        <el-table-column align="center" prop="模式" width="120" label="模式"></el-table-column>
        <el-table-column align="center" prop="确认" width="120" label="确认">
          <template slot-scope="scope">
            <el-checkbox

              v-model="scope.row.确认"
              :checked="scope.row.确认 == '是'?true:false"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="状态" width="120" label="状态">
          <template slot-scope="scope">
            <el-select v-model="scope.row.状态">
              <el-option label="进行" value="进行"></el-option>
              <el-option label="完结" value="完结"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="结果" label="结果">
          <template slot-scope="scope">
            <el-input v-model="scope.row.结果"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="备注" label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.备注"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
     <el-row>
      <el-col :span="7">
        <el-input v-model="manremarkd" placeholder="暂无" disabled>
          <template slot="prepend">经理已备注内容</template>
        </el-input>
      </el-col>
      <el-col :span="9" :offset="1">
        <el-input v-model="manremark" placeholder="请填写备注">
          <template slot="prepend">经理备注</template>
        </el-input>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="success">通过</el-button>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="danger">驳回</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-input v-model="manremarkd" placeholder="暂无" disabled>
          <template slot="prepend">PQC已备注内容</template>
        </el-input>
      </el-col>
      <el-col :span="9" :offset="1">
        <el-input v-model="manremark" placeholder="请填写备注">
          <template slot="prepend">PQC备注</template>PQC
        </el-input>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="success">通过</el-button>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="danger">驳回</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  background-color: transparent;
  border-spacing: 0;
  border-collapse: collapse;
}
.table-bordered {
  border: 1px solid #ddd;
}
td {
  border: 1px solid #ddd;
  color: rgb(117, 117, 117);
  font-size: 14px;
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
}
.el-button {
  width: 100px;
}
.el-row {
  margin-bottom: 5px;
}
.el-card__head >>> .el-card__header {
  padding: 5px 20px !important;
  text-align: left;
  color: rgb(90, 90, 90);
  font-weight: 550;
  background-color: #dbd9da;
}

.box-card {
  height: 230px;
  margin: 4px;
  padding: 0;
}
.el-card-body >>> .el-card__body {
  padding: 0 !important;
}
.box-card-right {
  margin: 5px;
  height: 465px;
}
.box-card-ld {
  height: 365px;
}
.box-card-rd >>> .el-card__body {
  padding: 0;
  height: 370px !important;
}
</style>
