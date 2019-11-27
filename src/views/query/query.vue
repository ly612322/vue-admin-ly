<template>
  <div id="query">
    <el-row>
      <el-col :span="3">
        <el-form label-position="left" class="el-label">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="queryform.开始日期"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="queryform.结束日期"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="异常类型" prop="type">
            <el-radio-group v-model="type">
              <el-radio label="制品异常单" value="制品异常单" @change="tableShow=true"></el-radio>
              <el-radio
                label="设备异常单"
                value="“设备异常单"
                @change="tableShow=false"
                style="margin-top:10px"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="异常程度" class="selectitem">
            <el-select v-model="queryform.异常程度" placeholder="异常程度">
              <el-option label="轻微" value="轻微"></el-option>
              <el-option label="重大" value="重大"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开票组" class="selectitem">
            <el-select v-model="queryform.开票组" placeholder="开票组">
              <el-option label="TEST" value="TEST"></el-option>
              <el-option label="PVD" value="PVD"></el-option>
              <el-option label="CVD" value="CVD"></el-option>
              <el-option label="DET" value="DET"></el-option>
              <el-option label="WET" value="WET"></el-option>
              <el-option label="PHOTO" value="PHOTO"></el-option>
              <el-option label="C-TEST" value="C-TEST"></el-option>
              <el-option label="AT" value="AT"></el-option>
              <el-option label="前工程" value="前工程"></el-option>
              <el-option label="中工程" value="中工程"></el-option>
              <el-option label="材料管理科" value="材料管理科"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处置组" class="selectitem">
            <el-select v-model="queryform.处置组" placeholder="请选择处置组">
              <el-option label="TEST" value="TEST"></el-option>
              <el-option label="PVD" value="PVD"></el-option>
              <el-option label="CVD" value="CVD"></el-option>
              <el-option label="DET" value="DET"></el-option>
              <el-option label="WET" value="WET"></el-option>
              <el-option label="PHOTO" value="PHOTO"></el-option>
              <el-option label="C-TEST" value="C-TEST"></el-option>
              <el-option label="AT" value="AT"></el-option>
              <el-option label="前工程" value="前工程"></el-option>
              <el-option label="中工程" value="中工程"></el-option>
              <el-option label="材料管理科" value="材料管理科"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="确认组" class="selectitem">
            <el-select v-model="queryform.确认组" placeholder="确认组">
              <el-option label="TEST" value="TEST"></el-option>
              <el-option label="PVD" value="PVD"></el-option>
              <el-option label="CVD" value="CVD"></el-option>
              <el-option label="DET" value="DET"></el-option>
              <el-option label="WET" value="WET"></el-option>
              <el-option label="PHOTO" value="PHOTO"></el-option>
              <el-option label="C-TEST" value="C-TEST"></el-option>
              <el-option label="AT" value="AT"></el-option>
              <el-option label="前工程" value="前工程"></el-option>
              <el-option label="中工程" value="中工程"></el-option>
              <el-option label="材料管理科" value="材料管理科"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="异常名称" class="longinput" prop="sheet">
            <el-input placeholder="请输入" v-model="queryform.异常名称" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="type">
            <el-checkbox-group v-model="状态" style="margin-left:15px">
              <el-checkbox label="进行" checked></el-checkbox>
              <el-checkbox label="完成" checked></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-button type="primary" class="uploadbtn" @click="query">查询</el-button>
        </el-form>
      </el-col>
      <el-col :span="21">
        <transition mode="out-in">
          <el-table
            border
            v-if="tableShow"
            key="protable"
            :data="protableData"
            style="width: 100%;white-space:nowrap"
            max-height="650"
            highlight-current-row
            :header-cell-style="{background:'#E3E3E3',color:'#606266'}"
          >
            <el-table-column prop="编号" label="编号" align="center" width="212" sortable></el-table-column>
            <el-table-column prop="状态" label="状态" align="center" width="50"></el-table-column>
            <el-table-column prop="创建" label="创建" align="center" width="80"></el-table-column>
            <el-table-column
              prop="创建时间"
              label="创建时间"
              align="center"
              width="115"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column prop="制品" label="制品" align="center" width="50"></el-table-column>
            <el-table-column prop="程度" label="程度" align="center" width="50"></el-table-column>
            <el-table-column
              prop="异常"
              label="异常"
              align="center"
              width="130"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column prop="现象" label="现象" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="处置" label="处置" align="center" width="70"></el-table-column>
            <el-table-column
              prop="经理"
              label="经理"
              align="center"
              width="50"
              :formatter="this.common.removeNone"
            ></el-table-column>
            <el-table-column
              prop="PQC"
              label="PQC"
              align="center"
              width="60"
              :formatter="this.common.removeNone"
            ></el-table-column>
            <el-table-column prop="操作" label="操作" width="80" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain @click="productEdit(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- :data="equtableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->

          <el-table
            border
            v-else
            key="eqtable"
            :data="equtableData"
            style="width: 100%;white-space:nowrap"
            max-height="650"
            highlight-current-row
          >
            <el-table-column prop="编号" label="编号" align="center" width="135" sortable></el-table-column>
            <el-table-column prop="状态" label="状态" align="center" width="70"></el-table-column>
            <el-table-column prop="创建" label="创建" align="center" width="80"></el-table-column>
            <el-table-column prop="创建时间" label="创建时间" align="center" width="115"></el-table-column>
            <el-table-column prop="设备" label="设备" align="center" width="60"></el-table-column>
            <el-table-column prop="号机" label="号机" align="center" width="50"></el-table-column>
            <el-table-column prop="Main" label="Main" align="center" width="90"></el-table-column>
            <el-table-column prop="Sub" label="Sub" align="center" width="90"></el-table-column>
            <el-table-column prop="现象" label="现象" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="处置" label="处置" align="center" width="80"></el-table-column>
            <el-table-column
              prop="经理"
              label="经理"
              align="center"
              width="60"
              :formatter="this.common.removeNone"
            ></el-table-column>
            <el-table-column
              prop="PQC"
              label="PQC"
              align="center"
              width="60"
              :formatter="this.common.removeNone"
            ></el-table-column>
            <el-table-column prop="操作" label="操作" width="80" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain @click="equipmentEdit(scope.row[0])">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </transition>
        <!-- <div class="pagination" v-if="tableShow">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="protableData.length"
          ></el-pagination>
        </div>
        <div class="pagination" v-else>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="equtableData.length"
          ></el-pagination>
        </div>-->
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
      <querypro :id="ticNumber" :group="group" @proclose='proclose'></querypro>
    </el-dialog>
    <el-dialog
      title="设备处置详情"
      :visible.sync="queryequip"
      width="85%"
      top="3%"
      destroy-on-close
      center
    >
      <queryequip :id="ticNumber"></queryequip>
    </el-dialog>
  </div>
</template>

<script>
import querypro from "./components/alertpro"
import queryequip from "./components/alertequip"
export default {
  data() {
    return {
      tableShow: true,
      querypro: false,
      queryequip: false,
      ticNumber: null,
      type: "制品异常单",
      protableData: [
        {
          编号: "制品异常-面板厂-2019-23492",
          状态: "进行",
          创建: "王兴",
          创建时间: "2019-11-12 05:00:22",
          制品: "试做",
          程度: "轻微",
          异常: "圈状mura、横线不良",
          现象: "导航中检出圈状mura、横线不良",
          处置: "前工程",
          经理: "None",
          PQC: "None"
        }
      ],
      equtableData: [
        {
          编号: "设备异常-面板厂-2019-7383",
          状态: "完成",
          创建: "刘志强",
          创建时间: "2019-11-12 03:05:10",
          设备: "ODL",
          号机: "3",
          Main: "EQ3",
          Sub: "Alignment stage",
          现象: "画像异常",
          处置: "中工程",
          经理: "None",
          PQC: "None"
        }
      ],
      queryform: {
        开始日期: "",
        结束日期: "",
        异常程度: "",
        开票组: "",
        处置组: "",
        确认组: "",
        异常名称: ""
      },
      状态: [],
      api: {
        product: "/API/异常处置系统/制品单查询.py",
        equipment: "/API/异常处置系统/设备单查询.py"
      },
      currentPage: 1, // 初始页
      pagesize: 10 //    每页的数据
    }
  },
  components: {
    querypro,
    queryequip
  },
  methods: {
    // 初始异常时间
    formatTime() {
      const date = new Date()
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const day = date
        .getDate()
        .toString()
        .padStart(2, "0")
      this.queryform.开始日期 = `${year}-${month}-${(day - 1)
        .toString()
        .padStart(2, "0")}`
      this.queryform.结束日期 = `${year}-${month}-${day} `
    },
    async query() {
      let formstate = this.状态.join()
      let api = ""
      this.type == "制品异常单"
        ? (api = this.api.product)
        : (api = this.api.equipment)
      this.queryform.状态 = formstate
      const { data } = await this.$http.post(
        `${api}`,
        this.$qs.stringify(this.queryform)
      )
      if (data.state == "") {
        this.type == "制品异常单"
          ? (this.protableData = data.data)
          : (this.equtableData = data.data)
      } else {
        this.$notify({
          title: "错误！",
          message: `${data.state}`,
          type: "error",
          duration: "4000"
        })
      }
    },
    productEdit(num) {
      this.ticNumber = num.编号
      this.group = num.处置
      this.querypro = true
    },
    proclose() {
      this.querypro = false
    },
    equclose() {
      this.queryequip = false
    },
    equipmentEdit() {
      this.queryequip = true
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }
  },
  created() {
    this.formatTime()
  }
}
</script>

<style scoped>
body .el-table th.gutter {
  display: table-cell !important;
}
.el-radio,
.el-checkbox {
  float: left;
  margin-right: 6px;
}
.el-input,
.el-select {
  width: 92%;
}

.el-radio-group {
  padding: 7px;
  border: 1px solid rgb(218, 218, 218);
  border-radius: 5px;
  width: 85%;
}
.el-form-item {
  margin-bottom: 0px;
  text-align: center;
}
.el-label >>> .el-form-item__label {
  line-height: 18px !important;
  font-weight: 550;
  float: none;
}
.el-date-editor {
  width: 90% !important;
}
.uploadbtn {
  width: 90%;
  font-size: 15px;
  padding: 9px;
}
</style>