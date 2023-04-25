<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { updateUser } = authStore
const filename = ref('')
const emit = defineEmits(['changeUrl'])

/* eslint-disable no-var */
const widget = (window as any).cloudinary.createUploadWidget(
  {
    cloudName: 'dmjp9nit3',
    uploadPreset: 'mshku11i',
    cropping: true,
    multiple: false,
    sources: ['local']
    // clientAllowedFormats: ['images'] //restrict uploading to image files only
  },
  async (error: any, result: any) => {
    try {
      if (!error && result && result.event === 'success') {
        const { original_filename, format, secure_url } = result.info
        filename.value = `${original_filename}.${format}`
        emit('changeUrl', secure_url)

        await updateUser({
          photoURL: secure_url
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }
)

function onOpen() {
  widget.open()
}
</script>

<template>
  <div class="flex flex-col">
    <button
      @click="onOpen"
      class="mt-5 p-3 text-left bg-transparent border rounded"
      :class="{ 'text-gray-200': filename, 'text-gray-600': !filename }"
    >
      {{ filename ? filename : 'logo' }}
    </button>
  </div>
</template>
