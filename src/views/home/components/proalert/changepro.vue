<template>
  <div id="newsheet">
    <div ref="productTic" v-if="ticshow" key="product">
      <el-card class="box-card">
        <el-form
          ref="productform"
          :model="productform"
          label-width="106px"
          class="elform"
          :rules="rules"
          size="small "
          label-position="left"
        >
          <el-form-item label="异常发生时间">
            <el-date-picker
              v-model="productform.time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="异常类型" prop="type">
            <el-radio-group v-model="productform.type">
              <el-radio label="轻微"></el-radio>
              <el-radio label="重大"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="制品分类" prop="classify">
            <el-radio-group v-model="productform.classify">
              <el-radio label="试做"></el-radio>
              <el-radio label="量产"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="处置组" prop="group" class="input-lot">
            <el-select v-model="productform.group" placeholder="请选择处置组">
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
          <el-form-item label="对象LOT" prop="lot" class="input-lot">
            <el-input
              placeholder="请输入LOT"
              v-model="productform.lot"
              class="input-with-select"
              maxlength="12"
            >
              <el-button slot="append" icon="el-icon-search" @click="queryLot()"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="对象SHEET" class="longinput" prop="sheet">
            <el-input
              v-input-filter
              placeholder="请输入SHEET"
              v-model="productform.sheet"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="对象PANEL" class="longinput">
            <el-input
              v-input-filter
              placeholder="请输入PANEL"
              v-model="productform.panel"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="对象备注" class="longinput">
            <el-input
              v-input-filter
              placeholder="请输入备注"
              v-model="productform.remark"
              maxlength="40"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
        <el-card shadow="hover" class="box-card1 box-lot">
          <el-table
            v-loading="loading"
            :data="lotDate"
            border
            style="width: 100%"
            max-height="380"
            highlight-current-row
          >
            <el-table-column
              prop="品名"
              label="品名"
              align="center"
              :show-overflow-tooltip="true"
              sortable
            ></el-table-column>
            <el-table-column
              prop="设备"
              label="设备"
              align="center"
              width="80"
              :show-overflow-tooltip="true"
              sortable
            ></el-table-column>
            <el-table-column prop="大工程" label="大工程" align="center" width="90" sortable></el-table-column>
            <el-table-column prop="小工程" label="小工程" align="center" width="90" sortable></el-table-column>
            <el-table-column label="操作" align="center" width="60">
              <template slot-scope="scope">
                <el-button @click="add(scope.row)" type="primary" size="small" plain>添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-divider content-position="center" style="margin-top:50%">已添加信息</el-divider>
        <el-card shadow="hover" class="box-card1">
          <el-table
            :data="lotallmessage"
            border
            style="width: 100%"
            max-height="350"
            highlight-current-row
          >
            <el-table-column prop="LOT" label="LOT" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.LOT}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SHEET" label="SHEET" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.SHEET}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="PANEL" label="PANEL" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.PANEL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="品名" label="品名" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.品名}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="设备" label="设备" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.设备}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="大工程" label="大工程" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.大工程}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="小工程" label="小工程" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.小工程}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="备注" label="备注" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.备注}}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  plain
                  type="primary"
                  @click.native.prevent="deleteRow(scope.$index, lotallmessage)"
                  size="small"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-card>
      <el-card class="box-card2">
        <el-row>
          <el-col :span="24" :gutter="2">
            <label class="labletext">
              <i style="color:#F56C9B;margin-right:3px">*</i>异常名称:
            </label>
            <el-button-group style="float:left;margin-left:10px;">
              <el-button
                type="primary"
                @click="queryname(btnname.tongyong)"
                plain
                size="small"
              >{{btnname.tongyong}}</el-button>
              <el-button
                size="small"
                type="primary"
                @click="queryname(btnname.array)"
                plain
              >{{btnname.array}}</el-button>
              <el-button
                size="small"
                type="primary"
                @click="queryname(btnname.cell)"
                plain
              >{{btnname.cell}}</el-button>
            </el-button-group>
          </el-col>
        </el-row>
        <el-form ref="otherform" :model="productform" :rules="rules" size="small">
          <el-form-item lable="异常名称" prop="abnormalName" style="margin:0px 0 10px 0;">
            <el-select
              class="inputselect"
              v-model="productform.abnormalName"
              filterable
              allow-create
              clearable
              default-first-option
              maxlength="20"
              show-word-limit
              placeholder="请选择异常名称"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-col>
            <label class="labletext">
              <i style="color:#F56C9B;margin-right:3px">*</i>异常描述:
            </label>
            <el-form-item lable="异常描述" prop="discribe">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                maxlength="50"
                show-word-limit
                v-model="productform.discribe"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <el-col>
          <label class="labletext">不良位置:</label>
          <div class="picdisplay">
            <div style="margin-left: 70%">1300</div>
            <div
              class="picture"
              :style="{backgroundColor:!picture.位1?'#87ff50':'red'}"
              @click="picture.位1=!picture.位1"
            ></div>
            <div
              class="picture"
              :style="{backgroundColor:!picture.位2?'#87ff50':'red'}"
              @click="picture.位2=!picture.位2"
            ></div>
            <div
              class="picture"
              :style="{backgroundColor:!picture.位3?'#87ff50':'red'}"
              @click="picture.位3=!picture.位3"
            ></div>
            <br />
            <div
              class="picture"
              :style="{backgroundColor:!picture.位4?'#87ff50':'red'}"
              @click="picture.位4=!picture.位4"
              style="margin-left:5%"
            ></div>
            <div
              class="picture"
              :style="{backgroundColor:!picture.位5?'#87ff50':'red'}"
              @click="picture.位5=!picture.位5"
            ></div>
            <div
              class="picture"
              :style="{backgroundColor:!picture.位6?'#87ff50':'red'}"
              @click="picture.位6=!picture.位6"
            ></div>
            <div style="width:90%">
              <span style="float:left;margin-left:15%">1100</span>
              <span style="float:right">OF</span>
            </div>
          </div>
          <el-button type="primary" class="upload" @click.once="upload" :loading="uploadbtn">
            提交
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </el-col>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "newsheet",
  data() {
    return {
      loading: false,
      uploadbtn: false,
      ticshow: true,
      productform: {
        time: "",
        group: "",
        lot: "",
        sheet: "",
        abnormalName: "",
        panel: "",
        remark: "",
        discribe: "",
        type: "轻微",
        classify: "试做"
      },
      btnname: {
        tongyong: "通用",
        array: "ARRAY",
        cell: "CELL"
      },
      lotallmessage: [],
      loading: false,
      isshow: true,
      picture: {
        位1: 0,
        位2: 0,
        位3: 0,
        位4: 0,
        位5: 0,
        位6: 0
      },
      options: [],
      rules: {
        time: [
          {
            type: "date",
            required: true,
            message: "请选择异常发生时间",
            trigger: "blur"
          }
        ],
        group: [{ required: true, message: "请选择处置组", trigger: "change" }],
        type: [
          {
            type: "string",
            required: true,
            message: "请至少选择一个异常类型"
          }
        ],
        lot: [{ required: true, message: "请填写Lot" }],
        classify: [
          {
            required: true,
            message: "请至少选择一个制品分类",
            trigger: "change"
          }
        ],
        sheet: [{ required: true, message: "请填写SHEET", trigger: "blur" }],
        discribe: [
          { required: true, message: "请填写异常描述", trigger: "blur" }
        ],
        abnormalName: [
          { required: true, message: "请选择异常名称", trigger: "change" }
        ]
      },
      lotDate: []
    }
  },
  props: ["id"],
  methods: {
    //制品单数据获取
    async queryMes() {
      const { data } = await this.$http.post(
        "/API/异常处置系统/制品单关联.py",
        this.$qs.stringify({
          编号: this.id
        })
      )
      console.log(data)

      this.lotallmessage = data.LOT信息
      this.productform.abnormalName = data.制品异常详情.异常名称
      this.productform.discribe = data.制品异常详情.异常描述
      this.productform.time = data.制品异常详情.异常发生时间
      this.productform.type = data.制品异常详情.异常程度
      this.productform.classify = data.制品异常详情.制品分类
      this.productform.group = data.制品异常详情.处置组
      let pictrue = document.getElementsByClassName("picture")
      for (let i = 0; i < 6; i++) {
        if (data.不良位置[0][Object.keys(data.不良位置[0])[i]] == 1) {
          pictrue[i].style.backgroundColor = "red"
        }
      }
    },

    // 根据LOT号查询品名等
    async queryLot() {
      this.loading = true
      const { data } = await this.$http.post(
        "/API/异常处置系统/品名工程查询_异常单_面板厂.py",
        this.$qs.stringify({
          LOT: this.productform.lot
        })
      )
      if (data.state === "") {
        this.lotDate = data.data
        this.loading = false
      } else {
        alert(data.state)
      }
    },
    async queryname(group) {
      this.options = []
      if (this.productform.group === "") {
        this.$notify({
          title: "提示",
          message: "请选择处置组",
          type: "warning",
          duration: "1500"
        })
        return
      }
      const { data } = await this.$http.post(
        "/API/异常处置系统/异常名称查询_异常单_面板厂.py",
        this.$qs.stringify({
          分类: group,
          处置组: this.productform.group
        })
      )
      if (data.state === "") {
        data.data.split(",").forEach(ele => {
          this.options.push({
            value: ele,
            lable: ele
          })
        })
        this.loading = false
      } else {
        alert(data.state)
      }
    },
    // 添加LOT异常详细信息
    add(data) {
      this.lotallmessage.push({
        LOT: this.productform.lot,
        SHEET: this.productform.sheet,
        PANEL: this.productform.panel,
        品名: data.品名,
        设备: data.设备,
        大工程: data.大工程,
        小工程: data.小工程,
        备注: this.productform.remark
      })
    },
    // 删除添加的信息
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    changeupload() {
      if (this.equipmentform.link == "是") {
        this.$notify({
          title: "提示",
          message: "请填写相关制品异常单~",
          type: "warning",
          duration: "",
          offset: 50
        })
      }
    },
    // 异常单信息上传
    async upload() {
      this.uploadbtn = true
      for (var x = 0; x < 6; x++) {
        if (
          document.getElementsByClassName("picture")[x].style
            .backgroundColor == "red"
        ) {
          this.picture[x] = "1"
        } else {
          this.picture[x] = "0"
        }
      }
      let params = {
        工号: this.$store.state.username,
        编号: this.id,
        制品_异常时间: this.productform.time,
        制品_异常类型: "制品异常",
        制品_处置组: this.productform.group,
        制品_异常程度: this.productform.type,
        制品_制品分类: this.productform.classify,
        制品_异常名称: this.productform.abnormalName,
        制品_异常描述: this.productform.discribe,
        制品_LOT: this.lotallmessage
          .map(ele => {
            return ele.LOT
          })
          .join(),
        制品_SHEET: this.lotallmessage
          .map(ele => {
            return ele.SHEET
          })
          .join(),
        制品_PANEL: this.lotallmessage
          .map(ele => {
            return ele.PANEL
          })
          .join(),
        制品_品名: this.lotallmessage
          .map(ele => {
            return ele.品名
          })
          .join(),
        制品_设备: this.lotallmessage
          .map(ele => {
            return ele.设备
          })
          .join(),
        制品_大工程: this.lotallmessage
          .map(ele => {
            return ele.大工程
          })
          .join(),
        制品_小工程: this.lotallmessage
          .map(ele => {
            return ele.小工程
          })
          .join(),
        制品_备注: this.lotallmessage
          .map(ele => {
            return ele.备注
          })
          .join(),
        位1: this.picture[0],
        位2: this.picture[1],
        位3: this.picture[2],
        位4: this.picture[3],
        位5: this.picture[4],
        位6: this.picture[5]
      }
      const { data: state } = await this.$http.post(
        "/API/异常处置系统/修改_制品单.py",
        this.$qs.stringify(params)
      )
      if (state.state == "插入成功") {
        const h = this.$createElement
        this.submitloading = false
        this.$alert(
          h("span", { style: "font-size: 18px" }, "制品单修改成功"),
          "提示",
          {
            confirmButtonText: "确定",
            showClose: false,
            type: "success",
            callback: action => {
              if (action === "confirm") {
                this.$emit("close")
                this.$store.state.refresh = new Date().getTime()
              }
            }
          }
        )
      } else {
        alert(data.state)
      }
    }
  },
  created() {
    this.queryMes()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leftbtn {
  float: left;
  margin-top: 2px;
}
.upload {
  margin-top: 13px;
  margin-left: 10%;
  width: 70%;
  height: 40px;
  font-size: 19px;
}
.elform {
  width: 50%;
  float: left;
}
.el-input,
.el-select {
  float: left;
  width: 95%;
}
.input-lot {
  width: 320px;
}
.el-date-editor {
  width: 220px;
}
.el-radio-group {
  float: left;
  padding-top: 6px;
}
.longinput {
  width: 98%;
}
.box-card {
  width: 73%;
  margin: 2px;
  display: inline-block;
  height: 700px;
}

.box-card1 >>> .el-card__body {
  padding: 0 !important;
  border: 0;
}
.box-lot {
  height: 380px;
}
.box-card2 {
  text-align: center;
  width: 25.5%;
  padding: 0;
  display: inline-block;
  margin-left: 0.5%;
  margin-top: 2px;
  height: 700px;
}
.labletext {
  float: left;
  line-height: 30px;
  margin-left: 10px;
}
.inputselect {
  margin: 10px 0 0 0;
  width: 100%;
}
.picdisplay {
  margin-top: 10%;
}
.picture {
  display: inline-block;
  width: 14%;
  height: 105px;
  margin-left: 5%;
  background-color: #87ff50;
  border: 1px solid rgba(170, 170, 170, 0.87);
  border-radius: 2px;
  box-shadow: 4px 4px 5px #cccccc;
}
.selectitem >>> .el-select {
  width: 221px !important;
}
.selectitem >>> .el-input {
  width: 221px !important;
}
.selectitem >>> .el-textarea {
  width: 221px !important;
  height: 60px !important;
}
</style>
