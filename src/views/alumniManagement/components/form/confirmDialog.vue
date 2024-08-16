<template>
	<div class="confirm_alumni_dialog_container">
		<el-dialog :modal-append-to-body="false" title="确认" :visible.sync="dialogVisible" width="400px"
			@closed="resetForm('confirmRef')">
			<el-form ref="confirmRef" :rules="formLabelAlign.modifyClassify == '2' || formLabelAlign.modifyClassify == '' ? NonAlumniRules : alumniRules " label-width="80px" :model="formLabelAlign">
				<el-form-item label="确认状态" prop="modifyClassify">
					<el-radio-group v-model="formLabelAlign.modifyClassify">
						<el-radio v-for="item in classifyList" :key="item.label" :label="item.label">{{ item.name
						}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="标签属性" prop="attribute">
					<el-cascader class="w-[100%]" v-model="formLabelAlign.attribute" placeholder="请选择标签属性"
						:options="alumniTypeListNoNull" :props="alumniCascaderOption" :show-all-levels="false"></el-cascader>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" :loading="confirmLoading" @click="confirmDialog">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import {
	confirmClassmateWaitconfirm
} from '@/api/alumniManage/toBeConfirmed'
import { alumniType, tagAttributeList } from '@/plugins/options'
export default {
	name: "confirmAlumniDialogContainer",
	mixins: [
		alumniType,
		tagAttributeList
	],
	props: {
		alumniStatus: {
			type: String,
			default: 'tobeconfirmed', // 待确认：tobeconfirmed |  确认中：confirming
		},
		currentAlumniList: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		classifyList() {
			// return this.alumniStatus == 'tobeconfirmed' ? this.modifyClassifyList : this.modifyClassifyList.slice(1)
			return this.modifyClassifyList
		}
	},
	data() {
		return {
			confirmLoading: false,
			modifyClassifyList: [
				// {
				// 	label: '1',
				// 	name: '确认中'
				// },
				{
					label: '2',
					name: '校友库'
				},
				{
					label: '3',
					name: '非校友库'
				},
			],
			alumniRules: {
				modifyClassify: [
					{ required: true, message: '请选择状态', trigger: 'change' },
				],
				attribute: [
					{ required: false, message: '请选择标签', trigger: 'change' }
				]
			},
			NonAlumniRules: {
				modifyClassify: [
					{ required: true, message: '请选择状态', trigger: 'change' },
				],
				attribute: [
					{ required: true, message: '请选择标签', trigger: 'change' }
				]
			},
			dialogVisible: false,
			formLabelAlign: {
				modifyClassify: '',
				attribute: '',
			},
		};
	},
	methods: {
		showDialog() {
			this.dialogVisible = true;
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		confirmDialog() {
			this.$refs.confirmRef.validate((valid) => {
				if (valid) {
					const ids = this.currentAlumniList.map((o) => o.id)
					this.confirmAlumniByIds(ids, this.formLabelAlign)
				}
			})
		},
		confirmAlumniByIds(ids, form) {
			this.confirmLoading = true;
			confirmClassmateWaitconfirm({
				ids,
				...form
			}).then((res) => {
				const { data, result } = res;
				if (result) {
					if (data && data.length != 0) {

					} else {
						this.$message.success('确认成功')
						this.confirmLoading = false;
						this.dialogVisible = false;
						this.$emit('getList')
					}
				} else {
					this.confirmLoading = false;
					this.dialogVisible = false;
					if (data?.length) {
						setTimeout(() => {
							let nameList = data.map(o => o.name)
							let name = nameList.length > 5 ? nameList.slice(0, 5).join(',') + '等' : nameList.join(',')
							this.$confirm(`${name}与校友库中存在相同信息，请单独处理`, '确认', {
								confirmButtonText: '确定',
								cancelButtonText: '取消'
							}).then(() => {
								// 确定
								if (nameList.length == 1) {
									this.$router.push({
										path: '/alumniManagement/confirm',
										query: {
											id: ids[0],
											newId: data[0].id,
											type: '1'
										}
									})
								}
							}).catch(() => {
								// 取消
							})
						}, 1000);
					}
				}
			})
		},
	},
};
</script>

<style lang="scss" scoped>
.confirm_alumni_dialog_container{
}
</style>
