<template>
  <UiFlex class="w-full h-full" justify="center">
    <UiFlex class="gap-3" justify="center" wrap>
      <UButton 
        size="xl" 
        class="
          flex flex-col justify-center 
          h-36 w-36
        "
        color="gray"
      >
        <UiText size="2xl" color="primary" weight="bold">ANB</UiText>
        <UiText size="sm">{{ state.anb }} Game</UiText>
      </UButton>

      <UButton 
        size="xl" 
        class="
          flex flex-col justify-center 
          h-36 w-36
        "
        color="gray"
      >
        <UiText size="2xl" color="primary" weight="bold">CVV</UiText>
        <UiText size="sm">{{ state.cvv }} Game</UiText>
      </UButton>

      <UButton 
        size="xl" 
        class="
          flex flex-col justify-center 
          h-36 w-36
        "
        color="gray"
      >
        <UiText size="2xl" color="primary" weight="bold">ZUZU</UiText>
        <UiText size="sm">{{ state.zuzu }} Game</UiText>
      </UButton>
    </UiFlex>
  </UiFlex>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const state = ref({
  anb: 0,
  cvv: 0,
  zuzu: 0
})

const getList = async () => {
  try {
    const data = await useAPI('game/list')
    data.forEach(i => {
      if(i.type == 'ANB'){
        state.value.anb++
      }
      if(i.type == 'CVV'){
        state.value.cvv++
      }
      if(i.type == 'ZUZU'){
        state.value.zuzu++
      }
    })
  }
  catch(e){
    return
  }
}

getList()
</script>