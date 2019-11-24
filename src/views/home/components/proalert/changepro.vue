
<template>
  <div>
    <!-- <el-card class="box-card"> -->
      <el-row>

    <el-col :span="18">
      <el-form
        ref="productform"
        :model="productform"
        label-width="110px"
        class="elform"
        :rules="rules"
        size="small"
        label-position="left"
      >
        <el-form-item label="异常发生时间" prop="time">
          <el-date-picker v-model="productform.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
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
            <el-button slot="append" icon="el-icon-search" @click="query()"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="对象SHEET" class="longinput" prop="sheet">
          <el-input
            placeholder="请输入SHEET"
            v-model="productform.sheet"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="对象PANEL" class="longinput">
          <el-input
            placeholder="请输入PANEL"
            v-model="productform.panel"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="对象备注" class="longinput">
          <el-input placeholder="请输入备注" v-model="productform.remark" maxlength="50" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <el-card shadow="hover" class="box-card1">
        <el-table
          v-loading="loading"
          :data="lotDate"
          border
          style="width: 100%"
          max-height="350"
          highlight-current-row
        >
          <el-table-column prop="品名" label="品名" align="center" sortable></el-table-column>
          <el-table-column prop="设备" label="设备" align="center" sortable></el-table-column>
          <el-table-column prop="大工程" label="大工程" align="center" sortable></el-table-column>
          <el-table-column prop="小工程" label="小工程" align="center" sortable></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="add(scope.row)" type="primary" size="small" plain>添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-divider content-position="center" style="margin-top:50%">已添加信息</el-divider>
      <el-card shadow="hover" class="box-card1" style="height:280px">
        <el-table
          v-loading="loading"
          :data="lotallmessage"
          border
          style="width: 100%"
          max-height="220"
          highlight-current-row
        >
          <el-table-column prop="LOT" label="LOT" width="100" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.LOT}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="SHEET" label="SHEET" width="100" align="center" :show-overflow-tooltip="true" >
            <template slot-scope="scope">
              <span>{{scope.row.SHEET}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="PANEL" label="PANEL" width="100" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.PANEL}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="品名" label="品名" width="180" align="center" :show-overflow-tooltip="true" >
            <template slot-scope="scope">
              <span>{{scope.row.品名}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="设备" label="设备" width="80" align="center" >
            <template slot-scope="scope">
              <span>{{scope.row.设备}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="大工程" label="大工程" width="80" align="center" >
            <template slot-scope="scope">
              <span>{{scope.row.大工程}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="小工程" label="小工程" width="80" align="center" >
            <template slot-scope="scope">
              <span>{{scope.row.小工程}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="备注" label="备注" width="150" align="center" :show-overflow-tooltip="true" >
            <template slot-scope="scope">
              <span>{{scope.row.备注}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click.native.prevent="deleteRow(scope.$index, lotallmessage)"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    <!-- </el-card>
    <el-card class="box-card2"> -->
      </el-col>
      <el-col :span='5' style="margin-left:10px">
        <label class="labletext">异常名称:</label>
        <el-button-group style="float:left;margin:5px 0">
          <el-button size='small' plain type="primary">通用</el-button>
          <el-button size='small' plain type="primary">ARRAY</el-button>
          <el-button size='small' plain type="primary">CELL</el-button>
        </el-button-group>
      <el-form ref="otherform" :model="productform" :rules="rules" size="mini">
        <el-form-item lable="异常名称" prop="abnormalName" style="margin:38px 0 10px 0;">
          <el-select
            class="inputselect"
            v-model="productform.abnormalName"
            filterable
            allow-create
            clearable
            default-first-option
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
          <label class="labletext">异常描述:</label>
          <el-form-item lable="异常描述" prop="discribe">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="productform.discribe"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col>
        <label class="labletext">不良位置:</label>
        <div class="picdisplay">
          <div style="margin-left: 66%">1300</div>
          <div
            class="picture"
            :class="{red: !picture.位1,green: picture.位1}"
            @click="picture.位1=!picture.位1"
          ></div>
          <div
            class="picture"
            :class="{red: !picture.位2,green: picture.位2}"
            @click="picture.位2=!picture.位2"
          ></div>
          <div
            class="picture"
            :class="{red: !picture.位3,green: picture.位3}"
            @click="picture.位3=!picture.位3"
          ></div>
          <br />
          <div
            class="picture"
            :class="{red: !picture.位4,green: picture.位4}"
            @click="picture.位4=!picture.位4"
            style="margin-left:5%"
          ></div>

          <div
            class="picture"
            :class="{red: !picture.位5,green: picture.位5}"
            @click="picture.位5=!picture.位5"
          ></div>
          <div
            class="picture"
            :class="{red: !picture.位6,green: picture.位6}"
            @click="picture.位6=!picture.位6"
          ></div>
          <div style="width:70%">
            <span style="float:left">1100</span>
            <span style="float:right">OF</span>
          </div>
        </div>
      </el-col>
      <el-button type="primary" class="upload" @click="upload">
        提交
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    <!-- </el-card> -->
          </el-col>

      </el-row>
  </div>
</template>
<script>

export default {
  name: 'productchange',
  data () {
    return {
      productform: {
        time: '',
        group: '',
        lot: '',
        sheet: '',
        abnormalName: '',
        panel: '',
        remark: '',
        discribe: '',
        type: '轻微',
        classify: '试做'
      },
      lotDate: [],
      lotallmessage: [],
      loading: false,
      isshow: true,
      picture: {
        位1: 1,
        位2: 1,
        位3: 1,
        位4: 1,
        位5: 1,
        位6: 1
      },
      options: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      rules: {
        time: [
          {
            type: 'date',
            required: true,
            message: '请选择异常发生时间',
            trigger: 'blur'
          }
        ],
        group: [{ required: true, message: '请选择处置组', trigger: 'change' }],
        type: [
          {
            type: 'string',
            required: true,
            message: '请至少选择一个异常类型'
          }
        ],
        lot: [{ required: true, message: '请填写Lot' }],
        classify: [
          {
            required: true,
            message: '请至少选择一个制品分类',
            trigger: 'change'
          }
        ],
        sheet: [{ required: true, message: '请填写SHEET', trigger: 'blur' }],
        discribe: [
          { required: true, message: '请填写异常描述', trigger: 'blur' }
        ],
        abnormalName: [
          { required: true, message: '请选择异常名称', trigger: 'change' }
        ]
      },
      lotDate: [
        {
          品名: '123654646',
          设备: 'MMAOI002',
          大工程: '050',
          小工程: '050'
        },
        {
          品名: '123654646',
          设备: 'MMAOI002',
          大工程: '050',
          小工程: '050'
        },
        {
          品名: '123654646',
          设备: 'MMAOI002',
          大工程: '050',
          小工程: '050'
        },
        {
          品名: '123654646',
          设备: 'MMAOI002',
          大工程: '050',
          小工程: '050'
        },
        {
          品名: '123654646',
          设备: 'MMAOI002',
          大工程: '050',
          小工程: '050'
        },
        {
          品名: '123654646',
          设备: 'MMAOI002',
          大工程: '050',
          小工程: '050'
        },
        {
          品名: '123654646',
          设备: 'MMAOI002',
          大工程: '050',
          小工程: '050'
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    add (data) {
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
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    async queryLot (lot) {
      this.Lot = lot
      const { data } = await this.$http.post(
        '/API/异常处置系统/LOT.py',
        this.$qs.stringify({
          LOT_ID: from.lot
        })
      )
      if (data.state === '') {
        this.lotDate = data.data
      } else {
        alert(data.state)
      }
    },
    formatTime () {
      const date = new Date()
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0')
      const hour = date
        .getHours()
        .toString()
        .padStart(2, '0')
      const minute = date
        .getMinutes()
        .toString()
        .padStart(2, '0')
      const second = date
        .getSeconds()
        .toString()
        .padStart(2, '0')
      this.productform.time = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    },
    // getcontext() {
    //     console.log(this.lotallmessage);
    //   this.textarray = this.lotallmessage.map(ele => {
    //     return ele.LOT;
    //   });
    //   console.log(this.textarray);

    // },
    async upload () {
      let place = []
      for (let [key, value] of Object.entries(this.picture)) {
        if (typeof value === 'boolean') {
          place.push(Number(value))
        } else {
          place.push(value)
        }
      }
      let params = {
        工号: 'C00000',
        制品_异常时间: this.productform.time,
        制品_异常类型: '制品异常单',
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
        位1: place[0],
        位2: place[1],
        位3: place[2],
        位4: place[3],
        位5: place[4],
        位6: place[5]
      }
      data.$on('ethis.$qsend', message => {
        Object.assign(params, message)
      })
      await this.$http.post('/api/API/异常处置系统/修改_制品单.py', this.$qs.stringify(params))
      if (data.state === '') {
        this.lotDate = data.data
      } else {
        alert(data.state)
      }
    }
  },
  created () {
    this.formatTime()
  }
}
</script>
<style scoped>
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
  width: 61%;
}
.el-date-editor {
  width: 65%;
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
  height: 93vh;
  float: left;
}
.box-card1 >>> .el-card__body {
  padding: 0 !important;
  border: 0;
  height: 380px;
}
.box-card2 {
  width: 25%;
  padding: 0;
  float: left;
  margin-left: 10px;
  height:93vh;
}
.labletext {
  float: left;
  line-height: 40px;
  margin-left: 10px;
}
.inputselect {
  margin: 10px 0 0 0;
  width: 100%;
}
.picdisplay {
  margin-top: 10%;
  margin-left: 15%
}
.picture {
  display: inline-block;
  width: 17%;
  height: 105px;
  margin-left: 5%;
  background-color: #cfff45;
  border: 1px solid rgba(170, 170, 170, 0.87);
  border-radius: 2px;
  box-shadow: 4px 4px 5px #cccccc;
}
.red {
  background-color: red;
}
.green {
  background-color: #87ff50;
}
.upload {
  margin-top: 15px;
  margin-left: 12%;
  width: 70%;
  height: 45px;
  font-size: 20px;
}
.el-page-header {
  line-height: 50px;
}
.el-page-header__text >>> .el-page-header__content {
  font-size: 20px;
  margin-left: 42%;
  font-weight: bold;
}
</style>
