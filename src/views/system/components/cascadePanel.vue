<template>
  <div class="flex h-full bg-#fff">
    <div :class="'level_' + propsIndex" class="border-1px border-r-solid border-#eee overflow-y-auto min-w-180px">
      <div v-for="(item, index) in dataList" :key="index" @click="() => change(index)" :class="{ 'bg-#eff7ff text-#0FA3FF': Number(index) === childActiveId }" class="flex items-center pr-10px">
        <slot name="list" :data="item" :index="index"></slot>
        <el-icon v-if="Number(index) === childActiveId" size="14px" color="#2fafff" class="ml-auto">
          <ArrowRightBold />
        </el-icon>
      </div>
    </div>
    <div :class="'out_level_' + (propsIndex + 1)" v-if="dataList[childActiveId] && dataList[childActiveId].children !== 0">
      <cascade-panel ref="cascadeRef" :dataList="dataList[childActiveId].children" :propsIndex="propsIndex + 1">
        <template #list="slotProps">
          <slot name="list" :data="slotProps.data"></slot>
        </template>
      </cascade-panel>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cascadePanel',
}
</script>
<script setup>
import { ref, defineExpose } from 'vue'
const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
  propsIndex: {
    default: 1,
    type: Number,
  },
})
const childActiveId = ref(0)
const cascadeRef = ref(null)

const init = () => {
  childActiveId.value = 0
  cascadeRef.value && cascadeRef.value.init()
}

const change = (index) => {
  init()
  // 点击之后下一个组件显示，activeId初始化0
  childActiveId.value = index
}
defineExpose({
  init,
})
</script>
