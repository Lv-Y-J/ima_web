<template>
  <div class="pageDiv">
    <h1>ICD读取</h1>
    <!-- <el-button type="primary" @click="promptFolderSelection">选择文件夹</el-button> -->
    <input type="file" ref="folderInput" id="fileImage" name="fileImage" webkitdirectory style="display: block" @change="handleFolderSelect" />
    <div v-if="selectedFolderPath">
      <h3>选择的文件夹路径：</h3>
      <p>{{ selectedFolderPath }}</p>
    </div>

    <!-- <el-upload
      class="upload-demo"
      action=""
      :auto-upload="false"
      :on-change="handleChange"
    >
      <el-button type="primary">Click to upload</el-button>
    </el-upload> -->
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const files = ref([]);
  const selectedFolderPath = ref('');
  const folderInput = ref(null);

  onMounted(() => {
    
  });

  const promptFolderSelection = () => {
    if (folderInput.value) {
      folderInput.value.click();
    } else {
      console.error('folderInput 未正确引用');
    }
  };
  const handleFolderSelect = event => {
    // const files = event.target.files
    // console.log('Selected files:', files)
    // let input_path = files[0]?.path?.substring(0, files[0].path.lastIndexOf('\\'))
    // console.log('Selected input_path:', input_path)

    // let file = document.getElementById('fileImage').files[0];
    // console.log('file:',file)
    // if (window.FileReader) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onloadend = function (e) {
    //     //e.target.result就是最后的路径地址
    //     // document.getElementById("img1").setAttribute("src",e.target.result)
    //     console.log("***",e.target.result);
    //   };
    // }

    // const selectedFiles = Array.from(event.target.files);
    // const rootPath = getRootPath(selectedFiles);
    // selectedFolderPath.value = rootPath;
    // console.log("选择的文件夹路径：", selectedFolderPath.value);
  };
  const getRootPath = (files) => {
    if (files.length === 0) {
      return '';
    }
    // 获取第一个文件的相对路径
    const firstFileRelativePath = files[0].webkitRelativePath;
    // 去掉文件名部分，只保留文件夹路径
    const relativeFolderPath = firstFileRelativePath.substring(0, firstFileRelativePath.lastIndexOf('/'));
    console.log('1---',relativeFolderPath);
    // 获取第一个文件的绝对路径
    const firstFile = document.getElementById('fileImage').files[0];
    console.log('2---',firstFile);
    const absoluteFilePath = firstFile.path;
    console.log('3---',absoluteFilePath);
    // 去掉文件名部分，只保留文件夹路径
    const absoluteFolderPath = absoluteFilePath?.substring(0, absoluteFilePath.lastIndexOf('\\'));
    // 计算最终的文件夹路径
    const folderPath = absoluteFolderPath + '\\' + relativeFolderPath;
    return absoluteFolderPath?folderPath:'';
  };

  const handleChange = (uploadFile, uploadFiles) => {
    console.log(uploadFile);
  }
</script>

<style scoped lang="scss">

</style>