<template>
	<div class="container">
		<base-layout>
			<template slot="header">
				<el-form ref="params" :model="params" label-width="6em" class="demo_ruleForm">
					<el-row>
						<el-col :span="4">
							<el-form-item label="姓名" prop="name">
								<el-input @clear="search" @keydown.enter.native="search" clearable v-model="params.name" placeholder="请输入姓名" />
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="性别" prop="sex">
								<el-select @clear="search" clearable v-model="params.sex" class="w-100" placeholder="请选择性别">
									<el-option v-for="item in generList" :key="item.label + item.value" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="籍贯" prop="place">
								<el-cascader clearable v-model="params.place" placeholder="请选择籍贯" class="w-[100%]" :options="cityList"
									:props="cityCascaderOption" :show-all-levels="true" @change="getValue('place', 'oldProvince', 'oldCity')"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="政治面貌" prop="politics">
								<el-select @clear="search" clearable v-model="params.politics" class="w-100" placeholder="请选择政治面貌">
									<el-option v-for="item in politicalStatusList" :key="item.label + item.value"
										:label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						
						<el-col :span="4">
							<el-form-item label="最高学历" prop="educationMax">
								<el-select @clear="search" clearable v-model="params.educationMax" class="w-100" placeholder="请选择最高学历">
									<el-option v-for="item in highestDegreeList" :key="item.label + item.value"
										:label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="校友类型" prop="type">
								<el-select @clear="search" @change="changeAlumniType" clearable v-model="params.type" class="w-100" placeholder="请选择校友类型">
									<el-option v-for="item in alumniTypeList" :key="item.id" :label="item.type"
										:value="item.id" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="标签属性" prop="attribute">
								<el-select @clear="search" clearable v-model="params.attribute" class="w-100" placeholder="请选择标签属性">
									<el-option v-for="item in labelTypeList" :key="item.id" :label="item.attribute"
										:value="item.id" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="单位" prop="company">
								<el-input @keydown.enter.native="search" @clear="search" clearable v-model="params.company" placeholder="请输入单位" />
							</el-form-item>
						</el-col>
						<!-- <el-col :span="4">
							<el-form-item label="部门" prop="department">
								<el-input clearable v-model="params.department" placeholder="请输入部门" />
							</el-form-item>
						</el-col> -->
						<el-col :span="6">
							<el-form-item label="职务" prop="position">
								<el-input @keydown.enter.native="search" @clear="search" clearable v-model="params.position" placeholder="请输入职务" />
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="工作状态" prop="workStatus">
								<el-select @clear="search" clearable v-model="params.workStatus" class="w-100" placeholder="请选择工作状态">
									<el-option v-for="item in workingStateList" :label="item.label" :value="item.value"
										:key="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
            <el-col :span="4">
							<el-form-item label="联系电话" prop="phone">
								<el-input @keydown.enter.native="search" @clear="search" clearable v-model="params.phone" placeholder="请输入联系电话" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="采集时间" prop="createData">
								<el-date-picker v-model="params.createData" class="w-100" type="daterange"
									format="yyyy-MM-dd" value-format="yyyy/MM/dd" range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期" @change="getValue('createData', 'createDate', 'createDateEnd', 'time')" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="更新时间" prop="modifyData">
								<el-date-picker v-model="params.modifyData" class="w-100" type="daterange"
									format="yyyy-MM-dd" value-format="yyyy/MM/dd" range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期" clearable @change="getValue('modifyData', 'modifyDate', 'modifyDataEnd', 'time')" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<div class="search_btns">
								<el-button type="primary" @click="search">搜索</el-button>
								<el-button @click="resetForm('params')">重置</el-button>
							</div>
						</el-col>
					</el-row>
				</el-form>
			</template>
			<template slot="main">
				<div class="contorl_container">
					<div class="contorl_title">信息列表</div>
					<div class="contorl_btns">
						<el-button type="text" @click="showConfirmDialog(multipleSelection)">确认</el-button>
						<el-button type="text" @click="mergeAlumni(multipleSelection)">合并</el-button>
						<el-button type="text"
							@click="showDerive(multipleSelection, '1')">导出</el-button>
					</div>
				</div>
				<Etable ref="tableRef" @selectLine="handleSelectionChange" selection height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData"
					:list-loading="loading" align="left">
					<template slot="index" slot-scope="{ data }">
						<span>{{ data.$index + 1 }}</span>
					</template>
					<template slot="birthday" slot-scope="{ data }">
						<div>
							{{ getBirthDay(data.row.birthday, '') || defaultSettings.defaultTableEmptyText }}
						</div>
					</template>
					<template slot="oldProvince" slot-scope="{ data }">
						<div v-if="(data.row.oldProvince && data.row.oldProvince.length) || (data.row.oldCity && data.row.oldCity.length)">
							{{ data.row.oldProvince || '' }} {{ data.row.oldCity || '' }}
						</div>
						<div v-else>{{ defaultSettings.defaultTableEmptyText }}</div>
					</template>
					<template slot="phone" slot-scope="{ data }">
						<div class="flex">
							<el-popover v-if="data.row.phone && data.row.phone.includes(',')" placement="bottom-start" width="200" trigger="hover"
								:content="data.row.phone.split(',').slice(1).join(', ')">
								<span class="cursor-pointer" slot="reference">{{ data.row.phone && data.row.phone.length ? `${data.row.phone.split(',')[0]}...` : defaultSettings.defaultTableEmptyText }}</span>
							</el-popover>
							<div v-else>{{ data.row.phone && data.row.phone.length ? data.row.phone.split(',')[0] : defaultSettings.defaultTableEmptyText }}</div>
						</div>
					</template>
					<template slot="operation" slot-scope="{ data }">
						<el-button type="text" size="small" @click="showConfirmDialog([data.row])">确认</el-button>
						<el-button type="text" size="small" @click="showDetail(data.row)">详情</el-button>
						<el-button class="del_text_btn" type="text" size="small" v-permission="'0'"
							@click="showDel(data.row)">删除</el-button>
					</template>
				</Etable>
			</template>
			<template slot="footer">
				<pagination-vue @getList="getList" :current-page.sync="params.page" :page-size.sync="params.pageSize"
					:total="total" />
			</template>
		</base-layout>

    <confirmDialog
      ref="confirmDialogRef"
      :current-alumni-list="currentAlumniList"
      :alumni-status="'confirming'"
      @getList="getList"
    />
  </div>
</template>

<script>
import {
  generList,
  politicalStatusList,
  highestDegreeList,
  workingStateList
} from '@/utils/dataOptions'
import {
  selectClassmateWaitconfirm
} from '@/api/alumniManagement'
import EmptyCom from '@/components/EmptyCom/index.vue'
import PaginationVue from '@/components/Pagination/index.vue'
import {
  deleteClassmate
} from '@/api/alumniManage/index'
import {
	defaultTableOption
} from './data/tableOption'

import { mapGetters } from 'vuex'
import confirmDialog from '@/views/alumniManagement/components/form/confirmDialog.vue'
import exportFile from '@/plugins/mixins/export'
import {
  cityList,
  alumniType,
  getList,
  mergeAlumni
} from '@/plugins/options'
export default {
  name: 'ConfirmingList',
  components: {
    PaginationVue,
    EmptyCom,
    confirmDialog
  },
  mixins: [
    alumniType,
    exportFile,
    cityList,
    getList,
    mergeAlumni
  ],
  computed: {
    ...mapGetters(['name'])
  },
  data() {
    return {
      // getList
      api: selectClassmateWaitconfirm,
      params: {
        classify: 1,
        name: '',
        sex: '',
        politics: '',
        phone: '',
        educationMax: '',
        type: '',
        attribute: '',
        company: '',
        department: '',
        position: '',
        workStatus: '',
        place: [],
        modifyData: [],
        createData: [],
        page: 1,
        pageSize: 10
      },
      paramsException: ['place', 'modifyData', 'createData'],
      // options
      workingStateList,
      highestDegreeList,
      politicalStatusList,
      generList,
	  tableHeadConfig: defaultTableOption,

      currentAlumniList: [],
      multipleSelection: []
    }
  },
  mounted() {
  },
  activated() {
    this.getList()
  },
  methods: {
    changeAlumniType(value) {
      this.params.attribute = ''
      this.getLabel({
        type: value,
        belong: 1
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    showDetail(row) {
      const { id } = row
      this.$router.push({
        path: '/alumniManagement/detail',
        query: {
          id,
          type: '1'
        }
      })
      // const routeUrl = this.$router.resolve({
      // 	path: '/alumniManagement/confirming/detail',
      // 	query: {
      // 		id
      // 	}
      // })
      // window.open(routeUrl.href, '_blank')
    },
    delClassmateById(id) {
      deleteClassmate(id).then((res) => {
        if (res.result) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.message || '删除失败')
        }
      })
    },
    showDel(row) {
      this.$confirm('删除信息后，系统中将无法查询此条信息，请确认是否删除?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const { id } = row
        // 删除
        this.delClassmateById(id)
      }).catch(() => {
        // 取消
      })
    },
    showConfirmDialog(list) {
      if (list?.length) {
        this.currentAlumniList = list
        this.$refs.confirmDialogRef.showDialog()
      } else {
        this.$message.warning('至少选择一条数据')
      }
    },
    resetForm(formName) {
      this.params.oldProvince = null
      this.params.oldCity = null
      this.params.createDate = null
      this.params.createDateEnd = null
      this.params.modifyDate = null
      this.params.modifyDataEnd = null
      this.$refs[formName].resetFields()
      this.getLabel()
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
