<template>
	<!-- 教育经历 -->
	<div class="word_record_form_container">
		<el-drawer :title="title" size="40%" :visible.sync="dialogVisible">
			<div class="draw_main">
				<el-form ref="changePersonRef" label-width="8em" :model="ruleForm">
					<el-row>
						<!-- 学校名称 -->
						<el-col :span="24">
							<el-form-item label="学校名称" prop="school" :rules="{
								required: true, message: '请输入学校名称', trigger: 'blur'
							}">
								<el-input clearable v-model="ruleForm.school" placeholder="请输入学校名称" />
							</el-form-item>
						</el-col>
						<!-- 教育时间 startTime endTime -->
						<el-col :span="24">
							<el-form-item label="教育开始时间" prop="startTime" :rules="{
								required: true, message: '教育开始时间不能为空', trigger: 'blur'
							}">
								<el-date-picker clearable class="w-100" v-model="ruleForm.startTime" format="yyyy-MM-dd"
									value-format="yyyy.MM.dd" type="date" placeholder="开始时间">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="教育结束时间" prop="endTime">
								<el-date-picker clearable class="w-100" v-model="ruleForm.endTime" format="yyyy-MM-dd"
									value-format="yyyy.MM.dd" type="date" placeholder="结束时间">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<!-- 专业 -->
						<el-col :span="24">
							<el-form-item label="专业" prop="major" :rules="{
								required: true, message: '请输入专业', trigger: 'blur'
							}">
								<el-input clearable v-model="ruleForm.major" placeholder="请输入专业" />
							</el-form-item>
						</el-col>
						<!-- 学历 -->
						<el-col :span="24">
							<el-form-item label="学历" prop="tag" :rules="{
								required: true, message: '请选择学历', trigger: 'blur'
							}">
								<el-select clearable v-model="ruleForm.tag" class="w-100" placeholder="请选择学历">
									<el-option v-for="item in highestDegreeList.slice(0, -1)" :key="item.label + item.value"
										:label="item.label" :value="item.value" />
								</el-select>
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
import { highestDegreeList } from "@/utils/dataOptions";
export default {
	name: "UnitForm",
	mixins: [],
	props: {
		data: {
			type: Object,
			default: null,
		},
		title: {
			type: String,
			default: "添加教育经历",
		},
	},
	data() {
		return {
			highestDegreeList,
			dialogVisible: false,
			ruleForm: {
				endTime: "",
				major: "",
				school: "",
				startTime: "",
				tag: "",
			},
		};
	},
	watch: {
		dialogVisible(newval, oldval) {
			if (this.data && newval) {
				const item = this.data;
				this.ruleForm = {
					...item,
				};
			} else {
				this.$refs.changePersonRef.resetFields()
				this.ruleForm = {
					endTime: "",
					major: "",
					school: "",
					startTime: "",
					tag: "",
				};
			}
		},
	},
	methods: {
		confirm() {
			this.$refs.changePersonRef.validate((valid) => {
				if (valid) {
					this.$emit("confirmUpdate", this.ruleForm);
					this.closeDialog();
				}
			})
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
<style lang="scss" scoped></style>
