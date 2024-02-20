<template>
  <UiFlex type="col" justify="center" class="p-6 w-full min-h-screen">
    <UiText color="primary" weight="bold" align="center" style="font-size: 8rem">
      {{ error.statusCode }}
    </UiText>
    <UiText color="gray" size="2xl" align="center" class="mb-6">
      {{ error.message || error.statusMessage || 'Có lỗi xảy ra' }}
    </UiText>
    <UButton size="md" @click="navigateTo('/')">Trang Chủ</UButton>
  </UiFlex>
</template>

<script setup>
const props = defineProps({
  error: Object
})
</script>