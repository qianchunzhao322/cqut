<template>
  <div class="container merge_container">
    <base-layout headerHeight="0" footerHeight="0">
      <template slot="main">
        <div class="alumni_list">
          <alumni-info
            :data="item"
            v-for="item in alumniInfoList"
            :key="item.id"
          />
          <alumni-edit :data="targetForm" @confirm-merge="confirmMerge" :form="form" />
        </div>
      </template>
    </base-layout>
  </div>
</template>

<script>
// components
import alumniInfo from "@/views/alumniManagement/components/base/alumniInfo.vue";
import alumniEdit from "@/views/alumniManagement/components/base/alumniEdit.vue";
// api
import { selectClassmateWaitconfirmById } from "@/api/alumniManagement";
import { selectClassmateConfirmById } from "@/api/alumniManage/alumniDatabase";
import {
  mergeClassmate
} from '@/api/alumniManage/index'
export default {
  name: "UnitForm",
  mixins: [],
  components: {
    alumniInfo,
    alumniEdit,
  },
  data() {
    return {
      ids: [],
      alumniInfoList: [],
      targetForm: {},
      form: '1'
    };
  },
  mounted() {
    const { ids, type, form } = this.$route.query;
    if (ids) {
      this.ids = ids;
      this.form = form;
      this.alumniInfoList = [];
      this.ids.map(async (o) => {
        const { data } = await this.getDetail(o, type);
        this.alumniInfoList.push(data);
        if (this.alumniInfoList.length == this.ids.length) {
          this.targetForm = this.mergeObjects(...this.alumniInfoList);
        }
      });
    }
  },
  methods: {
    confirmMerge(form) {
      mergeClassmate({
        data: form,
        ids: this.ids,
        classify: form.classify
      }).then((res)=>{
        if(res.result){
          this.$message.success('合并成功')
          this.$router.back()
        }
      })
    },
    getDetail(id, type = 0) {
      const method =
        type == 1 ? selectClassmateConfirmById : selectClassmateWaitconfirmById;
      return method(id);
    },
    mergeObjects(...objects) {
      const mergedObj = {};

      objects.forEach((obj) => {
        for (let key in obj) {
          if (!mergedObj.hasOwnProperty(key)) {
            mergedObj[key] = obj[key];
          } else if (mergedObj[key] !== obj[key]) {
            mergedObj[key] = "";
          }
        }
      });

      return mergedObj;
    },
  },
};
</script>
<style lang="scss">
.confirm_container {
  .inhert_main {
    overflow: auto;
  }
}
</style>
<style lang="scss" scoped>
.alumni_list {
  display: flex;
  overflow: auto;
  height: 100%;
  .base_info:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
