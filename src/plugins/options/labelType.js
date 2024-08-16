// 标签属性
import {
  selectLabel
} from '@/api/systemSettings/majorOpt'
export default {
  mounted() {
      this.getLabel()
  },
  data(){
      return {
          labelPropertieList: [], // 标签属性 
      }
  },
  methods: {
    // 标签属性
    async getLabel(params) {
      const param = {
          page: 1,
          pageSize: 999,
          ...params
      }
      return new Promise(async (resolve,reject)=>{
          await selectLabel(param).then((res) => {
              const { result, data } = res;
              this.labelPropertieList = result == 1 ? data : []
              resolve(res)
          })
      })
    }
  }
};
