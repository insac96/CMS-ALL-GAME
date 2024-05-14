<template>
  <div>
    <UButton color="cyan" icon="i-bx-edit" @click="open=true">Sửa</UButton>

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

        <UFormGroup label="Dữ liệu">
          <UInput v-model="state.db"></UInput>
        </UFormGroup>

        <UFormGroup label="Đường dẫn">
          <UInput v-model="state.url"></UInput>
        </UFormGroup>

        <UiFlex justify="end">
          <UButton type="submit" :loading="loading">Sửa</UButton>
        </UiFlex>
      </UForm>
    </UModal>
  </div>
</template>

<script setup>
const reloadStore = useReloadStore()
const props = defineProps(['game'])
const open = ref(false)
const loading = ref(false)
const state = ref(JSON.parse(JSON.stringify(props.game)))

const submit = async () => {
  try {
    loading.value = true
    await useAPI('game/edit', JSON.parse(JSON.stringify(state.value)))

    loading.value = false
    open.value = false
    reloadStore.change()
  }
  catch(e){
    loading.value = false
  }
}
</script>