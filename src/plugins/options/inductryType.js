// 行业类型
import {
  selectIndustryType
} from '@/api/systemSettings/courseOpt'
export default {
  mounted() {
    this.getIndustryType()
  },
  data() {
    return {
      industryTypeList: [] // 行业类型
    }
  },
  methods: {
    // 行业类型
    async getIndustryType() {
      const param = {
        page: 1,
        pageSize: 999
      }
      await selectIndustryType(param).then((res) => {
        const { result, data } = res
        this.industryTypeList = result == 1 ? data : []
        this.industryTypeList.push({
          label: '无',
          id: '-1'
        })
      })
    }
  }
}
