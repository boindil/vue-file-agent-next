<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default /* #__PURE__ */ defineComponent({
  name: 'VueFileListItem',
  props: {
    index: Number,
  },
})
</script>
