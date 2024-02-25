<template>
  <div class="p-4">
    <UAccordion color="gray" :items="menu" multiple>
      <template #[i.slot] v-for="i in menu" :key="i.slot">
        <StatisticFast :company="i.slot"></StatisticFast>
      </template>
    </UAccordion>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()

const menu = computed(() => {
  if(!authStore.profile.company){
    return [
      { 
        label: 'Total Company',
        slot: 'ALL'
      },
      { 
        label: 'ANB Studio',
        slot: 'ANB'
      },
      { 
        label: 'CVV Studio',
        slot: 'CVV'
      },
      { 
        label: 'ZUZU Studio',
        slot: 'ZUZU'
      }
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