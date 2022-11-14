<template>
  <div class="row">
    <div class="col-md-3 mb-3">
      <div class="bg-light p-2">
        <div class="row mx-n2">
          <div class="col-md-12 col-12 px-2">
            <div class="input-group input-group-sm mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><small>:accept</small></span>
              </div>
              <input
                v-model="valAccept"
                class="form-control"
                type="text"
                placeholder="e.g: image/*,video/*"
              />
              <div class="input-group-append">
                <a
                  class="btn btn-warning"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers"
                  target="_blank"
                >
                  ?
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-12 px-2">
            <div class="input-group input-group-sm mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><small>:capture</small></span>
              </div>
              <input
                v-model="valCapture"
                class="form-control"
                type="text"
                placeholder="e.g: user, environment"
              />
              <div class="input-group-append">
                <a
                  class="btn btn-warning"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-capture"
                  target="_blank"
                >
                  ?
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-6 px-2">
            <div class="input-group input-group-sm mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><small>:maxSize</small></span>
              </div>
              <input
                v-model="valMaxSize"
                class="form-control"
                type="text"
                placeholder="e.g: 500KB, 2.5MB, 1GB"
              />
            </div>
          </div>
          <div class="col-md-12 col-6 px-2">
            <div class="input-group input-group-sm mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><small>:maxFiles</small></span>
              </div>
              <input
                v-model="valMaxFiles"
                class="form-control"
                type="number"
                placeholder="e.g: 4"
              />
            </div>
          </div>
        </div>
        <div class="row mx-n2">
          <div class="col-md-12 px-2 mb-1">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text"><small>Upload URL</small></span>
              </div>
              <input
                id="advanced-demo-upload-url"
                v-model="uploadUrl"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-auto"
                v-model="auto"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-auto">:auto</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-meta"
                v-model="meta"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-meta">:meta</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-multiple"
                v-model="multiple"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-multiple">:multiple</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-readonly"
                v-model="readonly"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-readonly">:readonly</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-disabled"
                v-model="disabled"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-disabled">:disabled</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-linkable"
                v-model="linkable"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-linkable">:linkable</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-editable"
                v-model="editable"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-editable">:editable</label>
            </div>
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-deletable"
                v-model="deletable"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-deletable">:deletable</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-sortable"
                v-model="sortable"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-sortable"
                >:sortable
                <!-- TODO docs --></label
              >
            </div>

            <select v-model="sortable" class="custom-select custom-select-sm mt-1">
              <option selected :value="false">:sortable false</option>
              <!-- <option :value="false">false</option> -->
              <option :value="true">true</option>
              <option value="hold">"hold"</option>
              <option value="handle">"handle"</option>
            </select>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-resumable"
                v-model="resumable"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-resumable"
                >:resumable
                <!-- TODO docs --></label
              >
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <select v-model="theme" class="custom-select custom-select-sm mt-1">
              <option selected>- Theme -</option>
              <option value="default">Default Theme (default)</option>
              <option value="list">List Theme (list)</option>
            </select>
            <!--         <div class="custom-control custom-checkbox mt-1">
            <input type="checkbox" class="custom-control-input" id="advanced-demo-compact" v-model="compact">
            <label class="custom-control-label" for="advanced-demo-compact">:compact</label>
          </div> -->
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input
                id="advanced-demo-averageColor"
                v-model="averageColor"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="advanced-demo-averageColor"
                >:averageColor <small>(this prop is not reactive)</small></label
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-5 col-sm-6 mb-3">
      <div class="mx-auto" :style="compact ? {width: '200px'} : {}">
        <VueFileAgent
          ref="vueFileAgent"
          v-model:rawModelValue="rawFileRecords"
          v-model="fileRecords"
          :auto="auto"
          :average-color="averageColor"
          :upload-url="uploadUrl"
          :upload-headers="uploadHeaders"
          :multiple="multiple"
          :meta="meta"
          :deletable="deletable"
          :editable="editable"
          :linkable="linkable"
          :sortable="sortable"
          :readonly="readonly"
          :resumable="resumable"
          :disabled="disabled"
          :compact="compact"
          :accept="valAccept"
          :capture="valCapture"
          :max-size="valMaxSize"
          :max-files="valMaxFiles"
          :theme="theme"
          @select="filesSelected($event)"
          @delete="fileDeleted($event)"
          @beforedelete="onBeforeDelete($event)"
          @sort="onSort"
          @upload="uploadEvent('upload', $event)"
          @upload:error="uploadEvent('upload:error', $event)"
          @upload:delete="uploadEvent('upload:delete', $event)"
          @upload:delete:error="uploadEvent('upload:delete:error', $event)"
          @upload:update="uploadEvent('upload:update', $event)"
          @upload:update:error="uploadEvent('upload:update:error', $event)"
        />
      </div>
    </div>

    <div class="col-md-4 col-sm-6 mb-3">
      <div class="bg-light p-2">
        <div class="form-inlinex">
          <div class="row">
            <div class="col-md-12">
              <div v-if="!fileRecords.length">No files selected</div>
              <div v-if="fileRecords.length" class="form-inline">
                <label class="my-1 mr-2" for="file-select-index">With File:</label>
                <button
                  v-for="(fileRecord, i) in fileRecords"
                  :key="i"
                  type="button"
                  class="btn mr-1 mb-1"
                  :class="{
                    'btn-secondary': selectedIdx == i + 1,
                    'btn-light': selectedIdx != i + 1,
                  }"
                  @click="selectedIdx = i + 1"
                >
                  {{ i + 1 }}
                </button>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <label class="my-1 mr-2" for="set-progress-range">Set Progess to:</label>
                </div>
                <div class="col-md-12">
                  <input
                    id="set-progress-range"
                    ref="prgInput"
                    type="range"
                    min="0"
                    max="100"
                    class="custom-range"
                    @input="setProgress()"
                    @change="setProgress()"
                  />
                </div>
              </div>

              <button type="button" class="btn btn-outline-secondary mb-2" @click="moveIndex(-1)">
                &lt;&lt;
              </button>
              <button type="button" class="btn btn-outline-secondary mb-2" @click="moveIndex(1)">
                &gt;&gt;
              </button>
              <button type="button" class="btn btn-outline-danger mb-2" @click="remove()">
                Remove
              </button>
              <button type="button" class="btn btn-outline-success mb-2" @click="update()">
                Update
              </button>
              <button type="button" class="btn btn-outline-primary mb-2" @click="upload()">
                Upload
              </button>
            </div>
          </div>

          <hr />

          <div class="mb-2">
            <button
              class="btn btn-outline-secondary mb-2"
              :disabled="!fileRecordsForUpload.length"
              @click="uploadFiles()"
            >
              Upload Queue ({{ fileRecordsForUpload.length }})
            </button>

            <button
              class="btn btn-danger mb-2"
              :disabled="!fileRecordsInvalid.length"
              @click="removeInvalid()"
            >
              Remove Invalid ({{ fileRecordsInvalid.length }})
            </button>

            <button
              type="button"
              class="btn btn-outline-danger mb-2"
              :disabled="!rawFileRecords.length"
              @click="removeAll()"
            >
              Remove All ({{ rawFileRecords.length }})
            </button>
          </div>
          <div>
            Sort by:
            <button
              type="button"
              class="btn btn-outline-secondary mb-2"
              @click="sortBy('lastModified')"
            >
              Last Modified {{ sortDirection.lastModified }}
            </button>
            <button type="button" class="btn btn-outline-secondary mb-2" @click="sortBy('name')">
              Name {{ sortDirection.name }}
            </button>
          </div>
        </div>
        <!-- Move: <input type="number" ref="moveInput" value="1"> -->
        <!-- <input type="number" ref="removeIdx" value="1"> -->

        <!-- Set Progress to: -->
        <!--     <button @click="setProgress()">
            Set Progress 
          </button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import VueFileAgent from '../components/VueFileAgent.vue'
import {addTusClient, getFileRecordsInitial, SortDirection, uploadUrl} from './demo-base'
import FileRecord, {RawFileRecord} from '../lib/file-record'
import {SortEvent} from '../types'
import plugins from '../lib/plugins'

export default defineComponent({
  name: 'DemoAdvanced',
  components: {VueFileAgent},
  data: () => {
    const data: {
      rawFileRecords: RawFileRecord[]
      fileRecords: FileRecord[]
      fileRecordsForUpload: FileRecord[]
      auto: boolean
      averageColor: boolean
      uploadUrl: string
      uploadHeaders: Record<string, unknown>
      meta: boolean
      multiple: boolean
      deletable: boolean
      editable: boolean
      linkable: boolean
      sortable: boolean
      readonly: boolean
      resumable: boolean
      disabled: boolean
      compact: boolean
      theme: string
      sortDirection: SortDirection
      selectedIdx: number
      valAccept: string
      valCapture: boolean | 'user' | 'environment' | undefined
      valMaxSize: string
      valMaxFiles: number
    } = {
      rawFileRecords: getFileRecordsInitial(),
      fileRecords: [],
      fileRecordsForUpload: [],
      auto: false,
      averageColor: true,
      uploadUrl,
      uploadHeaders: {},
      meta: true,
      multiple: true,
      deletable: true,
      editable: true,
      linkable: true,
      sortable: false,
      readonly: false,
      resumable: false,
      disabled: false,
      compact: false,
      theme: 'list',
      sortDirection: {
        lastModified: 'ASC',
        name: 'ASC',
      },
      selectedIdx: 1,
      valAccept: 'image/*,video/*,.pdf,.doc,.docx,.ods',
      valCapture: undefined,
      valMaxSize: '10MB',
      valMaxFiles: 14,
    }

    return data
  },
  computed: {
    fileRecordsInvalid() {
      const fileRecordsInvalid: RawFileRecord[] = []
      for (let i = 0; i < this.fileRecords.length; i++) {
        if (this.fileRecords[i].error) {
          fileRecordsInvalid.push(this.rawFileRecords[i])
        }
      }
      return fileRecordsInvalid
    },
    uploadEndpoint() {
      if (this.resumable && this.uploadUrl.indexOf('mocky.io') !== -1) {
        return 'https://master.tus.io/files/'
      }
      return this.uploadUrl
    },
  },
  watch: {
    fileRecords() {
      console.log('fileRecords changed')
    },
  },
  mounted() {
    addTusClient(plugins)
  },
  methods: {
    uploadEvent(eventName: string, data: any) {
      console.log('UPLOAD EVENT ', eventName, data)
    },
    getSelectedFileRecord(): FileRecord | undefined {
      let i = this.selectedIdx
      i = i - 1
      if (!this.fileRecords[i]) {
        return
      }
      return this.fileRecords[i]
    },
    removeAll() {
      console.log(this.rawFileRecords)
      this.rawFileRecords = []
      this.fileRecordsForUpload = []
    },
    setProgress() {
      const fileRecord = this.getSelectedFileRecord()
      if (!fileRecord) {
        return
      }
      const prg = (this.$refs.prgInput as HTMLInputElement).value
      fileRecord.progress(parseInt(prg))
    },
    removeInvalid() {
      let fileRecordsNew = this.rawFileRecords.concat([])
      for (let i = 0; i < this.fileRecordsInvalid.length; i++) {
        const idx = fileRecordsNew.indexOf(this.fileRecordsInvalid[i])
        if (idx !== -1) {
          fileRecordsNew.splice(idx, 1)
        }
      }
      fileRecordsNew = []
      for (let i = 0; i < this.fileRecords.length; i++) {
        if (!this.fileRecords[i].error) {
          fileRecordsNew.push(this.rawFileRecords[i])
        }
      }
      this.rawFileRecords = fileRecordsNew // mutate at once, do not splice each
    },
    remove() {
      console.log('removing...')

      let i = this.selectedIdx
      i = i - 1
      if (!this.fileRecords[i]) {
        return
      }

      ;(this.$refs.vueFileAgent as typeof VueFileAgent).removeFileRecord(this.fileRecords[i])
    },
    update() {
      const fileRecord = this.getSelectedFileRecord()
      if (!fileRecord) {
        return
      }
      if (!fileRecord.file) {
        alert('This is not a user selected file')
        return
      }
      ;(this.$refs.vueFileAgent as typeof VueFileAgent).updateUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      )
    },
    upload() {
      console.log('let au debug')
      const fileRecord = this.getSelectedFileRecord()
      if (!fileRecord) {
        return
      }
      if (!fileRecord.file) {
        alert('This is not a user selected file')
        return
      }
      const i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1)
      }

      ;(this.$refs.vueFileAgent as typeof VueFileAgent)
        .upload(this.uploadEndpoint, this.uploadHeaders, [fileRecord])
        .then((result: any) => {
          console.log('uploaded: ', result)
          console.log('after upload: ', fileRecord)
          console.log('after upload all: ', this.fileRecords)
        })
    },
    moveIndex(dir: number) {
      console.log('moveIndex', dir)
      const from = this.selectedIdx - 1
      let to = from + dir
      if (to < 0) {
        to = this.rawFileRecords.length - 1
      }
      if (to >= this.rawFileRecords.length) {
        to = 0
      }
      if (!this.rawFileRecords[from]) {
        return
      }
      ;(this.$refs.vueFileAgent as typeof VueFileAgent).sort(from, to)
    },
    sortBy(prop: keyof SortDirection) {
      // var asc = this['_is_sorted_desc_' + prop] = !this['_is_sorted_desc_' + prop];
      const direction = this.sortDirection[prop]
      this.sortDirection[prop] = direction === 'DESC' ? 'ASC' : 'DESC'
      // console.log('sortBy', prop, this.fileRecords);
      const ret = direction === 'DESC' ? -1 : 1
      this.fileRecords = this.fileRecords.sort(function (fd1: FileRecord, fd2: FileRecord) {
        const f1 = fd1.file || fd1
        const f2 = fd2.file || fd2
        return f1[prop] > f2[prop] ? 1 * ret : -1 * ret
      })
      // console.log('sortBy after', prop, this.fileRecords);
    },

    uploadFiles() {
      // Using the default uploader. You may use another uploader instead.
      ;(this.$refs.vueFileAgent as typeof VueFileAgent).upload(
        this.uploadEndpoint,
        this.uploadHeaders,
        this.fileRecordsForUpload
      )
      this.fileRecordsForUpload = []
    },
    deleteUploadedFile(fileRecord: FileRecord | RawFileRecord) {
      // Using the default uploader. You may use another uploader instead.
      ;(this.$refs.vueFileAgent as typeof VueFileAgent).deleteUpload(
        this.uploadEndpoint,
        this.uploadHeaders,
        fileRecord
      )
    },
    filesSelected(fileRecords: FileRecord[]) {
      console.log('filesSelected', fileRecords)
      const validFileRecords: FileRecord[] = []
      for (let i = 0; i < fileRecords.length; i++) {
        if (!fileRecords[i].error) {
          validFileRecords.push(fileRecords[i])
        }
      }
      console.log('filesSelected', fileRecords, validFileRecords)
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords)
    },
    onBeforeDelete(fileRecord: FileRecord) {
      const i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1)
      } else {
        if (confirm('Are you sure you want to delete?')) {
          ;(this.$refs.vueFileAgent as typeof VueFileAgent).deleteFileRecord(fileRecord) // will trigger 'delete' event
        }
      }
    },
    fileDeleted(fileRecord: FileRecord) {
      const i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1)
      } else {
        this.deleteUploadedFile(fileRecord)
      }
    },
    onSort(event: SortEvent, sortedData: RawFileRecord[]) {
      console.log(
        'sorted',
        event.oldIndex,
        event.newIndex,
        sortedData.map(function (fd) {
          return fd.name
        })
      )
    },
  },
})
</script>
