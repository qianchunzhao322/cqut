<template>
	<!-- 教育经历 -->
	<div class="word_record_form_container">
		<el-dialog :title="title" width="30%" :visible.sync="dialogVisible">
			<div class="draw_main">
				<el-form ref="changePersonRef" label-width="80px" :model="ruleForm">
					<el-row>
						<!-- 获奖时间 -->
						<el-col :span="24">
							<el-form-item label="获奖时间" prop="time" :rules="{
								required: true, message: '获奖时间不能为空', trigger: 'blur'
							}">
								<el-date-picker class="w-100" v-model="ruleForm.time" format="yyyy-MM-dd"
									value-format="yyyy/MM/dd" type="date" clearable placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<!-- 成果荣誉 -->
						<el-col :span="24">
							<el-form-item label="成果荣誉" prop="honorName" :rules="{
								required: true, message: '请输入成果荣誉', trigger: 'blur'
							}">
								<el-input clearable type="textarea" maxlength="20" rows="3" show-word-limit
									v-model.trim="ruleForm.honorName" placeholder="请输入成果荣誉" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<span slot="footer" class="draw_footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
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
			dialogVisible: false,
			ruleForm: {
				"honorName": "",
				"time": ""
			}
		};
	},
	watch: {
		dialogVisible(newval, oldval) {
			if (this.data && newval) {
				this.ruleForm = {
					...this.data,
				};
			} else {
				this.$refs.changePersonRef.resetFields()
				this.ruleForm = {
					"honorName": "",
					"time": ""
				}
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
