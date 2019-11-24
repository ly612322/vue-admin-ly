<template>
  <div v-loading.lock="fullscreenLoading" element-loading-text="加载中...">
    <el-table :data="productdetails" max-height="250" border style="width: 100%" align="center">
      <el-table-column align="center" prop="异常单" label="异常单" width="220"></el-table-column>
      <el-table-column align="center" prop="异常发生时间" label="异常发生时间" width="180"></el-table-column>
      <el-table-column align="center" prop="异常程度" label="异常程度" width="100"></el-table-column>
      <el-table-column align="center" prop="制品分类" label="制品分类" width="100"></el-table-column>
      <el-table-column align="center" prop="异常名称" label="异常名称" width="300"></el-table-column>
      <el-table-column align="center" prop="异常描述" label="异常描述"></el-table-column>
    </el-table>
    <el-row type="flex">
      <el-col :span="19">
        <el-card class="box-card el-card__head el-card-body" shadow="never">
          <div slot="header" class="clearfix">
            <span>LOT信息</span>
          </div>
          <el-table :data="lotData" border align="center" class="el-table-unset" max-height="200">
            <el-table-column align="center" prop="LOT" label="LOT" width="100"></el-table-column>
            <el-table-column align="center" prop="SHEET" label="SHEET" width="100"></el-table-column>
            <el-table-column align="center" prop="PANEL" label="PANEL" width="100"></el-table-column>
            <el-table-column align="center" prop="品名" label="品名" width="150"></el-table-column>
            <el-table-column align="center" prop="设备" label="设备" width="100"></el-table-column>
            <el-table-column align="center" prop="大工程" label="大工程" width="100"></el-table-column>
            <el-table-column align="center" prop="小工程" label="小工程" width="100"></el-table-column>
            <el-table-column align="center" prop="备注" label="备注"></el-table-column>
          </el-table>
        </el-card>

        <el-card class="box-card el-card__head el-card-body" shadow="never">
          <div slot="header" class="clearfix">
            <span>最新处置进度</span>
          </div>
          <el-table :data="dealstep" border align="center" class="el-table-unset" max-height="200">
            <el-table-column
              align="center"
              prop="指示时间"
              label="指示时间"
              width="200"
              :formatter="this.common.sliceDate"
            ></el-table-column>
            <el-table-column align="center" prop="指示" label="指示" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column
              align="center"
              prop="结果"
              label="结果"
              width="150"
              :formatter="this.common.removeNone"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column align="center" prop="进度" label="进度" width="100"></el-table-column>
            <el-table-column
              align="center"
              prop="确认时间"
              label="确认时间"
              width="100"
              :formatter="this.common.removeNone"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="确认人"
              label="确认人"
              width="90"
              :formatter="this.common.removeNone"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="box-card el-card__head box-card-right" shadow="never">
          <div slot="header" class="clearfix">
            <span>不良位置</span>
          </div>
          <div class="picdisplay">
            <div style="margin-left: 80%">1300</div>
            <div class="picture"></div>
            <div class="picture"></div>
            <div class="picture"></div>
            <br />
            <div class="picture" style="margin-left:7%"></div>
            <div class="picture"></div>
            <div class="picture"></div>
            <div style="width:96%">
              <span style="float:left">1100</span>
              <span style="float:right">OF</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-divider>
      <i class="el-icon-edit">处置中</i>
    </el-divider>
    <el-row type="flex">
      <el-col :span="14">
        <el-card class="box-card-right box-card-ld" shadow="never">
          <el-form label-width="106px" class="elform" size="small " label-position="left">
            <el-form-item label="新指示" class="longinput">
              <el-input
                v-input-filter
                placeholder="请输入新指示"
                v-model="newInstruct"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-row type="flex" justify="start">
              <el-col :span="8">
                <el-form-item label="处置组" prop="group">
                  <el-select v-model="dealGroup" placeholder="请选择处置组">
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
              </el-col>
              <el-col :span="2">
                <el-button
                  type="primary"
                  @click="addInstruct"
                  style="line-height:6px;height: 32px;"
                >添加</el-button>
              </el-col>
            </el-row>
            <el-form-item label="起因设备" prop="group" class="input-lot">
              <el-select v-model="causeequipment" placeholder="请选择起因设备">
                <el-option value="ANL001" lable="ANL001"></el-option>
                <el-option value="ANL002" label="ANL002"></el-option>
                <el-option value="CVD007" label="CVD007"></el-option>
                <el-option value="CVD008" label="CVD008"></el-option>
                <el-option value="CVD009" label="CVD009"></el-option>
                <el-option value="CVD010" label="CVD010"></el-option>
                <el-option value="CVD011" label="CVD011"></el-option>
                <el-option value="CVD012" label="CVD012"></el-option>
                <el-option value="DCH001" label="DCH001"></el-option>
                <el-option value="DCH002" label="DCH002"></el-option>
                <el-option value="DCH003" label="DCH003"></el-option>
                <el-option value="DCH004" label="DCH004"></el-option>
                <el-option value="DCH005" label="DCH005"></el-option>
                <el-option value="DEC001" label="DEC001"></el-option>
                <el-option value="DEC002" label="DEC002"></el-option>
                <el-option value="DEC003" label="DEC003"></el-option>
                <el-option value="DEC004" label="DEC004"></el-option>
                <el-option value="DEC005" label="DEC005"></el-option>
                <el-option value="DEI001" label="DEI001"></el-option>
                <el-option value="DEI002" label="DEI002"></el-option>
                <el-option value="DEI003" label="DEI003"></el-option>
                <el-option value="DEI004" label="DEI004"></el-option>
                <el-option value="ODL001" label="ODL001"></el-option>
                <el-option value="ODL002" label="ODL002"></el-option>
                <el-option value="ODL003" label="ODL003"></el-option>
                <el-option value="PAL001" label="PAL001"></el-option>
                <el-option value="PAL002" label="PAL002"></el-option>
                <el-option value="RBL004" label="RBL004"></el-option>
                <el-option value="RBL005" label="RBL005"></el-option>
                <el-option value="RBL006" label="RBL006"></el-option>
                <el-option value="RBL007" label="RBL007"></el-option>
                <el-option value="RBL008" label="RBL008"></el-option>
                <el-option value="RBL009" label="RBL009"></el-option>
                <el-option value="RBL010" label="RBL010"></el-option>
                <el-option value="SPD001" label="SPD001"></el-option>
                <el-option value="SPD002" label="SPD002"></el-option>
                <el-option value="SPD003" label="SPD003"></el-option>
                <el-option value="SPI001" label="SPI001"></el-option>
                <el-option value="SPI002" label="SPI002"></el-option>
                <el-option value="SPI003" label="SPI003"></el-option>
                <el-option value="TAL001" label="TAL001"></el-option>
                <el-option value="TAL002" label="TAL002"></el-option>
                <el-option value="TCL001" label="TCL001"></el-option>
                <el-option value="TCL002" label="TCL002"></el-option>
                <el-option value="WIS001" label="WIS001"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="正向追踪单" class="longinput">
              <el-input
                placeholder="正向追踪单"
                v-model="track"
                maxlength="50"
                show-word-limit
                v-input-filter
              ></el-input>
            </el-form-item>
            <el-form-item label="经理备注" class="longinput">
              <el-input placeholder="经理备注" v-model="manager" disabled></el-input>
            </el-form-item>
            <el-form-item label="原因" class="longinput">
              <el-input
                placeholder="请填写原因"
                v-model="reason"
                maxlength="50"
                show-word-limit
                v-input-filter
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="btn-submit"
                type="primary"
                @click="submitInstruct"
                :loading="submitloading"
              >指示</el-button>
              <el-popover placement="top" width="160" v-model="visible">
                <p>确定完结此异常单吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="endInstruct">确定</el-button>
                </div>
                <el-button
                  class="btn-submit"
                  type="primary"
                  slot="reference"
                  :loading="endloading"
                >完结</el-button>
              </el-popover>

              <!-- <el-button
                class="btn-submit"
                type="primary"
                @click="endInstruct"
                :loading="endloading"
              >完结</el-button>-->
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card-rd" shadow="never">
          <el-table
            :data="instructData"
            border
            align="center"
            class="el-table-unset"
            max-height="380"
          >
            <el-table-column align="center" prop="指示" label="指示"></el-table-column>
            <el-table-column align="center" prop="确认组" label="确认组" width="100"></el-table-column>
            <el-table-column align="center" prop="操作" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  plain
                  type="primary"
                  @click.native.prevent="deleteRow(scope.$index, instructData)"
                  size="small"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import inputFilter from '../../../../utils/index'
export default {
  name: 'productprocess',
  directives: {
    inputFilter
  },
  data () {
    return {
      fullscreenLoading: false,
      visible: false,
      submitloading: false,
      endloading: false,
      productdetails: [],
      lotData: [],
      dealstep: [],
      causeequipment: '',
      manager: '',
      track: '',
      reason: '',
      newInstruct: '',
      dealGroup: '',
      instructData: [],
      allInstruct: []
    }
  },
  props: ['id'],
  methods: {
    async querymessage () {
      this.fullscreenLoading = false
      const { data } = await this.$http.post(
        '/api/API/异常处置系统/制品单关联.py',
        this.$qs.stringify({
          编号: this.id
        })
      )
      let details = data.制品异常详情
      let list = {}
      for (let i = 2; i < 8; i++) {
        list[Object.keys(details)[i]] = Object.values(details)[i]
      }
      this.productdetails.push(list)
      this.lotData = data.LOT信息
      this.dealstep = data.最新处置进度
      this.manager = Object.values(data.经理确认)[0]
      this.causeequipment = Object.values(data.制品异常详情)[9]
      this.track = Object.values(data.制品异常详情)[10].replace('None', '')
      this.reason = Object.values(data.制品异常详情)[11].replace('None', '')
      let pictrue = document.getElementsByClassName('picture')
      for (var i = 0; i < 6; i++) {
        if (data.不良位置[0][Object.keys(data.不良位置[0])[i]] == 1) {
          pictrue[i].style.backgroundColor = 'red'
        }
      }
      this.fullscreenLoading = false
    },
    addInstruct () {
      if (this.newInstruct == '') {
        this.$notify({
          title: '提示',
          message: '请填写指示内容',
          type: 'warning',
          duration: '2000'
        })
        return
      }
      for (let i in this.instructData) {
        if (this.instructData[i].指示 == this.newInstruct) {
          this.$notify({
            title: '提示',
            message: '请勿添加相同指示',
            type: 'warning',
            duration: '2000'
          })
          return
        }
      }

      this.instructData.push({
        指示: this.newInstruct,
        确认组: this.dealGroup
      })
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    async submitInstruct () {
      if (this.instructData.length === 0) {
        this.$notify({
          title: '提示',
          message: '请添加指示内容',
          type: 'warning',
          duration: '2000'
        })
        return
      }
      if (this.reason === '') {
        this.$notify({
          title: '提示',
          message: '请填写原因',
          type: 'warning',
          duration: '2000'
        })
        return
      }
      this.submitloading = true
      let params = {
        编号: this.$route.params.id,
        工号: 'C00000',
        指示: this.instructData
          .map(ele => {
            return ele.指示
          })
          .join(),
        确认组: this.instructData
          .map(ele => {
            return ele.确认组
          })
          .join(),
        起因设备: this.causeequipment,
        正向追踪单: this.track,
        原因: this.reason
      }

      let { data } = await this.$http.post(
        '/api/API/异常处置系统/制品指示_异常单_面板厂.py',
        this.$qs.stringify(params)
      )
      if (data.state == '提交成功') {
        const h = this.$createElement
        this.submitloading = false
        this.$alert(
          h('span', { style: 'font-size: 18px' }, '指示成功'),
          '提示',
          {
            confirmButtonText: '确定',
            showClose: false,
            type: 'success',
            callback: action => {
              this.$router.push({ name: 'home' })
            }
          }
        )
      }
    },
    async endInstruct () {
      if (this.dealstep.length === 0) {
        this.$notify({
          title: '提示',
          message: '未进行处置，无法完结',
          type: 'warning',
          duration: '2000'
        })
        return
      }
      for (var i = 0; i < this.dealstep.length; i++) {
        if (this.dealstep[i][Object.keys(this.dealstep[i])[3]] == '进行') {
          this.$notify({
            title: '提示',
            message: '还有未完结的指示内容',
            type: 'warning',
            duration: '2000'
          })
          return
        }
      }
      this.endloading = true
      let params = {
        编号: this.$route.params.id,
        工号: 'C00000',
        指示: this.instructData
          .map(ele => {
            return ele.指示
          })
          .join(),
        确认组: this.instructData
          .map(ele => {
            return ele.确认组
          })
          .join(),
        起因设备: this.causeequipment,
        正向追踪单: this.track,
        原因: this.reason
      }
      let { data } = await this.$http.post(
        '/API/api',
        this.$qs.stringify(params)
      )
      if (data.state == '提交成功') {
        const h = this.$createElement
        this.submitloading = false
        this.$alert(
          h('span', { style: 'font-size: 18px' }, '制品单已完结'),
          '提示',
          {
            confirmButtonText: '确定',
            showClose: false,
            type: 'success',
            callback: action => {
              this.$router.push('/home')
            }
          }
        )
      }
    }
  },
  computed: {},
  created () {
    this.querymessage()
  }
}
</script>
<style scoped>
.el-input,
.el-select {
  float: left;
  width: 95%;
}
.input-lot {
  width: 45%;
}
.el-page-header {
  line-height: 50px;
}
.el-page-header__text >>> .el-page-header__content {
  font-size: 20px;
  margin-left: 42%;
  font-weight: bold;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
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
.el-icon-edit {
  font-size: 19px;
  font-weight: 550;
}
.picdisplay {
  margin-top: 15%;
  margin-left: 15%;
}
.picture {
  display: inline-block;
  width: 20%;
  height: 129px;
  margin-left: 7%;
  background-color: #5bf106;
  border: 1px solid rgba(170, 170, 170, 0.87);
  border-radius: 2px;
  box-shadow: 4px 4px 5px #cccccc;
}
.el-table-unset >>> .el-table__header-wrapper {
  overflow: unset;
}
.btn-submit {
  width: 25%;
  margin-left: 10%;
  font-size: 17px;
}
</style>
