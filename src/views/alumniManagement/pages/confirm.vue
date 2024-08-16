<template>
	<div class="container confirm_container">
		<base-layout>
			<template slot="main">
				<div class="form_container">
					<div class="form_head">
						<div class="head_left">
							<img src="@/assets/unitManagement/head_left.png" alt="" />
							<div class="form_head_title">基本信息</div>
						</div>
					</div>
					<div class="base_info_container flex">
						<el-form class="flex-1 left_container" label-width="8em">
							<el-row>
								<el-col :span="12">
									<el-form-item label="姓名：" prop="name">
										{{ alumniDetail.name || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="最高学历：" prop="province">
										{{ alumniDetail.educationMax || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="性别：" prop="label">
										{{ alumniDetail.sex || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="本校最高学历：" prop="province">
										{{ alumniDetail.education || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="出生日期：" prop="province">
										{{ getBirthDay(alumniDetail.birthday) || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="校友类型：" prop="category">
										{{ alumniDetail.typeName || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="政治面貌：" prop="category">
										{{ alumniDetail.politics || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="标签属性：" prop="category">
										{{ alumniDetail.attributeName || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="籍贯：" prop="category">
										{{ alumniDetail.oldProvince || '' }} {{ alumniDetail.oldCity || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="单位：" prop="price">
										{{ alumniDetail.companyName || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="现居住地：" prop="category">
										{{ alumniDetail.nowProvince || '' }} {{ alumniDetail.nowCity || '' }}
									</el-form-item>
								</el-col>
								<!-- <el-col :span="12">
									<el-form-item label="部门" prop="price">
										{{ alumniDetail.department || '' }}
									</el-form-item>
								</el-col> -->
								<el-col :span="12">
									<el-form-item label="联系手机：" prop="price">
										{{ alumniDetail.phone || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="职务：" prop="price">
										{{ alumniDetail.position || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="联系邮箱：" prop="price">
										{{ alumniDetail.email || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="工作状态：" prop="industry">
										{{ alumniDetail.workStatus || '' }}
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="联系地址：" prop="price">
										{{ alumniDetail.address || '' }}
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
						<el-form ref="ruleFormRef" :model="ruleForm" label-width="100px" class="demo_ruleForm flex-1">
							<el-row>
								<el-col :span="12">
									<el-form-item label="姓名" prop="name" :rules="{
										required: true, message: '请输入姓名', trigger: ['blur']
									}">
										<el-input disabled v-model="ruleForm.name" placeholder="请输入姓名" />
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="最高学历" prop="educationMax">
										<el-select v-model="ruleForm.educationMax" class="w-100" placeholder="请选择最高学历">
											<el-option v-for="item in highestDegreeList.slice(0, -1)" :key="item.value"
												:label="item.label" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="性别" prop="sex">
										<el-select v-model="ruleForm.sex" class="w-100" placeholder="请选择性别">
											<el-option v-for="item in generList.slice(0, -1)" :key="item.value"
												:label="item.label" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="本校最高学历" prop="education">
										<el-select v-model="ruleForm.education" class="w-100" placeholder="请选择本校最高学历">
											<el-option v-for="item in highestDegreeList.slice(0, -1)" :key="item.value"
												:label="item.label" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="出生日期" prop="birthday">
										<!-- <el-input v-model="ruleForm.birthday" placeholder="请输入出生日期" /> -->
										<el-date-picker class="w-100" format="yyyy-MM-dd" value-format="yyyy.MM.dd"
											v-model="ruleForm.birthday" type="date" placeholder="选择出生日期">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="校友类型" prop="type">
										<el-select @change="changeAlumniType" v-model="ruleForm.type" class="w-100"
											placeholder="请选择校友类型">
											<el-option v-for="item in alumniTypeList.slice(0, -1)" :key="item.id"
												:label="item.type" :value="item.id" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="政治面貌" prop="politics">
										<el-select v-model="ruleForm.politics" class="w-100" placeholder="请选择政治面貌">
											<el-option v-for="item in politicalStatusList.slice(0, -1)" :key="item.value"
												:label="item.label" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="标签属性" prop="attribute" :rules="{
										required: true, message: '请选择标签属性', trigger: ['blur', 'change']
									}">
										<el-select v-model="ruleForm.attribute" class="w-100" placeholder="请选择标签属性">
											<el-option v-for="item in labelTypeList.slice(0, -1)" :key="item.id"
												:label="item.attribute" :value="item.id" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="籍贯" prop="place">
										<el-cascader v-model="ruleForm.place" class="w-[100%]"
											:placeholder="getShowCityValue({ info: ruleForm, keys: ['oldProvince', 'oldCity'], defaultText: '请选择籍贯' })"
											:options="cityList" :props="cityCascaderOption"
											:show-all-levels="true"></el-cascader>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="单位" prop="companyName">
										<el-input disabled v-model="ruleForm.companyName" placeholder="请输入单位" />
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="现居住地" prop="nowPlace">
										<el-cascader v-model="ruleForm.nowPlace" class="w-[100%]"
											:placeholder="getShowCityValue({ info: ruleForm, keys: ['nowProvince', 'nowCity'], defaultText: '请选择现居住地' })"
											:options="cityList" :props="cityCascaderOption"
											:show-all-levels="true"></el-cascader>
									</el-form-item>
								</el-col>
								<!-- <el-col :span="12">
									<el-form-item label="部门" prop="department">
										<el-input disabled v-model="ruleForm.department" placeholder="请输入部门" />
									</el-form-item>
								</el-col> -->
								<el-col :span="12" v-for="(item, index) in ruleForm.phones" :key="'phone' + index">
									<el-form-item :label="`联系手机${index + 1}`" :prop="'phones.' + index" :rules="[
										{
											required: false,
											message: '请输入联系手机',
											trigger: ['blur', 'change'],
										},
										{
											pattern:
												/^1(3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/,
											message: '请输入正确的手机号',
											trigger: ['blur', 'change'],
										},
									]">
										<el-input v-model="ruleForm.phones[index]" placeholder="请输入联系手机">
											<div slot="suffix" class="input_contorl_btns">
												<i class="iconfont icon-tianjia" v-show="index === 0"
													@click.stop="addPhone" />
												<el-popconfirm title="是否确定删除？" @onConfirm="removePhone(index)">
													<i slot="reference" class="iconfont icon-a-xingzhuang2beifen" />
												</el-popconfirm>
											</div>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="职务" prop="position">
										<el-input disabled v-model="ruleForm.position" placeholder="请输入职务" />
									</el-form-item>
								</el-col>
								<el-col :span="12" v-for="(item, index) in ruleForm.emails" :key="'email' + index">
									<el-form-item :label="`联系邮箱${index + 1}`" :prop="'emails.' + index" :rules="[
										{
											required: false,
											message: '请输入联系邮箱',
											trigger: ['blur', 'change'],
										},
										{
											pattern: /\w+@[a-z0-9A-Z-_]+\.[a-zA-Z]{2,4}/,
											message: '请输入正确的邮箱',
											trigger: ['blur', 'change'],
										},
									]">
										<el-input v-model="ruleForm.emails[index]" placeholder="请输入联系邮箱">
											<div slot="suffix" class="input_contorl_btns">
												<i class="iconfont icon-tianjia" v-show="index === 0"
													@click.stop="addEmail" />
												<el-popconfirm title="是否确定删除？" @onConfirm="removeEmail(index)">
													<i slot="reference"
														class="iconfont icon-a-xingzhuang2beifen" />
												</el-popconfirm>
											</div>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="工作状态" prop="workStatus">
										<el-select v-model="ruleForm.workStatus" class="w-100" placeholder="请选择工作状态">
											<el-option v-for="item in workingStateList.slice(0, -1)" :key="item.value"
												:label="item.label" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="联系地址" prop="address">
										<el-input v-model="ruleForm.address" placeholder="请输入联系地址" />
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</div>
				</div>
				<editCompany ref="companyRef" :id="newId" :valueMap="ruleForm.jsonMap" :list="ruleForm.classmateCompanyRecords">
					<template v-slot:left>
						<div class="flex-1 left_container">
							<companyList :valueMap="alumniDetail.jsonMap" :list.sync="alumniDetail.companyRecordsList" />
						</div>
					</template>
				</editCompany>
				<editEducation ref="educationRef" :id="newId" :list="ruleForm.educationRecords">
					<template v-slot:left>
						<div class="flex-1 left_container">
							<educationRecords :list.sync="alumniDetail.educationRecords" />
						</div>
					</template>
				</editEducation>
				<editHonor ref="honorRef" :id="newId" :list="ruleForm.honors">
					<template v-slot:left>
						<div class="flex-1 left_container">
							<honorList :list.sync="alumniDetail.honors" />
						</div>
					</template>
				</editHonor>
			</template>
			<template slot="footer">
				<div class="contorl_btns w-[100%] justify-end flex j">
					<el-button type="default" @click="cancelUpdate">取消</el-button>
					<el-button type="primary" @click="confirmAlumni">确认</el-button>
				</div>
			</template>
		</base-layout>
	</div>
</template>

<script>
// api
import {
	selectClassmateWaitconfirmById
} from '@/api/alumniManagement'
import {
	selectClassmateConfirmById,
	updateClassmateByMD5
} from '@/api/alumniManage/alumniDatabase'
import {
	updateClassmateConfirm,
	selectClassmateUpdatedByMD5
} from '@/api/alumniManage/alumniDatabase'

// options
import {
	workingStateList,
	highestDegreeList,
	politicalStatusList,
	generList
} from "@/utils/dataOptions";

// plugins
import {
	cityList,
	alumniType
} from '@/plugins/options'

// components
import companyList from "@/views/alumniManagement/components/detail/companyList.vue";
import editCompany from '@/views/alumniManagement/components/form/editCompany.vue'
import editHonor from '@/views/alumniManagement/components/form/editHonor.vue'
import honorList from "@/views/alumniManagement/components/detail/honorList.vue";
import educationRecords from "@/views/alumniManagement/components/detail/educationRecords.vue";
import editEducation from '@/views/alumniManagement/components/form/editEducation.vue'
export default {
	name: "UnitForm",
	mixins: [
		cityList,
		alumniType
	],
	components: {
		editEducation,
		educationRecords,
		honorList,
		editHonor,
		editCompany,
		companyList
	},
	data() {
		return {
			workingStateList,
			highestDegreeList,
			generList,
			politicalStatusList,
			id: "",
			newId: '',
			ruleForm: {
				otherName: "",
				name: "",
				province: "",
				label: "",
				category: "",
				attribute: '',
				price: "",
				industry: "",
				birthday: '',
				phones: [''],
				emails: ['']
			}, // 校友库
			alumniDetail: {}, // 待确认的数据
			alumniDetailJSONStr: '',
			type: ''
		};
	},
	mounted() {
		// type '1': confirm '2': update
		const { id, newId, type } = this.$route.query;
		if (id) {
			this.id = id;
			this.type = type;
			if (type == '1') {
				this.getDetail(id)
			} else {
				this.getDetailByMD5(id)
			}
		}
		if (newId) {
			this.newId = newId
			this.getAlumniDetail(newId)
		}
	},
	methods: {
		changeAlumniType(value, isClear = true) {
			isClear && this.$set(this.ruleForm, 'attribute', '')
			this.getLabel({
				type: value,
				belong: 1
			})
		},
		addPhone() {
			if (this.ruleForm.phones.length >= 3) {
				this.$message.warning('最多添加三个')
			} else {
				this.ruleForm.phones.push('')
			}
		},
		removePhone(index) {
			if (this.ruleForm.phones.length == 1) {
				this.ruleForm.phones = ['']
			} else {
				this.ruleForm.phones.splice(index, 1);
			}
		},
		addEmail() {
			if (this.ruleForm.emails.length >= 3) {
				this.$message.warning('最多添加三个')
			} else {
				this.ruleForm.emails.push('')
			}
		},
		removeEmail(index) {
			if (this.ruleForm.emails.length == 1) {
				this.ruleForm.emails = ['']
			} else {
				this.ruleForm.emails.splice(index, 1);
			}
		},

		getDetailByMD5(md5) {
			selectClassmateUpdatedByMD5(md5).then((res) => {
				this.alumniDetail = {
					...res.data,
					companyRecordsList: res.data.classmateCompanyRecords
				};
			})
		},

		getAlumniDetail(id) {
			selectClassmateConfirmById(id).then((res) => {
				if (res.data?.attribute?.length) {
					this.changeAlumniType(res.data.attribute, false)
				}
				this.ruleForm = {
					...res.data,
					phones: res.data.phone?.length ? res.data.phone.split(',') : [''],
					emails: res.data.email?.length ? res.data.email.split(',') : [''],
				}
				this.alumniDetailJSONStr = JSON.stringify(this.ruleForm)

			})
		},

		getDetail(id) {
			selectClassmateWaitconfirmById(id).then((res) => {
				this.alumniDetail = res.data;
			})
		},

		confirmAlumni() {
			this.$refs.ruleFormRef.validate((valid) => {
				if (valid) {
					const companyList = this.$refs.companyRef.classmateCompanyRecords
					const educationList = this.$refs.educationRef.educationList
					const honorList = this.$refs.honorRef.honorList
					let param = {
						...this.ruleForm,
						classmateCompanyRecords: companyList || [],
						classmateHonors: honorList || [],
						classmateEducationRecords: educationList || [],
						honors: honorList || [],
						educationRecords: educationList || [],
						targetId: this.alumniDetail.id,

						oldProvince: this.ruleForm.place && this.ruleForm.place[0] || '',
						oldCity: this.ruleForm.place && this.ruleForm.place[1] || '',
						nowProvince: this.ruleForm.nowPlace && this.ruleForm.nowPlace[0] || '',
						nowCity: this.ruleForm.nowPlace && this.ruleForm.nowPlace[1] || '',
						click: JSON.stringify(this.ruleForm) != this.alumniDetailJSONStr ? 1 : 0
					}
					let method;
					let query;
					if (this.type == '1') {
						method = updateClassmateConfirm;
						query = param
					} else {
						method = updateClassmateByMD5
						query = {
							data: param,
							id: this.alumniDetail.id
						}
					}
					method(query).then((res) => {
						if (res.result) {
							this.$message.success('操作成功')
							this.$router.back()
						}
					})
				}
			})
		},
		cancelUpdate() {
			this.$router.back()
		},
	},
};
</script>
<style lang="scss">
.confirm_container {
	.inhert_main {
		overflow: auto;
	}
}
</style>
<style lang="scss" scoped>
.container {
	.form_container {
		padding: 0 24px;
		background: #fcfdfe;
		border-radius: 4px;
		border: 1px solid #ecf0f8;
		margin-bottom: 14px;

		.form_head {
			height: 55px;
			border-bottom: 1px solid #eceef5;
			display: flex;
			font-size: 14px;
			align-items: center;
			justify-content: space-between;

			.head_left {
				display: flex;
				align-items: center;
			}

			img {
				width: 10px;
				height: 17px;
				margin-right: 4px;
			}
		}


		.base_info_container {
			.demo_ruleForm {
				padding: 30px 10px;
			}

			.left_container,
			.right_container {
				padding: 30px;
			}

			.left_container {
				border-right: 1px solid #ecf0f8;
			}

			.timeline_title {
				margin-bottom: 10px;
				color: #2488ff;
				font-size: 14px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.contorl_btns {
					display: flex;

					.contorl_btn {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 22px;
						height: 22px;
						border-radius: 4px;
						color: #162C5B;
						cursor: pointer;

						&:hover {
							background: #ECF0FE;
							color: #2488FF;
						}
					}
				}

				.btn_edit {
					margin-right: 5px;
				}

				.btn_del {}
			}

			.card_item {
				width: calc(100% - 20px);
				height: 183px;

				::v-deep.el-card__body {
					height: 100%;

					.el-row {
						display: flex;
						flex-wrap: wrap;

						.card_item_field {
							align-items: center;

							.label {
								width: 5em;
							}

							.value {
								max-width: 90%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
					}
				}
			}
		}
	}
}
</style>
