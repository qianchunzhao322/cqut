<template>
	<div class="edit_base_info">
		<div class="base_info_container flex">
			<el-form ref="ruleFormRef" :model="alumniDetail" label-width="8em" class="base_Form flex-1">
				<el-row>
					<el-col :span="24">
						<el-form-item label="头像" prop="name">
							<div class="flex items-end">
								<el-upload class="avatar_uploader" action accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG"
									:on-error="fileError" :http-request="httpRequest" ref="imageUploadRef"
									:show-file-list="false" :on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">
									<div class="upload_image_container">
										<div class="upload_image_btn image_btn" v-show="!imageUrl">
											<i class="el-icon-upload"></i>
											<div class="el-upload__text">点击上传照片</div>
										</div>
										<div class="image_container" id="imgTooles">
											<preview-img v-show="imageUrl" :imageUrl="imageUrl" />
										</div>
									</div>
								</el-upload>
								<div class="contorl_btns" v-show="imageUrl">
									<i class="iconfont icon-shangchuan" @click.stop="handleClickUploadImage"></i>
									<i class="iconfont icon-a-xingzhuang2beifen" @click.stop="deleteImage"></i>
								</div>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="姓名" prop="name" :rules="{
							required: true, message: '请输入姓名', trigger: ['blur', 'change']
						}">
							<el-input disabled v-model="alumniDetail.name" placeholder="请输入姓名" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="性别" prop="sex" :rules="{
							required: true, message: '请选择性别', trigger: ['blur', 'change']
						}">
							<el-select v-model="alumniDetail.sex" class="w-100" placeholder="请选择性别">
								<el-option v-for="item in generList.slice(0, -1)" :key="item.value" :label="item.label"
									:value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="出生日期" prop="birthday" :rules="{
							required: true, message: '选择出生日期', trigger: ['blur', 'change']
						}">
							<!-- <el-input v-model="alumniDetail.birthday" placeholder="请输入出生日期" /> -->
							<el-date-picker class="w-100" format="yyyy-MM-dd" value-format="yyyy.MM.dd"
								v-model="alumniDetail.birthday" type="date" placeholder="选择出生日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="政治面貌" prop="politics" :rules="{
							required: false, message: '请选择政治面貌', trigger: ['blur', 'change']
						}">
							<el-select v-model="alumniDetail.politics" class="w-100" placeholder="请选择政治面貌">
								<el-option v-for="item in politicalStatusList.slice(0, -1)" :key="item.value"
									:label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="籍贯" prop="place" :rules="{
							required: true, message: '请选择籍贯', trigger: ['blur', 'change']
						}">
							<el-cascader v-model="alumniDetail.place" class="w-[100%]"
								:placeholder="getShowCityValue({ info: alumniDetail, keys: ['oldProvince', 'oldCity'], defaultText: '请选择籍贯' })"
								:options="cityList" :props="cityCascaderOption" :show-all-levels="true"></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="现居住地" prop="nowPlace" :rules="{
							required: false, message: '请选择现居住地', trigger: ['blur', 'change']
						}">
							<el-cascader v-model="alumniDetail.nowPlace" class="w-[100%]"
								:placeholder="getShowCityValue({ info: alumniDetail, keys: ['nowProvince', 'nowCity'], defaultText: '请选择籍贯' })"
								:options="cityList" :props="cityCascaderOption" :show-all-levels="true"></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="24" v-for="(item, index) in alumniDetail.phones" :key="'phone' + index">
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
							<el-input v-model="alumniDetail.phones[index]" placeholder="请输入联系手机">
								<div slot="suffix" class="input_contorl_btns">
									<i class="iconfont icon-tianjia" v-show="index === 0" @click.stop="addPhone" />
									<el-popconfirm title="是否确定删除？" @onConfirm="removePhone(index)">
										<i slot="reference" class="iconfont icon-a-xingzhuang2beifen" />
									</el-popconfirm>
								</div>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24" v-for="(item, index) in alumniDetail.emails" :key="'email' + index">
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
							<el-input v-model="alumniDetail.emails[index]" placeholder="请输入联系邮箱">
								<div slot="suffix" class="input_contorl_btns">
									<i class="iconfont icon-tianjia" v-show="index === 0" @click.stop="addEmail" />
									<el-popconfirm title="是否确定删除？" @onConfirm="removeEmail(index)">
										<i slot="reference" class="iconfont icon-a-xingzhuang2beifen" />
									</el-popconfirm>
								</div>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="联系地址" prop="address" :rules="{
							required: false, message: '请输入联系地址', trigger: ['blur', 'change']
						}">
							<el-input v-model="alumniDetail.address" placeholder="请输入联系地址" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="最高学历" prop="educationMax" :rules="{
							required: false, message: '请选择最高学历', trigger: 'change'
						}">
							<el-select v-model="alumniDetail.educationMax" class="w-100" placeholder="请选择最高学历">
								<el-option v-for="item in highestDegreeList.slice(0, -1)" :key="item.value"
									:label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="本校最高学历" prop="education" :rules="{
							required: false, message: '请选择本校最高学历', trigger: ['blur', 'change']
						}">
							<el-select v-model="alumniDetail.education" class="w-100" placeholder="请选择本校最高学历">
								<el-option v-for="item in highestDegreeList.slice(0, -1)" :key="item.value"
									:label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="校友类型" prop="type" :rules="{
							required: true, message: '请选择校友类型', trigger: ['blur', 'change']
						}">
							<el-select @change="changeAlumniType" v-model="alumniDetail.type" class="w-100"
								placeholder="请选择校友类型">
								<el-option v-for="item in alumniTypeList.slice(0, -1)" :key="item.id" :label="item.type"
									:value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="标签属性" prop="attribute" :rules="{
							required: true, message: '请选择标签属性', trigger: ['blur', 'change']
						}">
							<el-select clearable v-model="alumniDetail.attribute" class="w-100" placeholder="请选择标签属性">
								<el-option v-for="item in labelTypeList.slice(0, -1)" :key="item.id" :label="item.attribute"
									:value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="确认类型" prop="classify" :rules="{
							required: true, message: '请选择确认类型', trigger: ['blur', 'change']
						}">
							<el-select v-model="alumniDetail.classify" class="w-100" placeholder="请选择确认类型">
								<el-option v-for="item in classList" :key="item.value" :label="item.label"
									:value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="control_btns">
			<el-button type="primary" @click="confirmMerge">确认</el-button>
			<el-button type="default" @click="cancelMerge">取消</el-button>
		</div>
	</div>
</template>
  
<script>
// plugins
import {
	cityList,
	alumniType
} from '@/plugins/options'
// options
import {
	highestDegreeList,
	politicalStatusList,
	generList,
	classifyList
} from "@/utils/dataOptions";
// api
import {
	uploadImage
} from '@/api/alumniManage/index'
export default {
	name: "UnitForm",
	mixins: [
		cityList,
		alumniType
	],
	components: {
	},
	computed: {
		classList() {
			return this.classifyList
		}
	},
	props: {
		data: {
			type: Object,
			default: () => { }
		},
		form: {
			type: String,
			default: '1'
		}
	},
	watch: {
		data: {
			handler(newval, oldval) {
				this.setData()
			},
			deep: true
		}
	},
	data() {
		return {
			highestDegreeList,
			generList,
			politicalStatusList,
			classifyList,
			imageUrl: '',
			imageFile: null,
			id: "",
			alumniDetail: {
				phones: [''],
				emails: [''],
			}
		};
	},
	mounted() {
		this.setData()
	},
	methods: {
		changeAlumniType(value, isClear = true) {
			isClear && this.$set(this.alumniDetail, 'attribute', '')
			this.getLabel({
				type: value,
				belong: 1
			})
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file);
		},
		beforeAvatarUpload(file) {
			// const isJPG = file.type === 'image/jpeg';
			const isLt1M = file.size / 1024 / 1024 < 1;

			// if (!isJPG) {
			// Message.error('上传图标只能是 JPG 格式!');
			// }
			if (!isLt1M) {
				Message.error('上传图标大小不能超过 1MB!');
			}
			return isLt1M;
		},
		httpRequest(option) {
			this.imageUrl = URL.createObjectURL(option.file);
			this.imageFile = option.file;
		},
		fileError(resp) {
			Message.error("文件上传失败");
		},
		deleteImage() {
			this.imageUrl = ''
			this.imageFile = null
			this.$refs.imageRef.doClose()
		},
		handleClickUploadImage() {
			this.$refs.imageUploadRef.$children[0].$refs.input.click()
		},
		setData() {
			if (this.data?.type?.length) {
				this.changeAlumniType(this.data.type, false)
			}
			this.alumniDetail = {
				...this.data,
				classify: undefined,
				phones: this.data.phone?.length ? this.data.phone.split(',') : [''],
				emails: this.data.email?.length ? this.data.email.split(',') : [''],
			};
			this.imageUrl = this.data.image?.length ? this.data.image : ''

			this.$refs.ruleFormRef.resetFields()
		},
		addPhone() {
			if (this.alumniDetail.phones.length >= 3) {
				this.$message.warning('最多添加三个')
			} else {
				this.alumniDetail.phones.push('')
			}
		},
		removePhone(index) {
			if (this.alumniDetail.phones.length == 1) {
				this.alumniDetail.phones = ['']
			} else {
				this.alumniDetail.phones.splice(index, 1);
			}
		},
		addEmail() {
			if (this.alumniDetail.emails.length >= 3) {
				this.$message.warning('最多添加三个')
			} else {
				this.alumniDetail.emails.push('')
			}
		},
		removeEmail(index) {
			if (this.alumniDetail.emails.length == 1) {
				this.alumniDetail.emails = ['']
			} else {
				this.alumniDetail.emails.splice(index, 1);
			}
		},
		uploadImageFun() {
			let file = new FormData()
			file.append('file', this.imageFile)
			return uploadImage(file)
		},
		async confirmMerge() {
			if (this.imageFile) {
				// new image
				const res = await this.uploadImageFun()
				if (res.result) {
					this.imageUrl = res.data;
				} else {
					this.$message.error('上传头像失败')
				}
			}
			this.$refs.ruleFormRef.validate((valid) => {
				if (valid) {
					const form = {
						...this.alumniDetail,
						phone: this.alumniDetail.phones.join(','),
						email: this.alumniDetail.emails.join(','),
						oldProvince: this.alumniDetail.place[0] || '',
						oldCity: this.alumniDetail.place[1] || '',
						nowProvince: this.alumniDetail.nowPlace && this.alumniDetail.nowPlace[0] || '',
						nowCity: this.alumniDetail.nowPlace && this.alumniDetail.nowPlace[1] || '',
						image: this.imageUrl
					}
					this.$emit('confirm-merge', form)
				}
			})
		},
		cancelMerge() {
			this.$router.back()
		}
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
.edit_base_info {
	width: 25vw;
	background: #fcfdfe;
	// padding: 24px;
	border-radius: 4px;
	margin-left: 10px;

	.control_btns{
		height: 88px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.base_info_container {
		border: 1px solid #ecf0f8;
		padding: 24px;
		overflow: auto;
		height: calc(100% - 88px);
		overflow-x: hidden;

		.contorl_btns {
			height: 30px;

			.iconfont {
				margin-left: 10px;
				cursor: pointer;
			}

		}

		.avatar_uploader {
			width: 50%;

			::v-deep.el-upload {
				width: 100%;
			}

			.upload_image_container {
				width: 100%;
				// border: 1px dotted #D9D9D9;
				border: 1px dashed transparent;
				padding: 20px 0;
				background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-45deg, #ccc 0, #ccc .25em, white 0, white .75em);
				border-radius: 4px;

				.upload_image_btn {
					color: #BFC4CD;

					.el-icon-upload {
						font-size: 50px;
					}
				}

				.image_container {
					display: flex;
					align-items: center;
					justify-content: center;

					img {
						width: 120px;
						height: 120px;
						object-fit: contain;
					}
				}
			}
		}
	}
}
</style>
  