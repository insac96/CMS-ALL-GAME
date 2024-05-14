<template>
  <header class="
    sticky top-0 z-50 
    bg-white/75 dark:bg-transparent backdrop-blur-xl
    border-b border-gray-200 dark:border-gray-800
    px-4
  ">
    <UiFlex class="h-[var(--header-size)] max-h-[var(--header-size)]">
      <UiIcon name="i-bx-menu-alt-left" size="6" class="mr-4 xl:!hidden" pointer @click="open = true" />

      <UiFlex type="col" items="start" class="cursor-pointer mr-auto" @click="navigateTo('/')">
        <UiText weight="semibold" color="primary">Admin Center</UiText>
        <UiText color="gray" size="xs">Xin chào {{ authStore.profile.username }}</UiText>
      </UiFlex>

      <GameAdd v-if="authStore.profile.username == 'admin'"/>
      <UButton icon="i-bx-power-off" color="red" class="ml-1" @click="logout"></UButton>
    </UiFlex>
  </header>

  <USlideover v-model="open" side="left" :ui="{
    width: 'w-screen max-w-xs'
  }">
    <UCard 
      class="flex flex-col flex-1 w-full" 
      :ui="{ 
        base: 'overflow-y-auto',
        body: { base: 'grow overflow-y-auto' },
        ring: '', 
        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
      }"
    >
      <UiFlex type="col" items="start" class="cursor-pointer mb-4" @click="navigateTo('/')">
        <UiText weight="semibold" color="primary">Admin Center</UiText>
        <UiText color="gray" size="xs">Xin chào quản trị viên</UiText>
      </UiFlex>

      <LayoutMenu></LayoutMenu>
    </UCard>
  </USlideover>
</template>

<script setup>
const authStore = useAuthStore()
const open = ref(false)

const logout = () => {
  const token = useCookie('token-auth')
  token.value = null
  navigateTo('/login')
}
</script>

<style>
:root {
  --header-size: 55px
}
</style>