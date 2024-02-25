<template>
  <UiFlex>
    <UAccordion 
      :items="menu" 
      :ui="{ 'item': { padding: 'pt-0 pb-2 pl-2' }}"
      multiple
    >
      <template #default="{item, open}">
        <UiFlex items="center" class="py-2 mb-2 cursor-pointer overflow-hidden select-none">
          <UiText class="mr-4"  size="sm" weight="semibold" :color="open ? 'primary' : 'gray'" :text="`${item.label} (${item.count})`" />
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
const authStore = useAuthStore()
const reloadStore = useReloadStore()

const emits = defineEmits(['to'])

const menu = ref([])

watch(() => reloadStore.state, () => getList())

const getList = async () => {
  try {
    const data = await useAPI('game/list')

    const m = [
      { label: 'ANB Studio', slot: 'ANB', count: 0, children: []},
      { label: 'CVV Studio', slot: 'CVV', count: 0, children: []},
      { label: 'ZUZU Game', slot: 'ZUZU', count: 0, children: []}
    ]

    const mCVV = [
      { label: 'CVV Studio', slot: 'CVV', count: 0, children: []},
    ]

    const mANB = [
      { label: 'ANB Studio', slot: 'ANB', count: 0, children: []},
    ]

    data.forEach(i => {
      if(i.type == 'ANB'){
        m[0].children.push({ label: i.name, to: `/game/${i._id}` })
        m[0].count =  m[0].count + 1
      }
      if(i.type == 'CVV'){
        m[1].children.push({ label: i.name, to: `/game/${i._id}` })
        m[1].count =  m[1].count + 1
        mCVV[0].children.push({ label: i.name, to: `/game/${i._id}` })
        mCVV[0].count = mCVV[0].count + 1
      }
      if(i.type == 'ZUZU'){
        m[2].children.push({ label: i.name, to: `/game/${i._id}` })
        m[2].count =  m[2].count + 1
        mANB[0].children.push({ label: i.name, to: `/game/${i._id}` })
        mANB[0].count = mANB[0].count + 1
      }
    })

    if(authStore.profile.company == 'CVV'){
      menu.value = mCVV
    }
    else if(authStore.profile.company == 'ANB'){
      menu.value = mANB
    }
    else {
      menu.value = m
    }
  }
  catch(e){
    return
  }
}

getList()
</script>