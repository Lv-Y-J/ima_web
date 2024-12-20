<template>
  <div class="page_ljdy">
    <el-tabs type="border-card">
      <el-tab-pane label="IMA系统信息"><ImaInfo /></el-tab-pane>
      <el-tab-pane label="故障报告格式"><FaultReportFormat /></el-tab-pane>
      <el-tab-pane label="故障综合诊断逻辑">故障综合诊断逻辑</el-tab-pane>
      <el-tab-pane label="网络健康评估">网络健康评估</el-tab-pane>
      <el-tab-pane label="启动测试逻辑">启动测试逻辑</el-tab-pane>
      <el-tab-pane label="构型报告逻辑">构型报告逻辑</el-tab-pane>
      <el-tab-pane label="导入/导出"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import ImaInfo from './imaInfo.vue';
import FaultReportFormat from './faultReportFormat.vue';
</script>

<style scoped lang="scss">
.page_ljdy {
  height: 100%;
  :deep(.el-tabs) {
    height: 100%;
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>