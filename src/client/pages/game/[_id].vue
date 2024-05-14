<template>
  <UiFlex type="col" class="h-full" v-if="!!game">
    <!-- <UiFlex class="w-full py-2 px-4">
      <UiFlex type="col" items="start" class="mr-auto cursor-pointer" @click="openLink">
        <UiText class="mr-auto" weight="semibold" color="primary">{{ game.name }}</UiText>
        <UiText color="gray" size="xs">{{ game.url }}</UiText>
      </UiFlex>

      <GameEdit :game="game" class="mx-1" v-if="authStore.profile.username == 'admin'">Sửa</GameEdit>
      <UButton color="gray" icon="i-bx-trash" v-if="authStore.profile.username == 'admin'" @click="del">Xóa</UButton>
    </UiFlex> -->

    <div class="w-full grow">
      {{ game }}
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