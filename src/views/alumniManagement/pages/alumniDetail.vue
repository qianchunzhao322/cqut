<template>
  <div class="container">
    <div class="contorls_btn">
      <el-button v-if="type == '0' || type == '1'" :disabled="type == '1'" type="primary" class="contorl_btn confirm_btn" @click="pendingAlumni">待定</el-button>
      <el-button v-if="type == '0' || type == '1'" type="primary" class="contorl_btn confirm_btn" @click="confirmAlumni">确认</el-button>
      <el-button v-if="type == '2'" :disabled="unitDetail.update == 0" type="primary" class="contorl_btn confirm_btn" @click="updateAlumni">更新</el-button>
      <el-button v-if="type == '2'" type="primary" class="contorl_btn confirm_btn" @click="editAlumni">编辑</el-button>
      <el-button type="default" class="contorl_btn" @click="cancelFun">返回</el-button>
    </div>
    <div class="base_info">
      <div class="alumni_info_container">
        <preview-img :image-url="unitDetail.image" />
        <div class="alumni_info_content">
          <h1 class="alumni_name">{{ unitDetail.name }} <span v-if="unitDetail.sex" class="sex_icon"><i v-if="unitDetail.sex == '男'" class="boy_icon iconfont icon-a-bianzu43" /><i v-else class="girl_icon iconfont icon-a-bianzu44" /></span></h1>
          <p class="education">{{ unitDetail.educationMax }}</p>
          <p class="phone"><i class="iconfont icon-a-bianzu18" /> {{ unitDetail.phone && unitDetail.phone.split(',')[0] || '暂无' }}</p>
          <p class="email"><i class="iconfont icon-youxiang" /> {{ unitDetail.email && unitDetail.email.split(',')[0] || '暂无' }}</p>
        </div>
      </div>
      <div class="base_info_head">
        <div class="base_title">基础信息</div>
      </div>
      <div class="base_info_content">
        <div v-for="(item, index) in baseInfoValueMap" :key="item.label + index" class="base_info_item">
          <div class="base_info_label">{{ item.label }}：</div>
          <baseInfoValue :item="item" :unit-detail="unitDetail" />
        </div>
      </div>
    </div>
    <div class="unit_management_info">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="工作履历" name="1">
          <companyList :value-map="unitDetail.jsonMap" :list="unitDetail.classmateCompanyRecords" />
        </el-tab-pane>
        <el-tab-pane label="教育经历" name="2" class="education_list">
          <educationRecords :list="unitDetail.educationRecords" />
        </el-tab-pane>
        <el-tab-pane label="成果荣誉" name="3" class="education_list">
          <honorList :list="unitDetail.honors" />
        </el-tab-pane>
        <el-tab-pane label="相关资讯" name="4">
          <relatedInfo :list="list" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <confirmDialog
      ref="confirmDialogRef"
      :current-alumni-list="[unitDetail]"
      :alumni-status="'tobeconfirmed'"
      @getList="cancelFun"
    />
  </div>
</template>

<script>
// api
import {
  selectClassmateWaitconfirmById
} from '@/api/alumniManagement'
import {
  selectClassmateConfirmById
} from '@/api/alumniManage/alumniDatabase'
import {
  searchClassmateInfo
} from '@/api/alumniManage'
import {
	confirmClassmateWaitconfirm
} from '@/api/alumniManage/toBeConfirmed'
// components
import companyList from '@/views/alumniManagement/components/detail/companyList.vue'
import educationRecords from '@/views/alumniManagement/components/detail/educationRecords.vue'
import honorList from '@/views/alumniManagement/components/detail/honorList.vue'
import relatedInfo from '@/views/alumniManagement/components/detail/relatedInfo.vue'
import confirmDialog from '@/views/alumniManagement/components/form/confirmDialog.vue'
import baseInfoValue from '@/components/baseInfoValue'
export default {
  name: 'UnitDetail',
  components: {
    companyList,
    educationRecords,
    honorList,
    relatedInfo,
    confirmDialog,
    baseInfoValue
  },
  mixins: [],
  data() {
    return {
      activeName: '1',
      unitDetail: {},
      list: [],
      id: '',
      type: '',
      baseInfoValueMap: [
        {
          label: '姓名',
          name: 'name',
          copyabled: true
        },
        {
          label: '性别',
          name: 'sex'
        },
        {
          label: '出生日期',
          name: 'birthday',
          slot: 'birthday',
          copyabled: true
        },
        {
          label: '政治面貌',
          name: 'politics',
          copyabled: true
        },
        {
          label: '籍贯',
          name: 'oldCity',
          slot: 'oldCity',
          copyabled: true
        },
        {
          label: '现居住地',
          name: 'nowCity',
          slot: 'nowCity',
          copyabled: true
        },
        {
          label: '联系手机',
          name: 'phone',
          copyabled: true
        },
        {
          label: '联系邮箱',
          name: 'email'
        },
        {
          label: '联系地址',
          name: 'address'
        },
        {
          label: '最高学历',
          name: 'educationMax'
        },
        {
          label: '本校最高学历',
          name: 'education'
        },
        {
          label: '校友类型',
          name: 'typeName'
        },
        {
          label: '标签属性',
          name: 'attributeName'
        },
        {
          label: '单位',
          name: 'companyName',
          copyabled: true
        },
        {
          label: '职务',
          name: 'position',
          copyabled: true
        },
        {
          label: '工作状态',
          name: 'workStatus'
        },
        {
          label: '采集时间',
          name: 'collectTime'
        },
        {
          label: '更新时间',
          name: 'modifyDate'
        },
        {
          label: '入库时间',
          name: 'createDate'
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('app/closeShowSidebar')
    // type 0 待确认 1 确认中 2 校友库 3 非校友库
    const { id, type } = this.$route.query
    this.id = id
    this.type = type
    if (id) {
      this.getDetail(id, type)
    }
  },
  beforeDestroy() {
    this.$store.dispatch('app/toggleShowSidebar')
  },
  methods: {
    updateAlumni() {
      this.$router.push({
        path: '/alumniManagement/confirm',
        query: {
          type: '2', // md5
          id: this.unitDetail.md5,
          newId: this.id
        }
      })
    },
    editAlumni() {
      this.$router.push({
        path: '/alumniManagement/edit',
        query: {
          id: this.id,
          type: this.type
        }
      })
    },
    confirmAlumni() {
      this.$refs.confirmDialogRef.showDialog()
    },
    pendingAlumni(){
      this.$confirm('是否确认修改状态为待定?', '待定', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let ids = [this.id]
        confirmClassmateWaitconfirm({
          ids,
          modifyClassify: '1',
          attribute: '',
        }).then((res) => {
          if (res.result) {
            this.$message.success('修改成功')
            this.$router.back()
          }
        })
      }).catch(() => {
        // 取消
      })
    },
    cancelFun() {
      this.$router.go(-1)
    },
    previewImage() {
      this.$hevueImgPreview(this.unitDetail.image)
    },
    tabClick(val) {
      const { name } = val
      if (name === '4') {
        this.getInfo(this.id)
      }
    },
    getInfo(id) {
      this.$startLoading('related_information_container')
      searchClassmateInfo({
        classmateId: id,
        page: 1,
        pageSize: 10
      }).then((res) => {
        if (res.success) {
          this.list = res.data.list
        }
      }).finally(() => {
        this.$closeLoading('related_information_container')
      })
    },
    getDetail(id, type) {
      const method = type == '2' ? selectClassmateConfirmById : selectClassmateWaitconfirmById
      method(id).then((res) => {
        this.unitDetail = res.data
        if (type == '2') {
          this.unitDetail = {
            ...this.unitDetail,
            companyRecordsList: this.unitDetail.classmateCompanyRecords || []
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.title {

	cursor: pointer;

	.marke-red {
		font-size: 20px;
		color: #ff565d !important;
		text-decoration: underline;
		text-underline-offset: 5px;
		text-decoration-thickness: 1px;
	}
}
</style>

<style lang="scss" scoped>
.container {
	display: flex;
	padding: 0 20px;
	.contorls_btn{
		position: absolute;
		right: 20px;
		top: 0;
		align-items: center;
		height: 53px;
		display: flex;
	}

	.base_info {
		width: min(25%, 380px);
		height: 95%;
		background: #FCFDFE;
		border-radius: 4px;
		border: 1px solid #ECF0F8;
		display: flex;
		flex-direction: column;
		padding: 0 16px;

		.alumni_info_container {
			display: flex;
			padding: 20px 0;
			border-bottom: 1px solid #ECF0F8;

			.alumni_avatar {
				width: 90px;
				height: 90px;
				margin-right: 16px;
				cursor: pointer;
				position: relative;
				&:hover{
					.mask{
						display: block;
					}
				}
				.mask{
					width: 90px;
					height: 90px;
					position: absolute;
					left: 0;
					top: 0;
					background: rgba(0,0,0,0.27);
					// display: none;
					.lookBig{
						padding: 0 5px;
						font-size: 20px;
						position: absolute;
						right: 0;
						bottom: 0;
						color: #FFFFFF;
						&:hover{
							transform: scale(1.1);
						}
					}
				}
				img{
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}

			.alumni_info_content {
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.alumni_name {
					font-size: 18px;
					font-weight: bold;
					color: #272A31;
				}

				.education {
					font-size: 12px;
				}

				.phone,
				.email {
					font-size: 14px;
					color: #949699;
				}
			}
		}

		.base_info_head {
			height: 58px;
			display: flex;
			align-items: center;
			.base_title {
				padding-left: 7px;
				position: relative;
				&::before{
					content: "";
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 2px;
					height: 14px;
					background-color: #2488FF;
				}
			}
		}

		.base_info_content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: auto;

			.base_info_item {
				display: flex;
				margin-bottom: 24px;
				align-items: center;

				.base_info_label {
					width: 106px;
					font-size: 14px;
					color: #949699;
				}

				.base_info_value {
					font-size: 14px;
					color: #272A31;
					flex: 1;
				}
			}
		}
	}

	.unit_management_info {
		width: 0;
		height: 95%;
		flex: 1;
		margin-left: 16px;
		padding: 24px;
		background: #FCFDFE;
		border-radius: 4px;
		border: 1px solid #ECF0F8;

		::v-deep.el-tabs {
			height: 100%;
			display: flex;
			flex-direction: column;

			.el-tabs__content {
				flex: 1;
				overflow: auto !important;
			}
		}
	}
}</style>

