<template>
  <div class="flex gap-[10px] flex-wrap" ref="parent">
    <div
      id="image_choose_button"
      style="view-transition-name: item-choose-btn"
      v-if="!$props.readonly && (!$props.limit || images.length < $props.limit)"
      class="h-[100px] w-[100px] bg-gray-500/10 relative rounded-[4px] grid place-content-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill="rgb(107 114 128 / 0.3)">
        <path
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
        />
      </svg>
      <input type="file" ref="File" class="absolute inset-0 opacity-0" accept="image/*" @change="choose" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import ImageViewer from '@/views/home/components/ImageViewer.jsx'
import Sortable from 'sortablejs'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  limit: {
    type: Number,
    default: 3,
  },
  move: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue'])

let sortable = null
const parent = ref()
const loading = ref(false)
const images = ref(props.modelValue || [])
const childArr = []

const choose = (e) => {
  const target = e.target
  const file = target.files?.[0]
  if (!file) return
  loading.value = true
  const url = URL.createObjectURL(file)

  images.value = [...images.value, url]
  const item = createItem(url)
  childArr.push(item)
  emits('update:modelValue', images.value)

  document.startViewTransition(() => {
    parent.value?.insertBefore(item, parent.value.lastChild)
  })

  loading.value = false
}

const remove = (url) => {
  images.value = images.value.filter((item) => item !== url)
  emits('update:modelValue', images.value)
}

const createSortable = (el) => {
  sortable = Sortable.create(el, {
    animation: 300,
    filter: '#image_choose_button',
    onMove: function (evt) {
      return evt.related.id !== 'image_choose_button'
    },
    onEnd: function (evt) {
      const values = sortable?.toArray() || []
      values.pop()
      images.value = values
      emits('update:modelValue', images.value)
    },
  })
}

const childrenHandle = () => {
  images.value.forEach((url, index) => {
    const item = createItem(url, index)
    childArr.push(item)
  })
  parent.value?.prepend(...childArr)
}

const generateName = () => {
  const prefix = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0')
  const suffix = Date.now().toString().slice(-5)
  return prefix + suffix
}

const createItem = (url, index = childArr.length + 1) => {
  const div = document.createElement('div')
  div.className = 'h-[100px] w-[100px] bg-gray-500/10 relative rounded-[4px] overflow-hidden border'
  div.dataset.id = url
  div.style.setProperty('view-transition-name', `item-${generateName()}`)
  const img = document.createElement('img')
  img.src = url
  img.className = 'h-full w-full object-cover'
  img.onclick = (e) => ImageViewer.show(url, e)
  div.appendChild(img)
  const btn = document.createElement('div')
  btn.className = 'absolute right-[5px] top-[5px] flex items-center justify-center drop-shadow-lg text-white'
  btn.addEventListener('click', () => {
    document.startViewTransition(() => {
      div.remove()
    })

    remove(url)
  })
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill="#FFFFFF"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>`
  btn.innerHTML = svg
  div.appendChild(btn)
  return div
}

const File = ref(null)

const uploading = () => {
  File.value.click()
}

defineExpose({
  uploading,
})

onMounted(() => {
  if (props.move) {
    const el = parent.value
    createSortable(el)
  }
  childrenHandle()
})
</script>

<style scoped></style>
