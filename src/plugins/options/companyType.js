// 单位类型
import {
  selectCompanyType
} from '@/api/systemSettings/unitType'

export default {
  mounted() {
      this.getCompanyType()
      this.getLabel({
        belong: 2
      })
  },
  data(){
      return {
          unitTypeList: [], // 单位类型
          labelTypeList: [], // 标签属性
      }
  },
  methods: {
		// 标签属性
		getLabel(params) {
			const param = {
				page: 1,
				pageSize: 999,
				...params
			}
		},
    // 单位类型
    async getCompanyType() {
      const param = {
          page: 1,
          pageSize: 999
      }
      await selectCompanyType(param).then((res) => {
          const { result, data } = res;
          this.unitTypeList = result == 1 ? data : []
          this.unitTypeList.push({
            label: '无',
            id: '-1'
          })
      })
    }
  }
};
