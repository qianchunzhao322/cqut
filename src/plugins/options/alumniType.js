// 校友类型
import {
  selectAlumniType
} from '@/api/systemSettings/userOpt'

export default {
  mounted() {
    this.getAlumniType()
    this.getLabel({
      belong: 1
    })
  },
  data() {
    return {
      alumniTypeList: [], // 校友类型
      labelTypeList: [] // 标签属性
    }
  },
  computed: {
    alumniTypeListNoNull() {
      return this.alumniTypeList.slice(0, -1)
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
    // 校友类型
    async getAlumniType() {
      const param = {
        page: 1,
        pageSize: 999
      }
      await selectAlumniType(param).then((res) => {
        const { result, data } = res
        this.alumniTypeList = result === 1 ? data : []

        this.alumniTypeList.push({
          'id': '-1',
          'type': '无'
        })
      })
    }
  }
}
