<template>
  <div>
    <div class="row">
      <div class="col mb-3 text-left">
        <div class="custom-control custom-checkbox custom-control-inline">
          <input type="checkbox" class="custom-control-input" id="basic-demo-sortable-toggle" v-model="sortable" />
          <label class="custom-control-label" for="basic-demo-sortable-toggle">Drag & drop sortable</label>
        </div>
        <div class="custom-control custom-checkbox custom-control-inline">
          <input type="checkbox" class="custom-control-input" id="basic-demo-resumable-toggle" v-model="resumable" />
          <label class="custom-control-label" for="basic-demo-resumable-toggle">Resumable upload</label>
        </div>
      </div>
      <div class="col mb-3 text-right">
        Switch theme to
        <!-- <a href="#" @click.prevent="switchTheme()">Switch</a> -->
        <button class="btn btn-sm btn-outline-warning" @click="switchTheme()">
          <span v-if="theme != 'list'">List View</span>
          <span v-if="theme == 'list'">Grid View</span>
        </button>
      </div>
    </div>

    <VueFileAgent
      v-model:rawModelValue="rawFileRecords"
      v-model="fileRecords"
      :deletable="true"
      :editable="true"
      :linkable="true"
      :multiple="true"
      :theme="theme"
      :uploadUrl="uploadUrl"
      @select="filesSelected($event)"
      @delete="fileDeleted($event)"
      :sortable="sortable"
      :resumable="resumable"
    >
    </VueFileAgent>

    <div ref="screenDetector" style="height: 0; width: 0;" class="d-none d-sm-block"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {addTusClient, getFileRecordsInitial, uploadUrl} from './demo-base'
import FileRecord, {RawFileRecord} from '../lib/file-record'
import plugins from '../lib/plugins'

export default defineComponent({
  name: 'DemoBasic',
  data: () => {
    const data: {
      theme: string,
      lastProgress: number,
      fileRecords: FileRecord[],
      rawFileRecords: RawFileRecord[],
      sortable: boolean,
      resumable: boolean,
    } = {
      theme: 'default',
      lastProgress: 0,
      fileRecords: [],
      rawFileRecords: getFileRecordsInitial(),
      sortable: false,
      resumable: true,
    };

    return data
  },
  computed: {
    uploadUrl: function() {
      if (this.resumable) {
        return 'https://master.tus.io/files/';
      }
      return uploadUrl;
    },
  },
  methods: {
    filesSelected: function(fileRecords: FileRecord[]) {
      console.log(fileRecords);
      console.log(JSON.stringify(fileRecords));
      // manual handling
      // this.$refs.vueFileInput.upload(this.uploadUrl, fileRecords);
    },
    fileDeleted: function(fileRecord: FileRecord) {
      // manual handling
      // this.$refs.vueFileInput.deleteUpload(this.uploadUrl, fileRecord);
    },
    switchTheme: function() {
      this.theme = this.theme == 'list' ? 'default' : 'list';
    },
  },
  mounted: function() {
    addTusClient(plugins);

    var style = window.getComputedStyle(<HTMLElement>this.$refs.screenDetector);
    if (style && style.display == 'none') {
      // probably mobile
      this.theme = 'list';
    }
  },
});
</script>
