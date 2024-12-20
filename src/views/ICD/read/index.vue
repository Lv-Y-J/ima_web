<template>
  <div class="pageDiv">
    <div class="opera">
      <el-button type="primary" @click="read(1)">单个读取</el-button>
      <el-button color="#2196f3" @click="read(2)">批量读取</el-button>
    </div>
    <el-table class="eltable" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="name" label="文件名" align="center" />
      <el-table-column prop="date" label="日期" align="center" />
      <!-- <el-table-column label="Operations" width="120px">
        <template #default>
          <el-button link type="primary">编辑</el-button>
        </template>
      </el-table-column> -->
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
          <el-form-item label="文件上传：" prop="fileList" v-if="titleDialog==='单个读取'">
            <el-upload
              v-model:file-list="forms.fileList"
              action=""
              :auto-upload="false"
              :multiple="false"
              :limit="1"
              :on-change="handleChange"
              accept=".xls, .xlsx, .xml"
              style="width: 100%"
            >
              <el-button type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="文件目录：" prop="path" v-if="titleDialog==='批量读取'">
            <el-input v-model="forms.path" placeholder="请输入系统本地文件路径" />
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
import { ElMessage, ElMessageBox } from 'element-plus'

const centerDialogVisible = ref(false)
const titleDialog = ref('')
const ruleFormRef = ref()
let forms = reactive({
  fileList: [],
  path: '',
})
const rules = reactive({
  fileList: [
    { required: true, message: '请选择', trigger: 'blur' }
  ],
  path: [
    { required: true, message: '请输入', trigger: 'blur' }
  ],
})

const tableData = [
  {
    date: '2024-05-04',
    name: '20240504.xml',
  },
  {
    date: '2024-05-03',
    name: '20240503.xml',
  },
  {
    date: '2024-05-02',
    name: '20240502.xml',
  },
  {
    date: '2024-05-01',
    name: '20240501.xml',
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

const read = (n) => {
  centerDialogVisible.value = true
  titleDialog.value = n === 1 ? '单个读取' : '批量读取'
}
const handleChange = (uploadFile, uploadFiles) => {
  console.log(uploadFile);
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessageBox.confirm(
        '是否确定覆盖以往上传的文件？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          centerDialogVisible.value = false
          ElMessage({
            type: 'success',
            message: '操作成功！',
          })
        })
        .catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: '操作取消！',
          // })
        })
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
</style>