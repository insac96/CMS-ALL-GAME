<template>
  <div v-if="!!game">
    <UiFlex>
      <UiFlex type="col" items="start" class="mr-auto">
        <UiText class="mr-auto" weight="semibold" color="primary">{{ game.name }}</UiText>
        <UiText color="gray" size="xs">{{ game.url }}</UiText>
      </UiFlex>

      <GameEdit :game="game" class="mx-1">Sửa</GameEdit>
      <UButton color="red" icon="i-bx-trash" @click="del">Xóa</UButton>
    </UiFlex>

    <div class="mt-4">
      <StatisticFast :key="reloadStore.state" :game="game" class="mb-4"/>

      <UiFlex class="mb-2">
        <UTabs v-model="tab" :items="tabs"></UTabs>
      </UiFlex>

      <StatisticPayment :key="reloadStore.state" :game="game" v-if="tab == 0"/>
      <StatisticSignin :key="reloadStore.state" :game="game" v-if="tab == 1"/>
      <StatisticSignup :key="reloadStore.state" :game="game" v-if="tab == 2"/>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const reloadStore = useReloadStore()
const route = useRoute()
const _id = route.params._id

const game = ref(null)

const tab = ref(0)

const tabs = [
  { label: 'Nạp tiền', key: 'payment' },
  { label: 'Đăng nhập', key: 'signin' },
  { label: 'Đăng ký', key: 'signup' },
]

watch(() => reloadStore.state, () => get())

const del = async () => {
  try {
    await useAPI('game/del', {
      _id: _id
    })

    reloadStore.change()
    navigateTo('/')
  }
  catch (e) {
    return
  }
}

const get = async () => {
  try {
    const data = await useAPI('game/get', {
      _id: _id
    })

    game.value = data
  }
  catch (e) {
    return
  }
}
get()
</script>