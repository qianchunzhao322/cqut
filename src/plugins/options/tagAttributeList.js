// 标签属性
import {
  labelType
} from '@/plugins/options'
let _this;
export default {
  mixins: [
    labelType
  ],
  created() {
    _this = this;
  },
  data() {
    return {
      cityList: [], // city
      alumniCascaderOption: {
        expandTrigger: "click",
        label: "type",
        emitPath: false,
        value: "id",
        lazy: "true",
        lazyLoad(node, resolve) {
          const { value, level } = node;
          if (level == 1) {
            _this
              .getLabel({
                type: value,
              })
              .then((res) => {
                const { result, data } = res;
                if (result) {
                  let list = [];
                  if (data && data.length != 0) {
                    list = data.map((o) => {
                      return {
                        ...o,
                        type: o.attribute,
                        id: o.id,
                        leaf: true,
                      };
                    });
                  } else {
                    list.push({
                      disabled: true,
                      type: "暂无标签属性",
                      id: "no-child",
                      leaf: true,
                    });
                    node.leaf = false;
                  }
                  resolve(list);
                } else {
                  resolve([]);
                  this.$message.error(res.msg || "请求错误");
                }
              });
          }
        },
      },
    };
  },
  methods: {
  },
};
