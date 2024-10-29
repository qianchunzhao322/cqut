<template>
  <div class="container">
    <div class="contorls_btn">
      <!-- <el-button type="primary" class="contorl_btn confirm_btn" @click="editUnit">编辑</el-button> -->
      <el-button type="default" class="contorl_btn" @click="cancelFun">返回</el-button>
    </div>
    <div class="base_info">
      <div class="base_info_head">
        <div class="title">基础信息</div>
      </div>
      <div class="base_info_content">
        <div v-for="(item, index) in baseInfoValueMap" :key="item.name + index" class="base_info_item">
          <div class="base_info_label">{{ item.label }}：</div>
          <baseInfoValue :item="item" :unit-detail="unitDetail" />
        </div>
      </div>
    </div>
    <div class="unit_management_info">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="成绩情况" name="1">
          <Grade :message="unitDetail.courseId" />
        </el-tab-pane>
        <el-tab-pane label="学生教评" name="2">
          <Evaluate :message="unitDetail.courseId" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import baseInfoValue from '@/components/baseInfoValue'
import Grade from './components/grade.vue'
import Evaluate from './components/evaluate.vue'
import {
  selectCompanyById,
  selectCompanyClassmateById,
  selectCompanyProductById,
  searchUnitInfo
} from '@/api/courseScheduling'
export default {
  name: 'UnitDetail',
  components: {
    Grade,
    baseInfoValue,
    Evaluate
  },
  data() {
    return {
      activeName: '1',
      unitDetail: {
        courseName: '',
        courseId: '',
        courseLimit: '',
        courseHours: ''
      },
      companyClassmateList: [],
      mainProductsList: [],
      list: [],
      currentArticle: {},
      baseInfoValueMap: [
        {
          label: '课程名称',
          name: 'courseName',
          copyabled: true
        },
        {
          label: '课程编号',
          name: 'courseId',
          copyabled: true
        },
        {
          label: '课程人数限制',
          name: 'courseLimit'
        },
        {
          label: '课时要求',
          name: 'courseHours',
          copyabled: true
        }
      ]
    }
  },
  mounted() {
    const { courseId, courseName, courseLimit, courseHours } = this.$route.query
    this.unitDetail.courseId = courseId
    this.unitDetail.courseName = courseName
    this.unitDetail.courseLimit = courseLimit
    this.unitDetail.courseHours = courseHours
  },
  methods: {
    editUnit() {
      this.$router.push({
        path: '/unitManagement/unitform',
        query: {
          id: this.id
        }
      })
    },
    cancelFun() {
      this.$router.go(-1)
    },
    tabClick(val) {
      const { name } = val
      if (name === '3') {
        this.getInfo(this.name)
      }
    },
    getInfoDetail(item) {
      this.$refs.infoDetail.showDrawer()
      this.currentArticle = {
        ...item
      }
    },
    goExternalPage(item) {
      window.open(item.url, '_blank')
    },
    getInfo(id) {
      const targetElement = document.querySelector(`.related_information_container`)
      this.$startLoading('related_information_container')
      targetElement.setAttribute('style', 'overflow: hidden;')
      searchUnitInfo({
        company: id,
        page: 1,
        pageSize: 10
      }).then((res) => {
        if (res.success) {
          this.list = res.data.list
        }
      }).finally(() => {
        this.$closeLoading('related_information_container')
        targetElement.setAttribute('style', 'overflow: initial;')
      })
    },
    getCompanyProductById(id) {
      selectCompanyProductById(id).then((res) => {
        this.mainProductsList = res.data
      })
    },
    getUnitAlumni(id) {
      selectCompanyClassmateById(id).then((res) => {
        this.companyClassmateList = res.data
      })
    },
    getUnitDetail(id) {
      selectCompanyById(id).then((res) => {
        this.unitDetail = res.data
      })
    }
  }

}
</script>

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
		// width: 23.3vw;
		width: min(25%, 380px);
		height: 95%;
		background: #FCFDFE;
		border-radius: 4px;
		border: 1px solid #ECF0F8;

		.base_info_head {
			height: 58px;
			display: flex;
			align-items: center;

			.title {
				margin-left: 16px;
				padding-left: 7px;
				border-left: 2px solid #2488FF;
			}
		}

		.base_info_content {
			display: flex;
			flex-direction: column;
			padding: 0 17px;

			.base_info_item {
				display: flex;
				align-items: center;
				margin-bottom: 24px;

				.base_info_label {
					width: 106px;
					font-size: 14px;
					color: #949699;
				}

				.base_info_value {
					font-size: 14px;
					color: #272A31;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					flex: 1;
				}
			}
		}
	}

	.unit_management_info {
		width: 0;
		height: 95%;
		width: 0px;
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

		.alumni_status_list {
			display: flex;
			flex-direction: column;
			height: 100%;

			.alumni_status_item {
				max-height: 180px;
				display: flex;
				justify-content: center;
				flex-direction: column;

				// padding-bottom: 24px;
				&:not(:first-child) {
					border-top: 1px dashed #DEDEDE;
				}

				.item_head {
					display: flex;
					align-items: center;

					.el-button {
						font-size: 12px;
					}

					.item_type {
						font-weight: bold;
						width: 5em;
						margin: 0 8px;
						color: #272A31;
						font-size: 14px;
					}

					.title {
						text-overflow: ellipsis;
						white-space: nowrap;
						max-width: 40vw;
						height: 30px;
						line-height: 30px;
						font-size: 18px;
						overflow: hidden;
						text-decoration: underline;
						text-underline-offset: 5px;
						text-decoration-thickness: 1px;
					}
				}

				.item_content {
					line-height: 22px;
					font-size: 14px;
					color: #8f9299;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.item_foot {
					font-size: 12px;
					color: #9BA5BB;
					display: flex;
					height: 40px;
					align-items: center;

					.item_time {
						margin: 0 8px;
						line-height: 40px;

						.iconfont {
							color: #272A31;
							font-size: 12px;
							margin-right: 2px;
						}
					}

					.item_info {
						display: flex;

						.item_label {
							line-height: 40px;
							margin-right: 8px;
						}

						.item_value_list {
							display: flex;
							align-items: center;

							.item_value {
								color: #272A31;
								background-color: #F0F7FF;
								padding: 6px 12px;

								&:not(:first-child) {
									margin-left: 4px;
								}
							}
						}
					}
				}
			}
		}
	}
}</style>
