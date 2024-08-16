<template>
	<div class="container">
		<base-layout>
			<template slot="header">
				<el-form ref="params" :model="params" label-width="6em" class="demo_ruleForm">
					<el-row>
						<el-col :span="4">
							<el-form-item label="姓名" prop="name">
								<el-input @clear="search" @keydown.enter.native="search" clearable v-model="params.name"
									placeholder="请输入姓名" />
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
								<el-cascader clearable v-model="params.place" placeholder="请选择籍贯" class="w-[100%]"
									:options="cityList" :props="cityCascaderOption" :show-all-levels="true"
									@change="getValue('place', 'oldProvince', 'oldCity')"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="政治面貌" prop="politics">
								<el-select @clear="search" clearable v-model="params.politics" class="w-100"
									placeholder="请选择政治面貌">
									<el-option v-for="item in politicalStatusList" :key="item.label + item.value"
										:label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="4">
							<el-form-item label="最高学历" prop="educationMax">
								<el-select @clear="search" clearable v-model="params.educationMax" class="w-100"
									placeholder="请选择最高学历">
									<el-option v-for="item in highestDegreeList" :key="item.label + item.value"
										:label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="校友类型" prop="type">
								<el-select @clear="search" @change="changeAlumniType" clearable v-model="params.type"
									class="w-100" placeholder="请选择校友类型">
									<el-option v-for="item in alumniTypeList" :key="item.id" :label="item.type"
										:value="item.id" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="标签属性" prop="attribute">
								<el-select @clear="search" clearable v-model="params.attribute" class="w-100"
									placeholder="请选择标签属性">
									<el-option v-for="item in labelTypeList" :key="item.id" :label="item.attribute"
										:value="item.id" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="单位" prop="companyName">
								<el-input @keydown.enter.native="search" @clear="search" clearable
									v-model="params.companyName" placeholder="请输入单位" />
							</el-form-item>
						</el-col>
						<!-- <el-col :span="4">
							<el-form-item label="部门" prop="department">
								<el-input clearable v-model="params.department" placeholder="请输入部门" />
							</el-form-item>
						</el-col> -->
						<el-col :span="4">
							<el-form-item label="职务" prop="position">
								<el-input @keydown.enter.native="search" @clear="search" clearable v-model="params.position"
									placeholder="请输入职务" />
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="工作状态" prop="workStatus">
								<el-select @clear="search" clearable v-model="params.workStatus" class="w-100"
									placeholder="请选择工作状态">
									<el-option v-for="item in workingStateList" :label="item.label" :value="item.value"
										:key="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="更新情况" prop="workStatus">
								<el-select @clear="search" clearable v-model="params.workStatus" class="w-100"
									placeholder="请选择更新情况">
									<el-option v-for="item in updateStatusList" :key="item.value" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="联系电话" prop="phone">
								<el-input @keydown.enter.native="search" @clear="search" clearable v-model="params.phone"
									placeholder="请输入联系电话" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="采集时间" prop="createData">
								<el-date-picker v-model="params.createData" class="w-100" type="daterange"
									format="yyyy-MM-dd" value-format="yyyy/MM/dd" range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期"
									@change="getValue('createData', 'createDate', 'createDateEnd', 'time')" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="更新时间" prop="modifyData">
								<el-date-picker v-model="params.modifyData" class="w-100" type="daterange"
									format="yyyy-MM-dd" value-format="yyyy/MM/dd" range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期" clearable
									@change="getValue('modifyData', 'modifyDate', 'modifyDataEnd', 'time')" />
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
					<div class="contorl_title">信息列表 <i class="iconfont" :class="!isGrid ? 'icon-liebiao' : 'icon-kapian'" @click="isGrid = !isGrid"></i> </div>
					<div class="contorl_btns">
						<el-checkbox
							v-if="isGrid"
							:indeterminate="isIndeterminate"
							v-model="checkAll"
							@change="handleCheckAllChange"
							>全选</el-checkbox
						>
						<el-button type="text" @click="showDerive(multipleSelection, 'alumni_database')">导出</el-button>
					</div>
				</div>
				<Etable v-if="!isGrid" ref="tableRef" @sortChange="sortChange" @selectLine="handleSelectionChange" selection height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData"
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
						<div
							v-if="(data.row.oldProvince && data.row.oldProvince.length) || (data.row.oldCity && data.row.oldCity.length)">
							{{ data.row.oldProvince || '' }} {{ data.row.oldCity || '' }}
						</div>
						<div v-else>{{ defaultSettings.defaultTableEmptyText }}</div>
					</template>
					<template slot="phone" slot-scope="{ data }">
						<div class="flex">
							<el-popover v-if="data.row.phone && data.row.phone.includes(',')" placement="bottom-start"
								width="200" trigger="hover" :content="data.row.phone.split(',').slice(1).join(', ')">
								<span class="cursor-pointer" slot="reference">{{ data.row.phone && data.row.phone.length ?
									`${data.row.phone.split(',')[0]}...` : defaultSettings.defaultTableEmptyText }}</span>
							</el-popover>
							<div v-else>{{ data.row.phone && data.row.phone.length ? data.row.phone.split(',')[0] :
								defaultSettings.defaultTableEmptyText }}</div>
						</div>
					</template>
					<template slot="operation" slot-scope="{ data }">
						<el-button type="text" size="small" @click="editAlumni(data.row)">编辑</el-button>
						<el-button :disabled="data.row.update == 0" type="text" size="small"
							@click="updateAlumni(data.row)">更新</el-button>
						<el-button type="text" size="small" @click="showDetail(data.row)">详情</el-button>
						<el-button class="del_text_btn" type="text" size="small" v-permission="'0'"
							@click="showDel(data.row)">删除</el-button>
					</template>
				</Etable>
				<!-- 卡片列表 -->
				<div class="card_list_container" v-else>
					<alumniCardList :selectedList="multipleSelection" @select="handleSelectionChange" :pageSize="params.pageSize" type="2" :list="tableData" @edit="editAlumni" @update="updateAlumni" @detail="showDetail" @delete="showDel" />
				</div>
			</template>
			<template slot="footer">
				<pagination-vue :pageSizes="pageSizes" @getList="getList" :current-page.sync="params.page" :page-size.sync="params.pageSize"
					:total="total" />
			</template>
		</base-layout>
	</div>
</template>

<script>
import {
	generList,
	politicalStatusList,
	highestDegreeList,
	workingStateList,
	updateStatusList
} from '@/utils/dataOptions'
import alumniCardList from '@/views/alumniManagement/components/detail/alumniCardList.vue'
import {
	alumniTableOption
} from './data/tableOption'
import exportFile from '@/plugins/mixins/export'

import {
	selectClassmateConfirm,
	deleteClassmateConfirm,
	exportClassmate
} from '@/api/alumniManage/alumniDatabase'
import EmptyCom from '@/components/EmptyCom/index.vue'
import PaginationVue from '@/components/Pagination/index.vue'
import { mapGetters } from 'vuex'
import {
	cityList,
	alumniType,
	getList
} from '@/plugins/options'
export default {
	name: 'AlumniDatabaseList',
	components: {
		PaginationVue,
		EmptyCom,
		alumniCardList
	},
	mixins: [
		alumniType,
		cityList,
		getList,
		exportFile
	],
	computed: {
		...mapGetters(['name'])
	},
	watch: {
		isGrid(newValue, oldValue) {
			if(newValue){
				this.params.pageSize = 12;
				this.pageSizes = [12]
			}else{
				this.params.pageSize = 10;
				this.pageSizes = [10, 20, 50, 100, 200]
			}
			this.getList()
		},
		multipleSelection(newval){
			if(newval?.length){
				this.checkAll = newval.length == this.params.pageSize
				this.isIndeterminate = newval.length > 0 && newval.length < this.params.pageSize
			}else{
				this.checkAll = false;
				this.isIndeterminate = false;
			}
		}
	},
	data() {
		return {
			checkAll: false,
			isIndeterminate: false,
			isGrid: false,
			pageSizes: [10, 20, 50, 100, 200],
			// getList
			api: selectClassmateConfirm,
			params: {
				classify: 0,
				name: '',
				sex: '',
				politics: '',
				phone: '',
				educationMax: '',
				type: '',
				attribute: '',
				companyName: '',
				department: '',
				position: '',
				workStatus: '',
				place: [],
				modifyData: [],
				createData: [],
				workStatus: '',
				page: 1,
				pageSize: 10,
				orderName: 'modifyDate',
				orderType: 'desc'
			},
			paramsException: ['place', 'modifyData', 'createData'],
			// options
			workingStateList,
			highestDegreeList,
			politicalStatusList,
			generList,
			updateStatusList,
			tableHeadConfig: alumniTableOption,

			multipleSelection: []
		}
	},
	mounted() {
	},
	activated() {
		this.getList()
	},
	methods: {
		sortChange(column){
			const { prop, order } = column
			let orderName = prop && prop.length ? prop : 'modifyDate';
			let orderType = 'desc'
			if(order?.length){
				orderType = order == "ascending" ? "asc" : "desc";
			}else{
				orderName = 'modifyDate'
			}
			this.params = {
				...this.params,
				orderType,
				orderName
			}
			this.getList()
		},
		// 全选
		handleCheckAllChange(val){
			console.log(val)
			if(this.isIndeterminate){
				// 接下来 全选
				this.multipleSelection = this.tableData.slice(0)
			}else{
				this.multipleSelection = val ? this.tableData.slice(0) : []
			}
		},
		changeAlumniType(value) {
			this.params.attribute = ''
			this.getLabel({
				type: value,
				belong: 1
			})
		},
		updateAlumni(row) {
			const { id, md5 } = row
			this.$router.push({
				path: '/alumniManagement/confirm',
				query: {
					type: '2', // md5
					id: md5,
					newId: id
				}
			})
		},
		editAlumni(row) {
			const { id } = row
			// const routeUrl = this.$router.resolve({
			// 	path: '/alumniManagement/alumniDatabase/edit',
			// 	query: {
			// 		id,
			// 		type: 1
			// 	}
			// })
			// window.open(routeUrl.href, '_blank')
			this.$router.push({
				path: '/alumniManagement/edit',
				query: {
					id,
					type: '2'
				}
			})
		},
		handleSelectionChange(val) {
			this.multipleSelection = val
		},
		showDetail(row) {
			const { id } = row
			// const routeUrl = this.$router.resolve({
			// 	path: '/alumniManagement/alumniDatabase/detail',
			// 	query: {
			// 		id,
			// 		type: '2'
			// 	}
			// })
			// window.open(routeUrl.href, '_blank')
			this.$router.push({
				path: '/alumniManagement/detail',
				query: {
					id,
					type: '2'
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
				deleteClassmateConfirm(id + '').then((res) => {
					if (res.result) {
						this.$message.success('删除成功')
						this.getList()
					}
				})
			}).catch(() => {
				// 取消
			})
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

<style lang="scss" scoped>
</style>
