<template>
  <UiFlex type="col" class="h-full px-4" v-if="!!game">
    <UiFlex class="w-full py-2">
      <UiFlex type="col" items="start" class="mr-auto cursor-pointer" @click="openLink">
        <UiText class="mr-auto" weight="semibold" color="primary">{{ game.name }}</UiText>
        <UiText color="gray" size="xs">{{ game.url }}</UiText>
      </UiFlex>

      <GameEdit :game="game" class="mx-1" v-if="authStore.profile.username == 'admin'">Sửa</GameEdit>
      <UButton color="gray" icon="i-bx-trash" v-if="authStore.profile.username == 'admin'" @click="del">Xóa</UButton>
    </UiFlex>

    <UiFlex class="w-full">
      <UTabs :items="menu" v-model="tab" />
    </UiFlex>

    <div class="w-full grow">
      <GameViewStatistic v-if="tab == 0" :game="_id" />
      <GameViewPayment v-if="tab == 1" :game="_id" />
      <GameViewSpend v-if="tab == 2" :game="_id" />
      <GameViewUserPayment v-if="tab == 3" :game="_id" />
      <GameViewLog v-if="tab == 4" :game="_id" />
    </div>
  </UiFlex>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

// State
const authStore = useAuthStore()
const reloadStore = useReloadStore()
const route = useRoute()
const _id = route.params._id

const game = ref(null)

const tab = ref(0)
const menu = [
  { label: 'Thống kê' },
  { label: 'Nạp tiền' },
  { label: 'Chi tiêu' },
  { label: 'Chi tiết nạp' },
  { label: 'Ghi chép' },
]

// Watch
watch(() => reloadStore.state, () => get())

// Action
const openLink = () => window.open(game.value.url, '_blank')

const del = async () => {
  try {
    await useAPI('game/del', { _id: _id })
    navigateTo('/')
    setTimeout(() => reloadStore.change(), 500);
  }
  catch (e) { return }
}

const get = async () => {
  try {
    const data = await useAPI('game/get', { _id: _id })
    game.value = data
  }
  catch (e) { return }
}

// Load
get()
</script>