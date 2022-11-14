<template>
  <div
    :class="[
      'file-preview-wrapper-' + fileRecord.ext(),
      fileRecord.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other',
      'file-category-' + fileRecord.icon().category,
      { 'file-is-playing-av': fileRecord.isPlayingAv },
      { 'is-deletable': deletable === true },
      { 'is-editable': editable === true },
      { 'is-edit-input-focused': isEditInputFocused },
      { 'has-error': fileRecord.error },
    ]"
  >
    <div ref="wrapper" class="file-av-wrapper" v-if="fileRecord.isPlayableAudio() || fileRecord.isPlayableVideo()">
      <div class="file-av-action" @click="playAv(fileRecord)">
        <span class="file-av-stop">
          <VueFileIcon name="system-close"></VueFileIcon>
        </span>
        <span class="file-av-play">
          <VueFileIcon name="system-file-av-play"></VueFileIcon>
        </span>
      </div>
    </div>
    <span
      class="file-preview"
      :class="{
        'image-preview': fileRecord.isImage(),
        'other-preview': !fileRecord.isImage(),
        'dark-content': fileRecord.isImage() && fileRecord.isDarkColor(),
      }"
      :style="{
        'background-color': fileRecord.color(),
      }"
    >
      <span class="file-error-wrapper" v-if="fileRecord.error" @click="dismissError()">
        <span class="file-error-message file-error-message-client">
          {{ fileRecord.getErrorMessage(errorText) }}
        </span>
      </span>
      <span class="file-preview-overlay"></span>
      <span
        class="thumbnail"
        style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden;"
        v-if="fileRecord.isImage() || fileRecord.isPlayableVideo()"
      >
        <a v-if="hasLinkableUrl" :href="fileRecord.url()" target="_blank" :title="fileRecord.name()">
          <img class="file-preview-img" :src="fileRecord.src()" />
        </a>
        <img v-else class="file-preview-img" :src="fileRecord.src()" />
      </span>
      <span class="file-ext">{{ fileRecord.ext() }}</span>
      <span class="file-size">{{ fileRecord.size() }}</span>
      <span
        v-if="deletable"
        class="file-delete"
        @click="removeFileRecord(fileRecord)"
        @touchstart="filenameClearPressed()"
        @mousedown="filenameClearPressed()"
      >
        <VueFileIcon name="system-close"></VueFileIcon>
      </span>
      <span class="file-name" @click="editFileName()">
        <input
          class="file-name-input"
          ref="input"
          v-if="editable === true"
          :disabled="disabled === true"
          type="text"
          :value="fileRecord.name(true)"
          @focus="editInputFocused()"
          @blur="editInputBlured()"
          @change="filenameChanged()"
          @input="filenameChanged()"
          @keyup.enter="filenameChanged(true)"
          @keyup.esc="filenameChanged(false)"
        />
        <span class="file-name-edit-icon" v-if="editable === true">
          <VueFileIcon name="system-file-name-edit"></VueFileIcon>
        </span>
        <span class="file-name-text">{{ fileRecord.name(true) }}</span>
      </span>
      <span v-if="fileRecord.dimensions.width && fileRecord.dimensions.height" class="image-dimension">
        <span class="image-dimension-width">{{ fileRecord.dimensions.width }}</span
        ><span class="image-dimension-height">{{ fileRecord.dimensions.height }}</span>
      </span>
      <span
        class="file-progress"
        v-if="fileRecord.hasProgress()"
        :class="{
          'file-progress-full': fileRecord.progress() >= 99.9999,
          'file-progress-done': fileRecord.progress() >= 100,
          'has-file-progress': fileRecord.progress() > 0,
        }"
      >
        <span class="file-progress-bar" :style="{ width: fileRecord.progress() + '%' }"></span>
      </span>
      <span class="file-icon">
        <a v-if="hasLinkableUrl" :href="fileRecord.url()" target="_blank" :title="fileRecord.name()">
          <VueFileIcon :ext="fileRecord.ext()"></VueFileIcon>
        </a>
        <VueFileIcon v-else :ext="fileRecord.ext()"></VueFileIcon>
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import {defineComponent, PropType} from 'vue'
import VueFileIcon from './VueFileIcon.vue';
import FileRecord, { ErrorText } from '../lib/file-record'
import utils from '../lib/utils'

export default /* #__PURE__ */ defineComponent({
  name: 'VueFilePreview',
  props: {
    averageColor: Boolean,
    deletable: Boolean, 
    disabled: Boolean,
    editable: Boolean,
    errorText: {
      type: Object as PropType<ErrorText>,
      required: false,
    },
    linkable: Boolean,
    thumbnailSize: Number,
    fileRecord: {
      type: Object as PropType<FileRecord>,
      required: true,
    },
    withCredentials: Boolean,
  },
  components: {
    VueFileIcon,
  },
  data() {
    return {
      isEditInputFocused: false,
      isEditCancelable: true,
    };
  },
  computed: {
    hasLinkableUrl(): boolean {
      if (!this.linkable) {
        return false;
      }
      return !!this.fileRecord.url() && !this.fileRecord.isPlayableVideo() && !this.fileRecord.isPlayableAudio();
    },
  },
  methods: {
    createThumbnail(fileRecord: FileRecord, video: HTMLVideoElement) {
      if (fileRecord.videoThumbnail) {
        video.poster = fileRecord.src();
        return;
      }
      const canvas = document.createElement('canvas');
      utils
        .createVideoThumbnail(
          video,
          canvas,
          this.fileRecord.thumbnailSize,
          this.averageColor !== false,
          this.withCredentials === true
        )
        .then((thumbnail) => {
          fileRecord.imageColor = thumbnail.color;
          fileRecord.videoThumbnail = thumbnail.url;
          fileRecord.dimensions.width = thumbnail.width;
          fileRecord.dimensions.height = thumbnail.height;
          video.poster = fileRecord.src();
        });
    },

    playAv(fileRecord: FileRecord) {
      if (fileRecord.stopAv) {
        fileRecord.stopAv();
        return;
      }
      const createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
      const revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;

      const wrapper = this.$refs.wrapper as HTMLElement;
      const player = document.createElement(fileRecord.isAudio() ? 'audio' : 'video');
      if (player instanceof HTMLVideoElement && fileRecord.isPlayableVideo()) {
        this.createThumbnail(fileRecord, player);
      }
      player.controls = true;
      // player.style.width = this.prvWidth + 'px';
      wrapper.appendChild(player);
      const url = (fileRecord.url() as string) || createObjectURL(fileRecord.file);
      player.src = url;
      player.play();
      fileRecord.isPlayingAv = true;
      fileRecord.stopAv = () => {
        // player.src = null;
        player.src = '';
        wrapper.removeChild(player);
        revokeObjectURL(url);
        fileRecord.isPlayingAv = false;
        fileRecord.stopAv = null;
      };
    },

    removeFileRecord(fileRecord: FileRecord) {
      if (this.clearFilename()) {
        return;
      }
      if (this.disabled === true) {
        return;
      }
      this.$emit('remove', fileRecord);
    },

    editFileName() {
      if (this.editable !== true) {
        return;
      }
      if (!this.$refs.input) {
        return;
      }
      (this.$refs.input as HTMLInputElement).focus();
    },

    editInputFocused() {
      this.isEditInputFocused = true;
      this.isEditCancelable = true;
    },

    editInputBlured() {
      this.fileRecord.oldFileName = this.fileRecord.name();
      const oldValue = this.fileRecord.name(true);
      const value = (this.$refs.input as HTMLInputElement).value;
      this.fileRecord.customName = value;
      const newValue = this.fileRecord.name(true);
      if (newValue !== oldValue) {
        this.fileRecord.oldCustomName = oldValue;
        this.$emit('rename', this.fileRecord);
      }
      const timeout = 100;
      window.setTimeout(() => {
        this.$nextTick(() => {
          if (!this.isEditCancelable) {
            return;
          }
          this.isEditInputFocused = false;
        });
      }, timeout);
    },

    filenameChanged(completed?: boolean) {
      if (completed) {
        (this.$refs.input as HTMLInputElement).blur(); // @see editInputBlured method
      }
      if (completed === false) {
        this.clearFilename();
      }
    },

    filenameClearPressed() {
      if (!(this.editable === true && this.isEditInputFocused)) {
        return;
      }
      this.isEditCancelable = false;
    },

    clearFilename() {
      if (!(this.editable === true && this.isEditInputFocused)) {
        return false;
      }
      (this.$refs.input as HTMLInputElement).value = '';
      this.isEditCancelable = true;
      this.editInputBlured();
      return true;
    },

    dismissError() {
      if (this.fileRecord.error && (this.fileRecord.error.size || this.fileRecord.error.type)) {
        return;
      }
      this.fileRecord.error = false;
    },
  },
  watch: {
    fileRecord: {
      handler() {
        // fileRecord is updated, but the component not redrawn when used inside a loop
        // -> force update in the meantime
        this.$forceUpdate();
      },
      deep: true
    },
  },
});
</script>
