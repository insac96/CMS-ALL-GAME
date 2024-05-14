<template>
  <div class="p-4">
    <div v-if="!authStore.profile.company">
      <UiFlex>
        <UTabs :items="menu" v-model="tab" />
      </UiFlex>
      
      <StatisticFast company="ALL" v-if="tab == 0"></StatisticFast>
      <StatisticFast company="ANB" v-if="tab == 1"></StatisticFast>
      <StatisticFast company="CVV" v-if="tab == 2"></StatisticFast>
      <StatisticFast company="ZUZU" v-if="tab == 3"></StatisticFast>
    </div>
    
    <StatisticFast :company="authStore.profile.company" v-else></StatisticFast>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()

const tab = ref(0)
const menu = computed(() => {
  if(!authStore.profile.company){
    return [
      { label: 'All Company', slot: 'ALL' },
      { label: 'ANB Studio', slot: 'ANB' },
      { label: 'CVV Studio', slot: 'CVV' },
      { label: 'ZUZU Studio', slot: 'ZUZU' }
    ]
  }
  else {
    return [
      {
        label: `${authStore.profile.company} Studio`,
        slot: authStore.profile.company
      }
    ]
  }
})
</script>