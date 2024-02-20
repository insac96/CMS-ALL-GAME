<template>
  <div>
    <UButton icon="i-bx-plus" @click="open = true">Thêm</UButton>

    <UModal v-model="open">
      <UForm :state="state" @submit="submit" class="p-4">
        <UFormGroup label="Công ty">
          <USelectMenu 
            v-model="state.type" 
            size="lg" 
            value-attribute="value"
            :options="[
              { label: 'ANB Studio', value: 'ANB' },
              { label: 'CVV Studio', value: 'CVV' },
              { label: 'ZUZU Game', value: 'ZUZU' },
            ]"
          >
            <template #label>
              <span v-if="!state.type">Bấm để chọn</span>
              <span v-else>{{ state.type }}</span>
            </template>
          </USelectMenu>
        </UFormGroup>

        <UFormGroup label="Tên trò chơi">
          <UInput v-model="state.name"></UInput>
        </UFormGroup>

        <UFormGroup label="Khóa bí mật">
          <UInput v-model="state.secret"></UInput>
        </UFormGroup>

        <UFormGroup label="Đường dẫn">
          <UInput v-model="state.url"></UInput>
        </UFormGroup>

        <UiFlex justify="end">
          <UButton type="submit" :loading="loading">Thêm</UButton>
        </UiFlex>
      </UForm>
    </UModal>
  </div>
</template>

<script setup>
const reloadStore = useReloadStore()
const open = ref(false)
const loading = ref(false)
const state = ref({
  type: null,
  name: null,
  secret: null,
  url: null
})

const submit = async () => {
  try {
    loading.value = true
    await useAPI('game/add', JSON.parse(JSON.stringify(state.value)))

    loading.value = false
    open.value = false
    reloadStore.change()
  }
  catch(e){
    loading.value = false
  }
}
</script>