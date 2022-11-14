<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import FileRecord from '../lib/file-record';
import {defineComponent} from 'vue'

export default /* #__PURE__ */ defineComponent({
  name: 'VueFileList',
  props: {
    list: {type: Array<FileRecord>, required: true},
    axis: {type: String, required: true},
    appendTo: {type: String, required: true},
  },
});
</script>
