<template>
	<div class="word_record_form_container">
		<el-drawer :title="title" size="40%" :visible.sync="dialogVisible">
			<div class="draw_main">
				<el-form ref="changePersonRef" label-width="8em" :model="ruleForm">
					<el-row>
						<!-- 单位名称 -->
						<el-col :span="24">
							<el-form-item label="单位名称" prop="companyName" :rules="{
								required: true, message: '请输入单位名称', trigger: 'blur'
							}">
								<el-input clearable maxlength="40" :disabled="!!data" v-model="ruleForm.companyName"
									placeholder="请输入单位名称" />
							</el-form-item>
						</el-col>
						<!-- 任职时间 -->
						<!-- TODO: 时间解析还是有问题 -->
						<el-col :span="24">
							<el-form-item label="任职开始时间" prop="startTime" :rules="{
								required: false, message: '任职开始时间不能为空', trigger: 'blur'
							}">
								<el-date-picker clearable class="w-100" v-model="ruleForm.startTime" format="yyyy-MM-dd"
									value-format="yyyy.MM.dd" type="date" placeholder="开始时间">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="任职结束时间" prop="endTime">
								<el-date-picker clearable class="w-100" v-model="ruleForm.endTime" format="yyyy-MM-dd"
									value-format="yyyy.MM.dd" type="date" placeholder="结束时间">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<!-- 任职部门 -->
						<!-- <el-col :span="24">
							<el-form-item label="任职部门" prop="department" :rules="{
								required: true, message: '请输入任职部门', trigger: 'blur'
							}">
								<el-input clearable maxlength="20" v-model="ruleForm.department" placeholder="请输入任职部门" />
							</el-form-item>
						</el-col> -->
						<!-- 任职岗位 -->
						<el-col :span="24">
							<el-form-item label="任职岗位" prop="position" :rules="{
								required: true, message: '请输入任职岗位', trigger: 'blur'
							}">
								<el-input clearable maxlength="20" v-model="ruleForm.position" placeholder="请输入任职岗位" />
							</el-form-item>
						</el-col>
						<!-- 所在地 province city -->
						<el-col :span="24">
							<el-form-item label="所在地" prop="place" :rules="{
								required: true, message: '请选择所在地', trigger: ['blur', 'change']
							}">
								<el-cascader clearable v-model="ruleForm.place" placeholder="请选择所在地" class="w-[100%]"
									:placeholder="getShowCityValue({ info: ruleForm, keys: ['province', 'city'], defaultText: '请选择所在地' })"
									:options="cityList" :props="cityCascaderOption" :show-all-levels="true"></el-cascader>
							</el-form-item>
						</el-col>
						<!-- 单位类型 -->
						<el-col :span="24">
							<el-form-item label="单位类型" prop="typeObject" :rules="{
								required: true, message: '请选择单位类型', trigger: ['blur', 'change']
							}">
								<el-select @change="changeUnitType" clearable v-model="ruleForm.typeObject" class="w-100"
									placeholder="请选择单位类型" value-key="id">
									<el-option v-for="item in unitTypeList.slice(0, -1)" :key="item.id" :label="item.label"
										:value="item" />
								</el-select>
							</el-form-item>
						</el-col>
						<!-- 标签属性 -->
						<el-col :span="24">
							<el-form-item label="标签属性" prop="attributeObject" :rules="{
								required: true, message: '请选择标签属性', trigger: ['blur', 'change']
							}">
								<el-select value-key="id" clearable v-model="ruleForm.attributeObject" class="w-100"
									placeholder="请选择标签属性">
									<el-option v-for="item in labelTypeList.slice(0, -1)" :key="item.id"
										:label="item.attribute" :value="item" />
								</el-select>
							</el-form-item>
						</el-col>
						<!-- 别称 -->
						<el-col :span="24" v-for="(item, index) in ruleForm.otherNames" :key="'otherName' + index">
							<el-form-item :label="'别称' + index" :prop="'otherNames.' + index" :rules="{
								required: false, message: '请输入别称', trigger: 'blur'
							}">
								<el-input maxlength="20" v-model="ruleForm.otherNames[index]" placeholder="请输入别称">
									<div slot="suffix" class="input_contorl_btns">
										<i class="iconfont icon-tianjia" v-show="index === 0" @click.stop="addOtherName" />
										<el-popconfirm title="是否确定删除？" @onConfirm="removeOtherName(index)">
											<i slot="reference" class="iconfont icon-a-xingzhuang2beifen" />
										</el-popconfirm>
									</div>
								</el-input>
							</el-form-item>
						</el-col>
						<!-- 行业类型 -->
						<el-col :span="24">
							<el-form-item label="行业类型" prop="industryObject" :rules="{
								required: false, message: '请选择行业类型', trigger: 'blur'
							}">
								<el-select clearable v-model="ruleForm.industryObject" class="w-100" placeholder="请选择行业类型"
									value-key="id">
									<el-option v-for="item in industryTypeList.slice(0, -1)" :key="item.id"
										:label="item.label" :value="item" />
								</el-select>
							</el-form-item>
						</el-col>
						<!-- 市值 -->
						<el-col :span="24">
							<el-form-item label="市值" prop="price" :rules="{
								required: false, message: '请输入市值', trigger: 'blur'
							}">
								<el-input clearable v-model="ruleForm.price" placeholder="请输入市值" />
							</el-form-item>
						</el-col>
						<!-- 主营产品 -->
						<el-col :span="24" v-for="(item, index) in ruleForm.mainProducts" :key="'mainProduct' + index">
							<el-form-item :label="'主营产品' + index" :prop="'mainProducts.' + index" class="main_product"
								:rules="{
									required: false, message: '请输入主营产品', trigger: 'blur'
								}">
								<el-input clearable :rows="5" type="textarea" maxlength="50" show-word-limit
									v-model="ruleForm.mainProducts[index]" placeholder="请输入主营产品">
								</el-input>
								<div class="input_contorl_btns flex justify-end">
									<i class="iconfont icon-tianjia" v-show="index === 0" @click.stop="addMainProduct" />
									<el-popconfirm title="是否确定删除？" @onConfirm="removeMainProduct(index)">
										<i slot="reference" class="iconfont icon-a-xingzhuang2beifen" />
									</el-popconfirm>
								</div>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<span class="draw_footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-drawer>
	</div>
</template>

<script>
import {
	cityList,
	companyType,
	inductryType,
} from '@/plugins/options'
export default {
	name: "UnitForm",
	mixins: [
		cityList,
		companyType,
		inductryType,
	],
	props: {
		data: {
			type: Object,
			default: null,
		},
		title: {
			type: String,
			default: '添加工作履历'
		}
	},
	data() {
		return {
			dialogVisible: false,
			ruleForm: {
				otherName: '',
				companyName: '',
				province: '',
				label: '',
				category: '',
				price: '',
				industry: '',
				otherNames: [''],
				mainProducts: [''],
				place: [],
				startTime: null,
				endTime: null,
				typeObject: {},
				type: '',
				position: '',
				attributeObject: null,
			},
		};
	},
	watch: {
		dialogVisible(newval, oldval) {
			if (this.data && newval) {
				if (this.data?.type?.length) {
					this.changeUnitType({ id: this.data.type }, false)
				}
				this.ruleForm = {
					...this.data,
					otherNames: this.data.otherName?.length ? this.data.otherName.split(',') : [''],
					mainProducts: this.data.productList?.length ? this.data.productList : [''],
					typeObject: {
						id: this.data.type,
						label: this.data.typeName
					},
					attributeObject: {
						id: this.data.attribute,
						typeName: this.data.attributeName
					},
					industryObject: {
						id: this.data.industry,
						label: this.data.industryName
					},
					place: [
						this.data.province || '',
						this.data.city || ''
					],
				}
			} else {
				this.ruleForm = {
					otherName: '',
					companyName: '',
					province: '',
					label: '',
					category: '',
					price: '',
					industry: '',
					otherNames: [''],
					mainProducts: [''],
					place: [],
					startTime: null,
					endTime: null,
					typeObject: {},
					type: '',
					position: '',
					attributeObject: null,
				}
				this.$nextTick(() => {
					this.$refs.changePersonRef.resetFields()
				})
			}
		}
	},
	mounted() {
	},
	methods: {
		changeUnitType(value, isClear = true) {
			isClear && this.$set(this.ruleForm, 'attributeObject', null)
			this.getLabel({
				type: value.id,
				belong: 2
			})
		},
		change() {
			const [{ value, label }] = this.$refs.attributeRef.getCheckedNodes()
			this.ruleForm.attributeObject = {
				id: value,
				typeName: label
			}
		},
		confirm() {
			this.$refs.changePersonRef.validate((valid) => {
				if (valid) {
					// 处理数据
					const {
						otherNames,
						mainProducts
					} = this.ruleForm
					if (otherNames?.length) {
						this.ruleForm.otherName = otherNames.join(',')
					}
					if (mainProducts?.length) {
						this.ruleForm.products = mainProducts.join(',')
						this.ruleForm.productList = mainProducts
					}
					let params = {
						...this.ruleForm,
						province: this.ruleForm.place[0] || '',
						city: this.ruleForm.place[1] || '',
						type: this.ruleForm.typeObject.id,
						typeName: this.ruleForm.typeObject.label,
						attribute: this.ruleForm.attributeObject.id,
						attributeName: this.ruleForm.attributeObject.typeName,
						industry: this.ruleForm.industryObject?.id || null,
						industryName: this.ruleForm.industryObject?.label || null
					}
					this.$emit('confirmUpdate', params)
					this.closeDialog()
				}
			})
		},
		removeOtherName(index) {
			if (this.ruleForm.otherNames.length == 1) {
				this.ruleForm.otherNames = ['']
			} else {
				this.ruleForm.otherNames.splice(index, 1);
			}
		},
		removeMainProduct(index) {
			if (this.ruleForm.mainProducts.length == 1) {
				this.ruleForm.mainProducts = ['']
			} else {
				this.ruleForm.mainProducts.splice(index, 1);
			}
		},
		addOtherName() {
			if (this.ruleForm.otherNames.length >= 3) {
				this.$message.warning("最多添加三个");
			} else {
				this.ruleForm.otherNames.push("");
			}
		},
		addMainProduct() {
			if (this.ruleForm.mainProducts.length >= 10) {
				this.$message.warning("最多添加十个");
			} else {
				this.ruleForm.mainProducts.push("");
			}
		},
		showDialog() {
			this.dialogVisible = true;
		},
		closeDialog() {
			this.dialogVisible = false;
		},
		resetForm(name) {
			this.$refs[name].resetFields();
		},
	},
};
</script>
<style lang="scss" scoped>
.main_product {
	position: relative;
	margin-bottom: 40px;

	.input_contorl_btns {
		position: absolute;
		right: 0;
		width: 100%;
	}
}
</style>
