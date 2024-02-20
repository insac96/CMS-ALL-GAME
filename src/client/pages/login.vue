<template>
  <UiFlex class="Login w-full h-full p-4" justify="center">
    <UCard class="max-w-full w-[400px]" :ui="{ 
      header: { padding: 'py-3' },
      background: 'dark:bg-black/90'
    }">
      <template #header>
        <UiText weight="bold" color="primary">Xác Thực</UiText>
        <UiText color="gray" size="sm">Nhập thông tin tài khoản quản trị viên để bắt đầu</UiText>
      </template>

      <UForm :state="state" @submit="submit">
        <UFormGroup label="Tài khoản">
          <UInput v-model="state.username"></UInput>
        </UFormGroup>

        <UFormGroup label="Mật khẩu">
          <UInput v-model="state.password" type="password"></UInput>
        </UFormGroup>

        <UiFlex justify="end">
          <UButton type="submit" :loading="loading">Đăng Nhập</UButton>
        </UiFlex>
      </UForm>
    </UCard>
  </UiFlex>
</template>

<script setup>
definePageMeta({
  layout: 'login'
})

const loading = ref(false)

const state = ref({
  username: null,
  password: null
})

const submit = async () => {
  try {
    loading.value = true
    await useAPI('auth/login', JSON.parse(JSON.stringify(state.value)))

    navigateTo('/')
  }
  catch(e){
    loading.value = false
  }
}
</script>

<style>
.Login {
  background: url('/bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>