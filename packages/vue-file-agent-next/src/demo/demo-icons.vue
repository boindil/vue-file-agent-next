<template>
  <div class="bg-light">
    <span
      v-for="(color, ext) in icons"
      :key="ext"
      style="width: 42px; height: 42px; display: inline-block"
      :style="{color: color}"
    >
      <VueFileIcon :ext="ext" style="width: 100%; height: 100%; fill: currentColor" />
    </span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'DemoIcons',
  data() {
    return {
      icons: {
        pdf: 'red',
        doc: 'blue',
        ods: 'green',
        zip: 'orange',
        db: 'brown',
      },
    }
  },
})
</script>
