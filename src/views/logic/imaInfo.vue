<template>
  <div class="pageIma">
    <div class="opera">
      <el-button type="primary" @click="addtag">添加</el-button>
    </div>
    <el-table class="eltable" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="name" label="系统名称" align="center" />
      <el-table-column prop="dec" label="系统描述" align="center" />
      <el-table-column prop="ata" label="ATA章节" align="center" />
      <el-table-column prop="protocol" label="通信协议" align="center" />
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
        <el-form ref="ruleFormRef" :model="forms" label-width="100px" :rules="rules" style="max-width: 600px">
          <el-form-item label="系统名称：" prop="name">
            <el-input v-model="forms.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="系统描述：">
            <el-input v-model="forms.dec" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="ATA章节：">
            <el-input v-model="forms.ata" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="通信协议：">
            <el-input v-model="forms.protocol" placeholder="请输入" />
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
    name: '20240613IMA系统',
    dec: '20240613系统描述',
    ata: '42',
    protocol: 'A664',
  },
  {
    date: '2024-07-14',
    name: '20240714IMA系统',
    dec: '20240714系统描述',
    ata: '42',
    protocol: 'A664',
  },
  {
    date: '2024-08-15',
    name: '20240815IMA系统',
    dec: '20240815系统描述',
    ata: '42',
    protocol: 'A664',
  },
  {
    date: '2024-09-16',
    name: '20240916IMA系统',
    dec: '20240916系统描述',
    ata: '42',
    protocol: 'A664',
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
const centerDialogVisible = ref(false)
const titleDialog = ref('')
const ruleFormRef = ref()
let forms = reactive({
  name: '',
  dec: '',
  ata: '',
  protocol: '',
})
const rules = reactive({
  name: [
    { required: true, message: '请输入', trigger: 'blur' }
  ]
})
const addtag = () => {
  forms = reactive({
    name: '',
    dec: '',
    ata: '',
    protocol: '',
  })
  titleDialog.value = '添加'
  centerDialogVisible.value = true
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}
const edittag = (row) => {
  const curow = JSON.parse(JSON.stringify(row))
  forms = reactive({
    name: curow.name,
    dec: curow.dec,
    ata: curow.ata,
    protocol: curow.protocol,
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