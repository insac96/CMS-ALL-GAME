<template>
  <header class="
    sticky top-0 z-50 
    bg-white/75 dark:bg-transparent backdrop-blur-xl
    border-b border-gray-200 dark:border-gray-800
    px-4
  ">
    <UiFlex class="h-[var(--header-size)] max-h-[var(--header-size)]">
      <UiIcon name="i-bx-menu-alt-left" size="6" class="mr-4 md:!hidden" pointer @click="open = true" />

      <UiFlex type="col" items="start" >
        <UiText weight="semibold" color="primary">Admin Center</UiText>
        <UiText color="gray" size="xs">Xin chào quản trị viên</UiText>
      </UiFlex>

      <GameAdd class="ml-auto" />
    </UiFlex>
  </header>

  <USlideover v-model="open" side="left">
    <div class="p-4 flex-1">
      <LayoutMenu></LayoutMenu>
    </div>
  </USlideover>

  
</template>

<script setup>
const open = ref(false)
</script>

<style>
:root {
  --header-size: 55px
}
</style>