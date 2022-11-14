<template>
  <div
    @dragover="dragOver"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
    @drop="drop"
    :class="[
      'is-sortable-' + (isSortable ? 'enabled' : 'disabled'),
      {
        'is-sortable-hold': sortable === 'hold',
        'is-sortable-handle': sortable === 'handle',
        'is-sortable-immediately': sortable === true,
        'is-sorting': isSorting,
        'is-sorting-active': isSortingActive,
        'is-drag-over': isDragging,
        'is-disabled': disabled === true,
        'is-readonly': readonly === true,
        'is-drag-valid': !(disabled === true || readonly === true || (hasMultiple && !canAddMore)),
      },
      'theme-' + theme,
    ]"
    :id="'vfa-' + uniqueId"
  >
    <slot name="before-outer"></slot>
    <div
      class="grid-block-wrapper vue-file-agent file-input-wrapper"
      :class="{
        'is-compact': !!compact,
        'is-single': !hasMultiple,
        'has-multiple': hasMultiple,
        'no-meta': meta === false,
      }"
    >
      <slot name="before-inner"></slot>
      <canvas ref="thumbnailCanvas" style="position: fixed; visibility: hidden; z-index: -3;"></canvas>
      <div class="overall-progress" v-if="overallProgress" :class="{ 'overall-progress-full': overallProgress >= 100 }">
        <div class="overall-progress-bar" :style="{ width: overallProgress + '%' }"></div>
        <div class="overall-progress-left" :style="{ width: 100 - overallProgress + '%' }"></div>
      </div>

      <component
        :is="isSortable ? 'SlickList' : 'VueFileList'"
        v-model:list="fileRecords"
        :axis="theme == 'list' ? 'y' : 'xy'"
        :appendTo="'#vfa-' + uniqueId + ' .vue-file-agent'"
        :transitionDuration="transitionDuration"
        :pressDelay="sortable === 'hold' ? 200 : 0"
        :useDragHandle="sortable === 'handle'"
        @sort-start="sortStart()"
        @sort-end="sortEnd($event)"
        :helperClass="'active-sorting-item'"
      >
        <transition-group name="grid-box" tag="div" class="">
          <component
            :is="isSortable ? 'SlickItem' : 'VueFileListItem'"
              v-for="(element, index) in fileRecords"
              class="file-preview-wrapper grid-box-item grid-block"
              :index="index"
              :key="element.id"
            >
              <slot name="file-preview-before" :fileRecord="element" :fileData="element">
              </slot>
              <slot name="file-preview" :fileRecord="element" :fileData="element">
                <VueFilePreview
                  :averageColor="averageColor"
                  :fileRecord="element"
                  :deletable="isDeletable"
                  :editable="editable === true"
                  :linkable="linkable === true"
                  :errorText="errorText"
                  :disabled="disabled"
                  :thumbnailSize="thumbnailSize"
                  :withCredentials="withCredentials"
                  @remove="removeFileRecord($event)"
                  @rename="filenameChanged($event)"
                  class=""
                ></VueFilePreview>
              </slot>
              <slot name="file-preview-after" :fileRecord="element" :fileData="element">
              </slot>
          </component>
          <template v-if="canAddMore && readonly !== true">
            <slot name="file-preview-new">
              <div key="new" class="file-preview-wrapper grid-box-item grid-block file-preview-new">
                <span class="file-preview">
                  <span style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
                    <VueFileIcon name="system-file-preview-new"></VueFileIcon>
                    <span class="help-text">{{ helpTextComputed }}</span>
                  </span>
                </span>
              </div>
            </slot>
          </template>
        </transition-group>
      </component>
      <input
        title=""
        :disabled="disabled === true || (hasMultiple && !canAddMore)"
        ref="fileInput"
        type="file"
        :multiple="hasMultiple"
        class="file-input"
        @change="filesChanged"
        :accept="accept || '*'"
        :capture="capture"
        v-if="readonly !== true"
      />
      <slot name="after-inner"></slot>
    </div>
    <slot name="after-outer"></slot>
  </div>
</template>
<style lang="scss">
@import '../scss/vue-file-agent.scss';
</style>
<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {SlickList, SlickItem} from 'vue-slicksort'
import utils from '../lib/utils';
import VueFileIcon from './VueFileIcon.vue';
import VueFilePreview from './VueFilePreview.vue';
import VueFileList from './VueFileList.vue';
import VueFileListItem from './VueFileListItem.vue';
import FileRecord from '../lib/file-record';
import { ErrorText, RawFileRecord } from '../lib/file-record';
import uploader, {CreateFormDataFn} from '../lib/upload-helper';
import plugins from '../lib/plugins';
import { ConfigureFn } from '../lib/ajax-request';
import { SortEvent, Sortable } from '../types'


var dragCounter = 0;

export default /* #__PURE__ */ defineComponent({
  name: 'VueFileAgent',
  props: {
    accept: String,
    auto: {
      type: Boolean,
      required: false,
      default: undefined
    },
    averageColor: Boolean,
    capture: {
      type: String as PropType<boolean | 'user' | 'environment'>,
      required: false
    },
    compact: Boolean,
    deletable: Boolean,
    disabled: Boolean,
    editable: Boolean,
    errorText: {
      type: Object as PropType<ErrorText>,
      required: false,
    },
    helpText: String,
    linkable: Boolean,
    maxFiles: Number,
    maxSize: String,
    meta: {
      type: Boolean,
      default: true
    },
    multiple: Boolean,
    // progress: any
    read: Boolean,
    readonly: Boolean,
    resumable: Boolean,
    sortable: {
      type: [String, Boolean] as PropType<Sortable>,
    },
    theme: String,
    thumbnailSize: Number,
    uploadConfig: {
      type: Function as PropType<CreateFormDataFn>,
      required: false,
    },
    uploadHeaders: {
      type: Object,
    },
    uploadUrl: String,
    uploadWithCredentials: Boolean,
    rawModelValue: Array<RawFileRecord>
  },
  components: {
    VueFileIcon,
    VueFilePreview,
    VueFileList,
    VueFileListItem,
    SlickList,
    SlickItem,
  },
  directives: {
    // https://github.com/Jexordexan/vue-slicksort/blob/master/src/HandleDirective.js
    vfaSortableHandle: {
      beforeMount(el: HTMLElement) {
        (el as any).sortableHandle = true;
      },
    },
  },
  data() {
    return {
      fileRecords: [] as FileRecord[],
      rawFileRecords: [] as RawFileRecord[],
      isDragging: false,
      isSorting: false,
      isSortingActive: false,
      transitionDuration: 300,
      overallProgress: 0,
      uniqueId: '',
      sortTimeout: 0,
    };
  },
  computed: {
    withCredentials(): boolean | undefined {
      return this.uploadWithCredentials;
    },
    canAddMore(): boolean {
      if (!this.hasMultiple) {
        return this.fileRecords.length === 0;
      }
      if (!this.maxFiles) {
        return true;
      }
      return this.fileRecords.length < this.maxFiles;
    },
    helpTextComputed(): string {
      if (this.helpText) {
        return this.helpText;
      }
      return 'Choose ' + (this.hasMultiple ? 'files' : 'file') + ' or drag & drop here';
    },
    isDeletable(): boolean {
      if (typeof this.deletable === 'string') {
        return this.deletable !== 'false';
      }
      return !!this.deletable;
    },
    isSortable(): boolean {
      return !!this.sortable;
    },
    hasMultiple(): boolean {
      if (typeof this.multiple === 'string') {
        return this.multiple !== 'false';
      }
      if (this.multiple === undefined) {
        return Array.isArray(this.fileRecords);
      }
      return !!this.multiple;
    },
    shouldRead(): boolean {
      return this.read;
    },
    dragOptions() {
      return {
        animation: this.transitionDuration,
        group: this.uniqueId,
        disabled: this.isSortable,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    createThumbnail(fileRecord: FileRecord, video: HTMLVideoElement): Promise<void> {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        utils
          .createVideoThumbnail(
            video,
            canvas,
            fileRecord.thumbnailSize,
            this.averageColor !== false,
            this.withCredentials
          )
          .then((thumbnail) => {
            fileRecord.imageColor = thumbnail.color;
            fileRecord.videoThumbnail = thumbnail.url;
            fileRecord.dimensions.width = thumbnail.width;
            fileRecord.dimensions.height = thumbnail.height;
            resolve();
          }, reject);
      });
    },
    initVideo(fileRecord: FileRecord): void {
      if (!fileRecord.isPlayableVideo()) {
        return;
      }
      const createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
      const revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;
      const video = document.createElement('video');
      video.src = createObjectURL(fileRecord.file);
      this.createThumbnail(fileRecord, video).then(() => {
        revokeObjectURL(video.src);
      });
      video.load();
    },
    getFileRecordOrRawInstance(fileRecordOrRaw: FileRecord | RawFileRecord, raw: boolean): FileRecord | RawFileRecord {
      let i;
      if (fileRecordOrRaw instanceof FileRecord) {
        i = this.fileRecords.indexOf(fileRecordOrRaw);
      } else {
        i = this.rawFileRecords.indexOf(fileRecordOrRaw);
      }
      if (i === -1) {
        return fileRecordOrRaw;
      }
      return raw ? this.rawFileRecords[i] : this.fileRecords[i];
    },
    getFileRecordRawInstance(fileRecordOrRaw: FileRecord | RawFileRecord): RawFileRecord {
      return this.getFileRecordOrRawInstance(fileRecordOrRaw, true) as RawFileRecord;
    },
    getFileRecordInstance(fileRecordOrRaw: FileRecord | RawFileRecord): FileRecord {
      return this.getFileRecordOrRawInstance(fileRecordOrRaw, false) as FileRecord;
    },
    prepareConfigureFn(configureXhr?: ConfigureFn) {
      const withCredentials = this.uploadWithCredentials;
      if (withCredentials !== true && withCredentials !== false) {
        return configureXhr;
      }
      return (request: XMLHttpRequest) => {
        request.withCredentials = withCredentials;
        if (typeof configureXhr === 'function') {
          configureXhr(request);
        }
      };
    },
    upload(
      url: string,
      headers: object,
      fileRecordsOrRaw: FileRecord[] | RawFileRecord[],
      createFormData?: (fileRecord: FileRecord) => FormData,
      configureXhr?: ConfigureFn
    ): Promise<any> {
      const validFileRecords: FileRecord[] = [];
      const validFilesRawData: RawFileRecord[] = [];
      for (const fileRecordOrRaw of fileRecordsOrRaw) {
        const fileRecord = this.getFileRecordInstance(fileRecordOrRaw);
        if (!fileRecord.error) {
          validFileRecords.push(fileRecord);
          validFilesRawData.push(this.getFileRecordRawInstance(fileRecord));
        }
      }
      if (this.resumable) {
        return uploader.tusUpload(
          plugins.tus,
          url,
          headers,
          validFileRecords,
          (overallProgress) => {
            this.overallProgress = overallProgress;
          },
          this.resumable === true ? undefined : this.resumable,
          this.uploadWithCredentials
        );
      }
      return new Promise((resolve, reject) => {
        uploader
          .upload(
            url,
            headers,
            validFileRecords,
            createFormData,
            (overallProgress) => {
              this.overallProgress = overallProgress;
            },
            this.prepareConfigureFn(configureXhr)
          )
          .then(
            (res: any) => {
              for (let i = 0; i < res.length; i++) {
                res[i].fileRecord = validFilesRawData[i];
              }
              this.$emit('upload', res);
              resolve(res);
            },
            (err: any) => {
              for (let i = 0; i < err.length; i++) {
                err[i].fileRecord = validFilesRawData[i];
              }
              this.$emit('upload:error', err);
              reject(err);
            }
          );
      });
    },
    deleteUpload(
      url: string,
      headers: object,
      fileRecordOrRaw: FileRecord | RawFileRecord,
      uploadData?: any,
      configureXhr?: ConfigureFn
    ): Promise<any> {
      if (this.fileRecords.length < 1) {
        this.overallProgress = 0;
      }
      const fileRecord = this.getFileRecordInstance(fileRecordOrRaw);
      const rawFileRecord = this.getFileRecordRawInstance(fileRecordOrRaw);
      if (this.resumable) {
        return uploader.tusDeleteUpload(plugins.tus, url, headers, fileRecord);
      }
      return new Promise((resolve, reject) => {
        uploader
          .deleteUpload(url, headers, fileRecord as FileRecord, uploadData, this.prepareConfigureFn(configureXhr))
          .then(
            (res: any) => {
              res.fileRecord = rawFileRecord;
              this.$emit('upload:delete', res);
              resolve(res);
            },
            (err: any) => {
              err.fileRecord = rawFileRecord;
              this.$emit('upload:delete:error', err);
              reject(err);
            }
          );
      });
    },
    updateUpload(
      url: string,
      headers: object,
      fileRecord: FileRecord | RawFileRecord,
      uploadData?: any,
      configureXhr?: ConfigureFn
    ): Promise<any> {
      fileRecord = this.getFileRecordInstance(fileRecord);
      const rawFileRecord = this.getFileRecordRawInstance(fileRecord);
      return new Promise((resolve, reject) => {
        uploader
          .updateUpload(url, headers, fileRecord as FileRecord, uploadData, this.prepareConfigureFn(configureXhr))
          .then(
            (res: any) => {
              res.fileRecords = rawFileRecord;
              this.$emit('upload:update', res);
              resolve(res);
            },
            (err) => {
              err.fileRecords = rawFileRecord;
              this.$emit('upload:update:error', err);
              reject(err);
            }
          );
      });
    },
    autoUpload(fileRecords: FileRecord[]): Promise<any> {
      if (!this.uploadUrl || this.auto === false) {
        return Promise.resolve(false);
      }
      return this.upload(this.uploadUrl, this.uploadHeaders as object, fileRecords, this.uploadConfig);
    },
    autoDeleteUpload(fileRecord: FileRecord | RawFileRecord): Promise<any> {
      if (!this.uploadUrl || this.auto === false) {
        return Promise.resolve(false);
      }
      return this.deleteUpload(this.uploadUrl, this.uploadHeaders as object, fileRecord, this.uploadConfig);
    },
    autoUpdateUpload(fileRecord: FileRecord): Promise<any> {
      if (!this.uploadUrl || this.auto === false) {
        return Promise.resolve(false);
      }
      return this.updateUpload(this.uploadUrl, this.uploadHeaders as object, fileRecord, this.uploadConfig);
    },
    equalFiles(file1: File, file2: File): boolean {
      return (
        true &&
        file1.name === file2.name &&
        file1.size === file2.size &&
        file1.type === file2.type &&
        // file1.lastModifiedDate.getTime() === file2.lastModifiedDate.getTime() &&
        file1.lastModified === file2.lastModified
      );
    },
    isFileAddedAlready(file: File): boolean {
      for (const fileRecord of this.fileRecords) {
        if (this.equalFiles(file, fileRecord.file as File)) {
          return true;
        }
      }
      return false;
    },
    handleFiles(files: File[] | FileList): void {
      if (this.disabled === true || this.readonly === true) {
        return;
      }
      if (this.hasMultiple && !this.canAddMore) {
        return;
      }
      const fileRecords: FileRecord[] = [];
      const filesFiltered: File[] = [];
      // tslint:disable-next-line
      for (let i = 0; i < files.length; i++) {
        if (this.hasMultiple && this.isFileAddedAlready(files[i])) {
          continue;
        }
        filesFiltered.push(files[i]);
      }
      files = filesFiltered;
      if (this.hasMultiple && this.maxFiles && files.length > this.maxFiles - this.fileRecords.length) {
        files = files.slice(0, this.maxFiles - this.fileRecords.length);
      }
      for (const file of files) {
        fileRecords.push(
          new FileRecord(
            {
              file,
            } as RawFileRecord,
            {
              read: this.shouldRead,
              maxSize: this.maxSize,
              accept: this.accept,
              thumbnailSize: this.thumbnailSize,
              averageColor: this.averageColor,
              withCredentials: this.withCredentials,
            }
          )
        );
      }

      for (const fileRecord of fileRecords) {
        if (fileRecord.file.size <= 20 * 1024 * 1024) {
          // <= 20MB
          this.initVideo(fileRecord);
        }
      }
      if (this.hasMultiple) {
        // splice: for list transitions to work properly
        this.fileRecords.splice(this.fileRecords.length, 0, ...fileRecords);
      } else {
        this.fileRecords = fileRecords;
      }

      FileRecord.readFiles(fileRecords).then((fileRecordsNew: FileRecord[]) => {
        const allFileRecordsRaw = FileRecord.toRawArray(this.fileRecords);
        this.rawFileRecords = allFileRecordsRaw;

        this.$emit('update:rawModelValue', this.rawFileRecords);
        this.$emit('select', fileRecordsNew);
      });
      this.autoUpload(fileRecords);
    },
    filesChanged(event: Event): void {
      let files: File[] | FileList = (event.target as HTMLInputElement).files as FileList;
      this.$emit('change', event);
      if (!files[0]) {
        return;
      }
      if (!this.hasMultiple) {
        files = [files[0]];
      }
      this.handleFiles(files);
      if (this.$refs.fileInput) {
        (this.$refs.fileInput as any).value = null; // do not use ''
        // because chrome won't fire change event for same file
      }
    },
    drop(event: DragEvent): void {
      event.stopPropagation();
      event.preventDefault();
      dragCounter = 0;
      this.isDragging = false;
      if (this.disabled === true || this.readonly === true) {
        return;
      }
      if (!event.dataTransfer) {
        return;
      }
      utils.getFilesFromDroppedItems(event.dataTransfer).then((files) => {
        this.$emit('drop', event);
        if (!files || !files[0]) {
          return;
        }
        if (!this.hasMultiple) {
          files = [files[0]];
        }
        this.handleFiles(files);
      });
    },
    dragEnter(event: DragEvent): void {
      if (!event.dataTransfer) {
        return;
      }
      this.isDragging = true;
      event.stopPropagation();
      event.preventDefault();
      dragCounter++;
      event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    },
    dragOver(event: DragEvent): void {
      if (!event.dataTransfer) {
        return;
      }
      this.isDragging = true;
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    },
    dragLeave(event: DragEvent): void {
      if (!event.dataTransfer) {
        return;
      }
      dragCounter--;
      if (dragCounter === 0) {
        this.isDragging = false;
      }
    },
    removeFileRecord(fileRecord: FileRecord): void {
      this.$emit('beforedelete', fileRecord);

      if (!this.uploadUrl || this.auto === false) {
        let i = this.fileRecords.indexOf(fileRecord);

        if (i !== -1) {
          this.fileRecords.splice(i, 1)[0];
          this.rawFileRecords.splice(i, 1)[0];
          this.$emit('update:rawModelValue', this.rawFileRecords);
        }

        return;
      }
      this.deleteFileRecord(fileRecord);
    },
    deleteFileRecord(fileRecordOrRaw: FileRecord): void {
      let i: number;
      if (fileRecordOrRaw instanceof FileRecord) {
        i = this.fileRecords.indexOf(fileRecordOrRaw);
      } else {
        i = this.rawFileRecords.indexOf(fileRecordOrRaw);
      }
      let fileRecord = this.fileRecords[i];
      let rawFileRecord = this.rawFileRecords[i];
      this.$emit('update:rawModelValue', this.rawFileRecords);
      this.$emit('delete', fileRecord);
      fileRecord = this.fileRecords.splice(i, 1)[0];
      rawFileRecord = this.rawFileRecords.splice(i, 1)[0];
      this.autoDeleteUpload(fileRecord).then(
        (res) => {
          /* no op */
        },
        (err) => {
          this.fileRecords.splice(i, 0, fileRecord);
          this.rawFileRecords.splice(i, 0, rawFileRecord);
        }
      );
    },
    filenameChanged(fileRecord: FileRecord): void {
      this.$emit('rename', FileRecord.toRawArray([fileRecord])[0]);
      this.autoUpdateUpload(fileRecord).then(
        (res) => {
          /* no op */
        },
        (err) => {
          fileRecord.customName = fileRecord.oldCustomName;
        }
      );
    },
    checkValue(): void {
      if(this.rawFileRecords === this.rawModelValue) {
        this.$emit('update:modelValue', this.fileRecords);
        return;
      }

      let rawFileRecords: RawFileRecord[] = this.rawModelValue || [];
      rawFileRecords = Array.isArray(rawFileRecords) ? rawFileRecords : [rawFileRecords];

      const fdPromises: Array<Promise<FileRecord>> = [];
      const rawFileRecordsNew: RawFileRecord[] = [];

      for (let i = 0; i < rawFileRecords.length; i++) {
        const existingIndex = this.rawFileRecords.indexOf(rawFileRecords[i]);
        if (existingIndex !== -1) {
          fdPromises.push(Promise.resolve(this.fileRecords[existingIndex]));
          rawFileRecordsNew[i] = this.rawFileRecords[existingIndex];
        } else {
          // TODO: hier wird der Inhalt vom Original (rawFileRecords[i]) modifiziert!
          fdPromises.push(
            FileRecord.fromRaw(rawFileRecords[i], {
              read: this.shouldRead,
              maxSize: this.maxSize,
              accept: this.accept,
              thumbnailSize: this.thumbnailSize,
              averageColor: this.averageColor,
              withCredentials: this.withCredentials,
            })
          );
          rawFileRecordsNew.push(rawFileRecords[i]);
        }
      }

      this.rawFileRecords = rawFileRecordsNew;
      Promise.all(fdPromises).then((fileRecords) => {
        this.fileRecords = fileRecords;
        this.$emit('update:modelValue', this.fileRecords);
      });

      this.$emit('update:rawModelValue', this.rawFileRecords);
    },
    sortStart(): void {
      if (this.sortTimeout) {
        window.clearTimeout(this.sortTimeout);
      }
      this.isSorting = true;
      this.isSortingActive = true;
    },
    sortEnd(sortData: SortEvent): void {
      this.isSortingActive = false;
      if (this.sortTimeout) {
        clearTimeout(this.sortTimeout);
      }
      this.sortTimeout = window.setTimeout(() => {
        this.isSorting = false;
      }, this.transitionDuration + 100);
      this.sort(sortData.oldIndex, sortData.newIndex);
    },
    sort(from: number, to: number) {
      if (from !== to) {
        const rawFileRecords = utils.arrayMove(this.rawFileRecords, from, to);
        this.$nextTick(() => {
          this.$emit('update:rawModelValue', rawFileRecords);
          this.$emit('sort', {
            oldIndex: from,
            newIndex: to,
          },
          rawFileRecords);
        });
      }
    }
  },
  created() {
    this.uniqueId = new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
    this.checkValue();
  },
  watch: {
    rawModelValue: {
      handler() {
        this.checkValue();
      },
      deep: true
    }
  },
});
</script>
