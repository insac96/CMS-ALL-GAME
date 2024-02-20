<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="2" />
    <NuxtPage/>

    <UNotifications />
  </NuxtLayout>
</template>

<style>
html, body, #__nuxt {
  background: rgb(var(--color-gray-900));
  height: 100%;
}
</style>
