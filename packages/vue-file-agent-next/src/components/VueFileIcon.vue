<template>
  <svg :viewBox="viewBoxComputed">
    <template v-for="(d, index) in icon.paths">
      <path v-if="d" :key="index" :d="d" />
    </template>
  </svg>
</template>
<script lang="ts">
import {getIconByName, getIconFromExt, SvgIcon} from '../lib/icons'
import {defineComponent} from 'vue'

export default /* #__PURE__ */ defineComponent({
  name: 'VueFileIcon',
  props: {
    ext: {type: String, required: false},
    name: {type: String, required: false},
    viewBox: {type: String, required: false},
  },
  computed: {
    viewBoxComputed(): string {
      if (!this.viewBox && this.icon && this.icon.viewBox) {
        return this.icon.viewBox
      }
      return this.viewBox ? this.viewBox : '0 0 100 100'
    },
    icon(): SvgIcon {
      if (this.name) {
        return getIconByName(this.name)
      }
      const svgIcon = getIconFromExt(this.ext ? this.ext : '')
      return svgIcon
    },
  },
})
</script>
<style></style>
