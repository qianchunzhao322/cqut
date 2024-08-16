<template>
	<div class="related_information_container h-[100%]">
		<ul class="alumni_status_list" v-if="list && list.length != 0">
			<li class="alumni_status_item" v-for="(item, index) in list" :key="`info${index}`">
				<div class="item_head">
					<el-button v-if="item.url" type="text" @click="goExternalPage(item)">
						<i class="iconfont icon-chakanyuanwen"></i><span class="ml-[6px] mr-[10px]">查看原文</span></el-button>
					<div class="title" v-html="item.title" @click="getInfoDetail(item)"></div>
				</div>
				<div class="item_content" v-html="item.content"></div>
				<div class="item_foot">
					<span class="item_origin">{{ item.platform.websiteName }}</span>
					<span class="item_time">
						<i class="iconfont icon-xingzhuang" />
						{{ item.publishTime }}
					</span>
				</div>
			</li>
			<info-detail ref="infoDetail" :currentArticle="currentArticle" />
		</ul>
		<EmptyCom v-else />
	</div>
</template>

<script>
import infoDetail from '@/views/teacherGrade/components/common/infoDetail.vue'
import EmptyCom from "@/components/EmptyCom/index.vue";
export default {
	name: "mainProduct",
	components: {
		EmptyCom,
		infoDetail
	},
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			currentArticle: null,

		}
	},
	methods: {
		goExternalPage(item) {
			window.open(item.url, "_blank");
		},
		getInfoDetail(item) {
			this.$refs.infoDetail.showDrawer()
			this.currentArticle = {
				...item
			}

		},
	},
};
</script>

<style lang="scss" scoped>
.related_information_container {
	height: 100%;

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
				color: #162C5B;
				display: flex;
				height: 40px;
				align-items: center;

				.item_time {
					margin: 0 8px;
					line-height: 40px;

					.iconfont {
						color: #162C5B;
						font-size: 12px;
						margin-right: 2px;
					}
				}
			}
		}
	}
}</style>
