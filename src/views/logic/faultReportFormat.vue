<template>
  <div class="pageIma">
    <div class="opera">
      <el-button type="primary" @click="addtag">添加</el-button>
    </div>
    <el-table class="eltable" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="a" label="故障所属LRU/LRM名称" align="center" />
      <el-table-column prop="b" label="故障所属LRU/LRM标识" align="center" />
      <el-table-column prop="c" label="故障报告名称" align="center" />
      <el-table-column prop="d" label="故障标识" align="center" />
      <el-table-column prop="e" label="故障报告类型" align="center" />
      <el-table-column prop="f" label="故障报告延迟" align="center" />
      <el-table-column prop="g" label="故障上报OHMS所属ICD信号名称" align="center" />
      <el-table-column prop="h" label="故障上报OHMS所属ICD信号中的位域" align="center" />
      <el-table-column prop="i" label="成员设备故障记录启动开关ICD信号名称" align="center" />
      <el-table-column prop="date" label="日期" align="center" />
      <el-table-column label="操作" width="120px" align="center">
        <template #default="{ row }">
          <el-button link type="primary" @click="edittag(row)">编辑</el-button>
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
        <el-form ref="ruleFormRef" :model="forms" label-width="160px" :rules="rules" style="max-width: 600px">
          <el-form-item label="LRU/LRM名称：" prop="a">
            <el-input v-model="forms.a" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="LRU/LRM标识：">
            <el-input v-model="forms.b" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="故障报告名称：">
            <el-input v-model="forms.c" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="故障标识：">
            <el-input v-model="forms.d" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="故障报告类型：">
            <el-select
              v-model="forms.e"
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
          <el-form-item label="故障报告延迟：">
            <el-input v-model="forms.f" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="OHMS所属ICD名称：">
            <el-input v-model="forms.g" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="OHMS所属ICD位域：">
            <el-input v-model="forms.h" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="启动开关ICD名称：">
            <el-input v-model="forms.i" placeholder="请输入" />
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
    a: '20240316名称',
    b: '20240316标识',
    c: '20240316故障报告名称',
    d: '20240316故障标识',
    e: '内部故障',
    f: '200',
    g: 'OHMS-ICD-NAME1',
    h: 'OHMS-ICD-BIT1',
    i: '启动开关ICD信号名称1',
    date: '2024-03-16',
  },
  {
    a: '20240517名称',
    b: '20240517标识',
    c: '20240517故障报告名称',
    d: '20240517故障标识',
    e: '输入故障',
    f: '100',
    g: 'OHMS-ICD-NAME3',
    h: 'OHMS-ICD-BIT3',
    i: '启动开关ICD信号名称3',
    date: '2024-05-17',
  },
  {
    a: '20240613名称',
    b: '20240613标识',
    c: '20240613故障报告名称',
    d: '20240613故障标识',
    e: '接口故障',
    f: '150',
    g: 'OHMS-ICD-NAME2',
    h: 'OHMS-ICD-BIT2',
    i: '启动开关ICD信号名称2',
    date: '2024-06-13',
  },
  {
    a: '20240715名称',
    b: '20240715标识',
    c: '20240715故障报告名称',
    d: '20240715故障标识',
    e: '输出故障',
    f: '180',
    g: 'OHMS-ICD-NAME4',
    h: 'OHMS-ICD-BIT4',
    i: '启动开关ICD信号名称4',
    date: '2024-07-15',
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
    value: '内部故障',
    label: '内部故障',
  },
  {
    value: '接口故障',
    label: '接口故障',
  },
  {
    value: '输入故障',
    label: '输入故障',
  },
  {
    value: '输出故障',
    label: '输出故障',
  },
  {
    value: '模糊故障',
    label: '模糊故障',
  },
  {
    value: '非模糊故障',
    label: '非模糊故障',
  },
]
const centerDialogVisible = ref(false)
const titleDialog = ref('')
const ruleFormRef = ref()
let forms = reactive({
  a: '',
  b: '',
  c: '',
  d: '',
  e: '',
  f: '',
  g: '',
  h: '',
  i: '',
})
const rules = reactive({
  a: [
    { required: true, message: '请输入', trigger: 'blur' }
  ]
})
const addtag = () => {
  forms = reactive({
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: '',
    g: '',
    h: '',
    i: '',
  })
  titleDialog.value = '添加'
  centerDialogVisible.value = true
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}
const edittag = (row) => {
  const curow = JSON.parse(JSON.stringify(row))
  forms = reactive({
    a: curow.a,
    b: curow.b,
    c: curow.c,
    d: curow.d,
    e: curow.e,
    f: curow.f,
    g: curow.g,
    h: curow.h,
    i: curow.i,
  })
  titleDialog.value = '编辑'
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
    }
  })
}
</script>

<style scoped lang="scss">
.pageIma {
  height: 100%;
}
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
</style>