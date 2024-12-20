<template>
  <div class="pageDiv">
    <div class="opera">
      <el-button type="primary" @click="addtag">添加标签</el-button>
    </div>
    <el-table class="eltable" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="name" label="标签名称" align="center" />
      <el-table-column prop="type" label="标签类型" align="center" />
      <el-table-column prop="date" label="日期" align="center" />
      <el-table-column label="操作" width="120px" align="center">
        <template #default="{ row }">
          <el-button link type="primary" @click="edittag(row)">编辑标签</el-button>
        </template>
      </el-table-column>
    </el-table>
    <El-pagination
      :config="config"
      :paginationParams="paginationParams"
      @pageChange="pageChange"
      @pageSizeChange="pageSizeChange"
    />

    <el-dialog
      v-model="centerDialogVisible"
      :title="titleDialog"
      width="500"
      align-center
      :close-on-click-modal="false"
      @closed="resetForm(ruleFormRef)"
    >
      <div>
        <el-form ref="ruleFormRef" :model="forms" label-width="100px" :rules="rules" style="max-width: 600px">
          <el-form-item label="标签名称：" prop="bqname">
            <el-input v-model="forms.bqname" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="标签类型：" prop="bqtype">
            <el-select
              v-model="forms.bqtype"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="参数：">
            <el-scrollbar max-height="500px">
              <el-checkbox-group v-model="forms.checkList">
                <el-checkbox 
                  v-for="item in opts" 
                  :key="item.value" 
                  :label="item.value"
                  :value="item.value"
                  class="checkbox-item"
                >
                  <el-tooltip :content="item.label" placement="top" :disabled="!item.showTooltip">
                    <template #default>
                      <div class="ellipsis-text" @mouseenter="checkTooltip($event, item)" @mouseleave="item.showTooltip = false">
                        {{ item.label }}
                      </div>
                    </template>
                  </el-tooltip>
                </el-checkbox>
              </el-checkbox-group>
            </el-scrollbar>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message } from "@/Hooks/Element-plus"

const tableData = [
  {
    date: '2024-06-13',
    name: '20240613监控报告',
    type: '监控报告',
    checkList: ['1','2'],
  },
  {
    date: '2024-05-12',
    name: '20240512故障报告',
    type: '故障报告',
    checkList: ['3','4'],
  },
  {
    date: '2024-05-04',
    name: '20240504构型报告',
    type: '构型报告',
    checkList: ['1','3'],
  },
  {
    date: '2024-04-27',
    name: '20240427生命周期报告',
    type: '生命周期报告',
    checkList: ['2','4'],
  },
]

const config = reactive({
  background: true,
  small: false,
  disabled: false,
  layout: "total, sizes, prev, pager, next, jumper",
  page_sizes: [10, 20, 50, 100],
})
const paginationParams = reactive({
  page: 1,
  pageSize: config.page_sizes[0],
  total: tableData.length,
})
const pageChange = (val) => {
  paginationParams.page = val
}
const pageSizeChange = (val) => {
  paginationParams.pageSize = val
}
const options = [
  {
    value: '监控报告',
    label: '监控报告',
  },
  {
    value: '故障报告',
    label: '故障报告',
  },
  {
    value: '构型报告',
    label: '构型报告',
  },
  {
    value: '生命周期报告',
    label: '生命周期报告',
  },
  {
    value: '非周期响应信息',
    label: '非周期响应信息',
  },
]
const centerDialogVisible = ref(false)
const titleDialog = ref('')
const ruleFormRef = ref()
let forms = reactive({
  bqname: '',
  bqtype: '',
  checkList: [],
})
const opts = ref([
  { label: '选项一', value: '1', showTooltip: false },
  { label: '这是一个很长的选项标签', value: '2', showTooltip: false },
  { label: '选项三', value: '3', showTooltip: false },
  { label: '又是一个很长的选项标签', value: '4', showTooltip: false },
  { label: '选项五', value: '5', showTooltip: false },
  { label: '选项六', value: '6', showTooltip: false },
  { label: '选项七', value: '7', showTooltip: false },
  { label: '选项八', value: '8', showTooltip: false },
  { label: '选项九', value: '9', showTooltip: false },
  { label: '选项十', value: '10', showTooltip: false },
  { label: '选项十一选项十一', value: '11', showTooltip: false },
  { label: '选项十二', value: '12', showTooltip: false },
  { label: '选项十三', value: '13', showTooltip: false },
  { label: '选项十四', value: '14', showTooltip: false },
  { label: '选项十五选项十五', value: '15', showTooltip: false },
  { label: '选项十六', value: '16', showTooltip: false },
  { label: '选项十七', value: '17', showTooltip: false },
  { label: '选项十八', value: '18', showTooltip: false },
  { label: '选项十九选项十九', value: '19', showTooltip: false },
  { label: '选项二十', value: '20', showTooltip: false },
]);
const checkTooltip = (event, item) => {
  const target = event.target;
  if (target.scrollWidth > target.clientWidth) {
    item.showTooltip = true;
  } else {
    item.showTooltip = false;
  }
};

const rules = reactive({
  bqname: [
    { required: true, message: '请输入', trigger: 'blur' }
  ],
  bqtype: [
    { required: true, message: '请选择', trigger: 'change' }
  ],
})
const addtag = () => {
  forms = reactive({
    bqname: '',
    bqtype: '',
    checkList: [],
  })
  titleDialog.value = '添加标签'
  centerDialogVisible.value = true
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}
const edittag = (row) => {
  const curow = JSON.parse(JSON.stringify(row))
  forms = reactive({
    bqname: curow.name,
    bqtype: curow.type,
    checkList: curow.checkList,
  })
  titleDialog.value = '编辑标签'
  centerDialogVisible.value = true
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit',forms)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="scss">
.eltable {
  height: calc(100% - 84px);
}
.opera {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
:deep(.el-pagination) {
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
:deep(.el-checkbox-group) {
  // max-height: 500px;
  // overflow-y: overlay;
  .el-checkbox {
    margin-right: 20px;
    .ellipsis-text {
      width: 77px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>