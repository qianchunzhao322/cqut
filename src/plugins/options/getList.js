// getList

export default {
    data() {
      return {
        autoLoad: true,
        params: {
        },
        correctParams: {},
        syncParamsToUrl: false,
        tableData: [], // 统一返回的数据对象
        total: 0, 
        api: null, // api接口的方法
        alias: {
            tableData: 'data',
            total: 'total'
        },
        loading: false,
        paramsException: [] // 过滤后端不需要的参数
      }
    },
    methods: {
      getValue(key, name1, name2, type){
        const [value1 = null, value2 = null] = this.params[key] || [];
        this.params = {
          ...this.params,
          [name1]: value1,
          [name2]: value2
        }
        if(!value1 && !value2){
          this.getList()
        }else if(type && type == 'time'){
          this.params[name1] = `${value1} 00:00:00`
          this.params[name2] = `${value2} 23:59:59`
        }
      },
      changeToCurrentParams(cb) {
        for (const key in this.params) {
          const nouseKey = this.paramsException.includes(key)
          if (!nouseKey) {
            if (this.alias[key]) {
              this.correctParams[this.alias[key]] = this.params[key]
            } else {
              this.correctParams[key] = this.params[key]
            }
          }
        }
        if (this.syncParamsToUrl) {
          this.$router.push({
            path: this.$route.path,
            query: this.params
          })
        }
        cb && cb()
      },
      search() {
        this.params.page = 1
        this.getList()
      },
      gotoPage(page, pageSize) {
        this.params.page = parseInt(page) || this.params.page
        this.params.pageSize = parseInt(pageSize) || this.params.pageSize
        this.getList()
      },
      getList() {
        this.tableData = [{
          courseName: '123',
          courseDay: '2024/7/8',
          courseInterval: ['09:30:00', '14:30:00'],
          courseTeacherId: '123563'
        },{
          courseName: '123'
        },
      ]
        // this.changeToCurrentParams(() => {
        //   if (!this.api) return
        //   this.loading = true
        //   this.multipleSelection = []
        //   this.$startLoading('inhert_main')
        //   const params = this.correctParams
        //   this.api(params)
        //     .then(res => {
        //       this.$closeLoading('inhert_main')
        //       this.loading = false
        //       if (this.dataCallBack) {
        //         this.dataCallBack(res)
        //       } else if (res.code === 200 || res.result === 1) {
        //         this.tableData = res[this.alias['tableData']]
        //         this.total = +res[this.alias['total']]
        //       }
        //     })
        //     .catch(() => {
        //       this.loading = false
        //     })
        // })
      }
    },
    mounted() {
      this.$nextTick(() => {
        const query = this.$route.query
        const params = this.$route.params
        const allParams = Object.assign({}, query, params)
        // 如果路由带有参数，则实例化会 params 对象中
        for (const key in allParams) {
          this.params[key] = /^\d+$/.test(allParams[key])
            ? parseInt(allParams[key])
            : allParams[key]
        }
        if (this.autoLoad) {
          this.getList()
        }
      })
    }
  }
  