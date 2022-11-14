<template>
  <div class="theme-default">
    <div class="vue-file-agent grid-block-wrapper" style="padding: 0">
      <template v-for="(fileRecord, i) in fileRecords" :key="i">
        <VueFilePreview
          :file-record="fileRecord"
          :linkable="true"
          class="file-preview-wrapper grid-box-item grid-block"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {getFileRecordsInitial} from './demo-base'
import FileRecord, {Options, RawFileRecord} from '../lib/file-record'

export default defineComponent({
  name: 'DemoPreview',
  data: () => {
    const rawFileRecords = getFileRecordsInitial()

    const data: {
      fileRecords: FileRecord[]
      rawFileRecords: RawFileRecord[]
    } = {
      fileRecords: FileRecord.fromRawArraySync(rawFileRecords, {} as Options),
      rawFileRecords,
    }

    console.log

    return data
  },
})
</script>
