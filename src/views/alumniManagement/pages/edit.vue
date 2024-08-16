<template>
	<div class="container confirm_container">
		<div class="contorls_btn">
			<el-button type="primary" @click="confirmAlumni">确认</el-button>
			<el-button type="default" @click="cancelUpdate">取消</el-button>
		</div>
		<base-layout footerHeight="0">
			<template slot="main">
				<div class="form_container">
					<div class="form_head">
						<div class="head_left">
							<img src="@/assets/unitManagement/head_left.png" alt="" />
							<div class="form_head_title">基本信息</div>
						</div>
					</div>
					<div class="base_info_container flex">
						<el-form ref="ruleFormRef" :model="alumniDetail" label-width="150px" class="base_Form flex-1">
							<el-row>
								<el-col :span="24">
									<el-form-item label="头像" prop="name">
										<div class="flex items-end">
											<el-upload class="avatar_uploader" action
												accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG" :on-error="fileError"
												:http-request="httpRequest" ref="imageUploadRef" :show-file-list="false"
												:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
												<div class="upload_image_container">
													<div class="upload_image_btn image_btn" v-show="!imageUrl">
														<i class="el-icon-upload"></i>
														<div class="el-upload__text">点击上传照片</div>
													</div>
													<div class="image_container" id="imgTooles">
														<img v-show="imageUrl" :src="imageUrl" class="avatar"
															@click.stop="previewImg(imageUrl)">
													</div>
												</div>
											</el-upload>
											<div class="contorl_btns" v-show="imageUrl">
												<i class="iconfont icon-shangchuan"
													@click.stop="handleClickUploadImage"></i>
												<i class="iconfont icon-a-xingzhuang2beifen" @click.stop="deleteImage"></i>
											</div>
										</div>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="姓名" prop="name" :rules="{
										required: true,
										message: '请输入姓名',
										trigger: 'blur',
									}">
										<el-input clearable disabled v-model="alumniDetail.name" placeholder="请输入姓名" />
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="最高学历" prop="educationMax">
										<el-select clearable v-model="alumniDetail.educationMax" class="w-100"
											placeholder="请选择最高学历">
											<el-option v-for="item in highestDegreeList.slice(0, -1)" :key="item.value"
												:label="item.label" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="性别" prop="sex" :rules="{
										required: true,
										message: '请选择性别',
										trigger: 'blur',
									}">
										<el-select clearable v-model="alumniDetail.sex" class="w-100" placeholder="请选择性别">
											<el-option v-for="item in generList.slice(0, -1)" :key="item.value"
												:label="item.label" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="本校最高学历" prop="education">
										<el-select clearable v-model="alumniDetail.education" class="w-100"
											placeholder="请选择本校最高学历">
											<el-option v-for="item in highestDegreeList.slice(0, -1)" :key="item.value"
												:label="item.label" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<!-- TODO: 日期解析有问题 -->
									<el-form-item label="出生日期" prop="birthday" :rules="{
										required: false,
										message: '请输入出生日期',
										trigger: 'blur',
									}">
										<!-- <el-input clearable v-model="alumniDetail.birthday" placeholder="请输入出生日期" /> -->
										<el-date-picker class="w-100" format="yyyy-MM-dd" value-format="yyyy.MM.dd"
											v-model="alumniDetail.birthday" type="date" placeholder="选择出生日期">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="校友类型" prop="type" :rules="{
										required: true,
										message: '请选择校友类型',
										trigger: 'blur',
									}">
										<el-select @change="changeAlumniType" clearable v-model="alumniDetail.type"
											class="w-100" placeholder="请选择校友类型">
											<el-option v-for="item in alumniTypeList.slice(0, -1)" :key="item.id"
												:label="item.type" :value="item.id" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="政治面貌" prop="politics" :rules="{
										required: false,
										message: '请选择政治面貌',
										trigger: 'blur',
									}">
										<el-select clearable v-model="alumniDetail.politics" class="w-100"
											placeholder="请选择政治面貌">
											<el-option v-for="item in politicalStatusList.slice(0, -1)" :key="item.value"
												:label="item.label" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="标签属性" prop="attribute" :rules="{
										required: true,
										message: '请选择标签属性',
										trigger: 'blur',
									}">
										<el-select clearable v-model="alumniDetail.attribute" class="w-100"
											placeholder="请选择标签属性">
											<el-option v-for="item in labelTypeList.slice(0, -1)" :key="item.id"
												:label="item.attribute" :value="item.id" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="籍贯" prop="place" :rules="{
										required: true,
										message: '请选择籍贯',
										trigger: 'blur',
									}">
										<el-cascader clearable v-model="alumniDetail.place"
											:placeholder="getShowCityValue({ info: alumniDetail, keys: ['oldProvince', 'oldCity'], defaultText: '请选择籍贯' })"
											class="w-[100%]" :options="cityList" :props="cityCascaderOption"
											:show-all-levels="true"></el-cascader>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="单位" prop="companyName">
										<el-input clearable disabled v-model="alumniDetail.companyName"
											placeholder="请输入单位" />
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="现居住地" prop="nowPlace">
										<el-cascader clearable v-model="alumniDetail.nowPlace" placeholder="请选择现居住地"
											class="w-[100%]" :options="cityList" :props="cityCascaderOption"
											:show-all-levels="true"></el-cascader>
									</el-form-item>
								</el-col>
								<!-- <el-col :span="12">
									<el-form-item label="部门" prop="department">
										<el-input clearable disabled v-model="alumniDetail.department"
											placeholder="请输入部门" />
									</el-form-item>
								</el-col> -->
								<el-col :span="12" v-for="(item, index) in alumniDetail.phones" :key="'phone' + index">
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
										<el-input clearable disabled v-model="alumniDetail.position" placeholder="请输入职务" />
									</el-form-item>
								</el-col>
								<el-col :span="12" v-for="(item, index) in alumniDetail.emails" :key="'email' + index">
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
												<i class="iconfont icon-tianjia" v-show="index === 0"
													@click.stop="addEmail" />
												<el-popconfirm title="是否确定删除？" @onConfirm="removeEmail(index)">
													<i slot="reference" class="iconfont icon-a-xingzhuang2beifen" />
												</el-popconfirm>
											</div>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="工作状态" prop="workStatus">
										<el-select clearable v-model="alumniDetail.workStatus" class="w-100"
											placeholder="请选择工作状态">
											<el-option v-for="item in workingStateList.slice(0, -1)" :key="item.value"
												:label="item.label" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="联系地址" prop="address">
										<el-input clearable maxlength="100" v-model="alumniDetail.address"
											placeholder="请输入联系地址" />
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</div>
				</div>
				<editCompany ref="companyRef" :id="id" :valueMap="alumniDetail.jsonMap" :list="alumniDetail.companyRecordsList" />
				<editEducation ref="educationRef" :id="id" :list="alumniDetail.educationRecords" />
				<editHonor ref="honorRef" :id="id" :list="alumniDetail.honors" />
			</template>
		</base-layout>
	</div>
</template>

<script>
// api
import { selectClassmateWaitconfirmById } from "@/api/alumniManagement";
import { updateClassmateConfirm } from "@/api/alumniManage/alumniDatabase";
import { selectClassmateConfirmById } from "@/api/alumniManage/alumniDatabase";
import {
	uploadImage
} from '@/api/alumniManage/index'
// options
import {
	workingStateList,
	highestDegreeList,
	politicalStatusList,
	generList,
} from "@/utils/dataOptions";
// components
import editCompany from '@/views/alumniManagement/components/form/editCompany.vue'
import editEducation from '@/views/alumniManagement/components/form/editEducation.vue'
import editHonor from '@/views/alumniManagement/components/form/editHonor.vue'
// plugins
import {
	cityList,
	alumniType
} from "@/plugins/options";
export default {
	name: "UnitForm",
	mixins: [
		cityList,
		alumniType
	],
	components: {
		editCompany,
		editEducation,
		editHonor
	},
	data() {
		return {
			workingStateList,
			highestDegreeList,
			generList,
			politicalStatusList,
			imageUrl: '',
			imageFile: null,
			id: "",
			alumniDetail: {},
			alumniDetailJSONStr: ''
		};
	},
	async mounted() {
		const { id, type } = this.$route.query;
		if (id) {
			this.id = id;
			this.getDetail(id, type);
		}
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
		addEmail() {
			if (this.alumniDetail.emails.length >= 3) {
				this.$message.warning("最多添加三个");
			} else {
				this.alumniDetail.emails.push("");
			}
		},
		removeEmail(index) {
			if (this.alumniDetail.emails.length == 1) {
				this.alumniDetail.emails = [""];
			} else {
				this.alumniDetail.emails.splice(index, 1);
			}
		},
		addPhone() {
			if (this.alumniDetail.phones.length >= 3) {
				this.$message.warning("最多添加三个");
			} else {
				this.alumniDetail.phones.push("");
			}
		},
		removePhone(index) {
			if (this.alumniDetail.phones.length == 1) {
				this.alumniDetail.phones = [""];
			} else {
				this.alumniDetail.phones.splice(index, 1);
			}
		},
		getDetail(id, type) {
			const method =
				type == '2' ? selectClassmateConfirmById : selectClassmateWaitconfirmById;
			method(id).then((res) => {
				const { classmateCompanyRecords, phone, email } = res.data;

				if (res.data?.type?.length) {
					this.changeAlumniType(res.data.type, false)
				}

				this.alumniDetail = {
					...res.data,
					companyRecordsList: classmateCompanyRecords?.length
						? classmateCompanyRecords
						: [],
					phones: phone?.length ? phone.split(",") : [""],
					emails: email?.length ? email.split(",") : [""],
					place: [
						res.data.oldProvince || '',
						res.data.oldCity || ''
					]
				};
				this.alumniDetailJSONStr = JSON.stringify(this.alumniDetail)
				this.imageUrl = res.data.image || ''
			});
		},
		uploadImageFun() {
			let file = new FormData()
			file.append('file', this.imageFile)
			return uploadImage(file)
		},
		confirmAlumni() {
			this.$refs.ruleFormRef.validate(async (valid) => {
				if (valid) {
					if (this.imageFile) {
						// new image
						const res = await this.uploadImageFun()
						if (res.result) {
							this.imageUrl = res.data;
						} else {
							this.imageUrl = ''
							this.$message.error('上传头像失败')
						}
					}
					const companyList = this.$refs.companyRef.classmateCompanyRecords
					const educationList = this.$refs.educationRef.educationList
					const honorList = this.$refs.honorRef.honorList

					let param = {
						...this.alumniDetail,
						classmateCompanyRecords: companyList || [],
						classmateHonors: honorList || [], // 这个不起作用
						honors: honorList || [], // 这个起作用
						classmateEducationRecords: educationList || [], // 这个不起作用
						educationRecords: educationList || [], // 这个起作用
						targetId: 0,
						oldProvince: this.alumniDetail.place
							? this.alumniDetail.place[0]
							: "",
						oldCity: this.alumniDetail.place ? this.alumniDetail.place[1] : "",
						nowProvince: this.alumniDetail.nowPlace
							? this.alumniDetail.nowPlace[0]
							: "",
						nowCity: this.alumniDetail.nowPlace
							? this.alumniDetail.nowPlace[1]
							: "",
						image: this.imageUrl
					};
					delete param.companyRecordsList;
					delete param.place
					if(JSON.stringify(this.alumniDetail) != this.alumniDetailJSONStr){
						updateClassmateConfirm(param).then((res) => {
							if (res.result) {
								this.$message.success("修改成功");
								this.$router.back();
							}
						});
					}else{
						this.$message.success("修改成功");
						this.$router.back();
					}
				}
			});
		},
		cancelUpdate() {
			this.$router.back();
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
	.contorls_btn {
		position: absolute;
		right: 20px;
		top: 0;
		align-items: center;
		height: 53px;
		display: flex;
	}

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
			.base_Form {
				padding: 30px 123px;

				.contorl_btns {
					height: 30px;

					.iconfont {
						margin-left: 10px;
						cursor: pointer;
					}

				}

				.avatar_uploader {
					width: 12%;

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
	}
}
</style>
