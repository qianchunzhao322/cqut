// 合并校友
import {
  hasDuplicate
} from '@/utils/index'
export default {
  mounted() {
  },
  data(){
      return {
      }
  },
  methods: {
    checkMergeName(list){
      const namelist = list.map(o=>o.name)
      const res = hasDuplicate(namelist)
      if(!res){
        this.$message.warning('姓名不同，不可合并')
        this.$refs.tableRef.clearSelection()
      }
      return res;
    },
    async mergeAlumni(list){
      if(list?.length){
        if(list.length == 2 || list.length == 3){
          if(this.checkMergeName(list)){
            const ids = list.map(o=>o.id)
            this.$router.push({
              path: '/alumniManagement/merge',
              query: {
                ids,
                form: '2'
              }
            })
          }
        }else{
          let message = list.length < 2 ? '至少选择两条数据' : '最多选择三条数据'
          this.$message.warning(message)
          return ;
        }
      }else{
        this.$message.warning('至少选择两条数据')
        return ;
      }
    },
  }
};
