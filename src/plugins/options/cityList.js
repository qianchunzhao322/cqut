// 籍贯 / 所在地
import { getCity } from "@/api/common";
let _this;
export default {
	created() {
		_this = this;
	},
	async mounted() {
		const { data } = await this.getCityList();
		this.cityList = data.map((o)=>{
			return {
				...o,
				value: o.name
			}
		});
		this.cityList.push({
			name: '无',
			level: 1,
			id: -1,
			value: -1,
			leaf: true
		})
	},
	data() {
		return {
			cityList: [], // city
			cityCascaderOption: {
				expandTrigger: "click",
				// checkStrictly: true,
				label: "name",
				emitPath: true,
				value: "value",
				lazy: "true",
				lazyLoad(node, resolve) {
					const { label } = node;
					_this
						.getCityList({
							parentName: label,
						})
						.then((res) => {
							const { result, data } = res;
							if (result) {
								const nodes = data.map((o) => {
									return {
										...o,
										value: o.name,
										leaf: o.level > 1,
									};
								});
								nodes.unshift({
									name: '全部',
									value: '',
									leaf: true
								})
								resolve(nodes);
							}
						});
				},
			},
		};
	},
	methods: {
		getCityList(params) {
			return getCity(params);
		},
	},
};
