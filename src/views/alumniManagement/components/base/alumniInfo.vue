<template>
	<div class="base_info">
		<div class="base_info_content">
			<div class="base_info_item">
				<div class="base_info_label">头像：</div>
				<preview-img :imageUrl="unitDetail.image"/>
			</div>
			<div class="base_info_item" v-for="(item, index) in baseInfoValueMap" :key="item.label + index">
				<div class="base_info_label">{{ item.label }}：</div>
				<baseInfoValue :item="item" :unitDetail="unitDetail" />
			</div>
		</div>
	</div>
</template>

<script>
import baseInfoValue from '@/components/baseInfoValue'
export default {
	name: "UnitDetail",
	mixins: [],
	components: {
		baseInfoValue
	},
	props: {
		id: {
			type: String,
			default: "",
		},
		data: {
			type: Object,
			default: () => { }
		}
	},
	data() {
		return {
			unitDetail: {},
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
			]
		};
	},
	mounted() {
		this.unitDetail = this.data;
	},
	methods: {
	},
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;

	.base_info {
		width: 25vw;
		height: calc(100% - 88px);
		background: #fcfdfe;
		padding: 24px;
		border-radius: 4px;
		border: 1px solid #ecf0f8;
		display: flex;
		flex-direction: column;

		.base_info_content {
			display: flex;
			flex-direction: column;
			padding: 0 17px;
			flex: 1;
			overflow: auto;

			.base_info_item {
				display: flex;
				margin-bottom: 24px;

				.base_info_label {
					width: 106px;
					font-size: 14px;
					color: #949699;
				}

				.alumni_avatar {
					// width: 120px;
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
}</style>
