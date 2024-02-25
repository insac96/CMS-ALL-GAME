<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="2" />
    <NuxtPage/>

    <UNotifications />
  </NuxtLayout>
</template>

<style>
*, ::before, ::after {
  -webkit-tap-highlight-color: transparent !important;
}

::before, ::after {
  border-style: none;
}

:root {
  --scroll-color: var(--color-gray-200);
  --scroll-color-hover: var(--color-gray-300);
}

html, body, #__nuxt {
  height: 100%;
  border-style: none;
}

@media (hover: hover){
  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(var(--scroll-color));
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(var(--scroll-color-hover));
  }
}
</style>
