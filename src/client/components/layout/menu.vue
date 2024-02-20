<template>
  <UiFlex>
    <UAccordion 
      :items="menu" 
      :ui="{ 'item': { padding: 'pt-0 pb-2 pl-2' }}"
      multiple
    >
      <template #default="{item, open}">
        <UiFlex items="center" class="py-2 mb-2 cursor-pointer overflow-hidden select-none">
          <UiText class="mr-4"  size="sm" weight="semibold" :color="open ? 'primary' : 'gray'" :text="item.label" />
          <UiIcon name="i-bx-chevron-right" size="5" :color="open ? 'primary' : 'gray'" class="ms-auto transform transition-transform duration-200" :class="[open && 'rotate-90']"/>
        </UiFlex>
      </template>
      
      <template #[i.slot] v-for="i in menu" :key="i.slot">
        <UVerticalNavigation :links="i.children" @click="emits('to')"/>
      </template>
    </UAccordion>
  </UiFlex>
</template>

<script setup>
import { watch } from 'vue';

const reloadStore = useReloadStore()

const emits = defineEmits(['to'])

const menu = ref([])

watch(() => reloadStore.state, () => getList())

const getList = async () => {
  try {
    const data = await useAPI('game/list')

    const m = [
      { label: 'ANB Studio', slot: 'ANB', children: []},
      { label: 'CVV Studio', slot: 'CVV', children: []},
      { label: 'ZUZU Game', slot: 'ZUZU', children: []}
    ]

    data.forEach(i => {
      if(i.type == 'ANB'){
        m[0].children.push({ label: i.name, to: `/game/${i._id}` })
      }
      if(i.type == 'CVV'){
        m[1].children.push({ label: i.name, to: `/game/${i._id}` })
      }
      if(i.type == 'ZUZU'){
        m[2].children.push({ label: i.name, to: `/game/${i._id}` })
      }
    })

    menu.value = m
  }
  catch(e){
    return
  }
}

getList()
</script>