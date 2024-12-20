<template>
  <div class="home_page">
    <div class="moki" @click="goto('/ICD/read')">
      <img src="../../assets/icdinfo.png" alt="" srcset="">
      <span>ICD信息</span>
    </div>
    <div class="moki">
      <img src="../../assets/logic.png" alt="" srcset="">
      <span>逻辑定义</span>
    </div>
    <div class="moki">
      <img src="../../assets/scene.png" alt="" srcset="">
      <span>场景生成</span>
    </div>
    <div class="moki">
      <img class="simimg" src="../../assets/simulation.png" alt="" srcset="">
      <span>仿真验证</span>
    </div>
    <div class="moki">
      <img class="sysimg" src="../../assets/system.png" alt="" srcset="">
      <span>系统设置</span>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router"
  const router = useRouter()

  const goto = (s) => {
    router.push(s)
  }
</script>

<style scoped lang="scss">
.home_page {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  .moki {
    width: 26%;
    height: 32vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    transition: .3s;
    &:hover {
      box-shadow: 0px 0px 15px rgba(0, 0, 0, .3);
    }
    img {
      width: 30%;
      height: 43%;
      margin-bottom: 20px;
    }
    span {
      font-size: 20px;
    }
    .simimg {
      width: 34%;
    }
    .sysimg {
      width: 37%;
    }
  }
}
</style>