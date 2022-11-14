<template>
  <div
    :class="[
      'file-preview-wrapper-' + fileRecord.ext(),
      fileRecord.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other',
      'file-category-' + fileRecord.icon().category,
      {'file-is-playing-av': fileRecord.isPlayingAv},
      {'is-deletable': deletable === true},
      {'is-editable': editable === true},
      {'is-edit-input-focused': isEditInputFocused},
      {'has-error': fileRecord.error},
    ]"
  >
    <div
      v-if="fileRecord.isPlayableAudio() || fileRecord.isPlayableVideo()"
      ref="wrapper"
      class="file-av-wrapper"
    >
      <div class="file-av-action" @click="playAv(fileRecord)">
        <span class="file-av-stop">
          <VueFileIcon name="system-close" />
        </span>
        <span class="file-av-play">
          <VueFileIcon name="system-file-av-play" />
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
      <span v-if="fileRecord.error" class="file-error-wrapper" @click="dismissError()">
        <span class="file-error-message file-error-message-client">
          {{ fileRecord.getErrorMessage(errorText) }}
        </span>
      </span>
      <span class="file-preview-overlay" />
      <span
        v-if="fileRecord.isImage() || fileRecord.isPlayableVideo()"
        class="thumbnail"
        style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden"
      >
        <a
          v-if="hasLinkableUrl"
          :href="fileRecord.url()"
          target="_blank"
          :title="fileRecord.name()"
        >
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
        <VueFileIcon name="system-close" />
      </span>
      <span class="file-name" @click="editFileName()">
        <input
          v-if="editable === true"
          ref="input"
          class="file-name-input"
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
        <span v-if="editable === true" class="file-name-edit-icon">
          <VueFileIcon name="system-file-name-edit" />
        </span>
        <span class="file-name-text">{{ fileRecord.name(true) }}</span>
      </span>
      <span
        v-if="fileRecord.dimensions.width && fileRecord.dimensions.height"
        class="image-dimension"
      >
        <span class="image-dimension-width">{{ fileRecord.dimensions.width }}</span
        ><span class="image-dimension-height">{{ fileRecord.dimensions.height }}</span>
      </span>
      <span
        v-if="fileRecord.hasProgress()"
        class="file-progress"
        :class="{
          'file-progress-full': fileRecord.progress() >= 99.9999,
          'file-progress-done': fileRecord.progress() >= 100,
          'has-file-progress': fileRecord.progress() > 0,
        }"
      >
        <span class="file-progress-bar" :style="{width: fileRecord.progress() + '%'}" />
      </span>
      <span class="file-icon">
        <a
          v-if="hasLinkableUrl"
          :href="fileRecord.url()"
          target="_blank"
          :title="fileRecord.name()"
        >
          <VueFileIcon :ext="fileRecord.ext()" />
        </a>
        <VueFileIcon v-else :ext="fileRecord.ext()" />
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import {defineComponent, PropType} from 'vue'
import VueFileIcon from './VueFileIcon.vue'
import FileRecord, {ErrorText} from '../lib/file-record'
import utils from '../lib/utils'

export default /* #__PURE__ */ defineComponent({
  name: 'VueFilePreview',
  components: {
    VueFileIcon,
  },
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
  emits: ['dismisserror', 'remove', 'rename'],
  data() {
    return {
      isEditInputFocused: false,
      isEditCancelable: true,
    }
  },
  computed: {
    hasLinkableUrl(): boolean {
      if (!this.linkable) {
        return false
      }
      return (
        !!this.fileRecord.url() &&
        !this.fileRecord.isPlayableVideo() &&
        !this.fileRecord.isPlayableAudio()
      )
    },
  },
  watch: {
    fileRecord: {
      handler() {
        // fileRecord is updated, but the component not redrawn when used inside a loop
        // -> force update in the meantime
        this.$forceUpdate()
      },
      deep: true,
    },
  },
  methods: {
    createThumbnail(fileRecord: FileRecord, video: HTMLVideoElement) {
      if (fileRecord.videoThumbnail) {
        video.poster = fileRecord.src()
        return
      }
      const canvas = document.createElement('canvas')
      utils
        .createVideoThumbnail(
          video,
          canvas,
          this.fileRecord.thumbnailSize,
          this.averageColor !== false,
          this.withCredentials === true
        )
        .then((thumbnail) => {
          fileRecord.imageColor = thumbnail.color
          fileRecord.videoThumbnail = thumbnail.url
          fileRecord.dimensions.width = thumbnail.width
          fileRecord.dimensions.height = thumbnail.height
          video.poster = fileRecord.src()
        })
    },
    playAv(fileRecord: FileRecord) {
      if (fileRecord.stopAv) {
        fileRecord.stopAv()
        return
      }
      const {createObjectURL} = window.URL || window.webkitURL || {}
      const {revokeObjectURL} = window.URL || window.webkitURL || {}

      const wrapper = this.$refs.wrapper as HTMLElement
      const player = document.createElement(fileRecord.isAudio() ? 'audio' : 'video')
      if (player instanceof HTMLVideoElement && fileRecord.isPlayableVideo()) {
        this.createThumbnail(fileRecord, player)
      }
      player.controls = true
      // player.style.width = this.prvWidth + 'px';
      wrapper.appendChild(player)
      const url = (fileRecord.url() as string) || createObjectURL(fileRecord.file)
      player.src = url
      player.play()
      fileRecord.isPlayingAv = true
      fileRecord.stopAv = () => {
        // player.src = null;
        player.src = ''
        wrapper.removeChild(player)
        revokeObjectURL(url)
        fileRecord.isPlayingAv = false
        fileRecord.stopAv = null
      }
    },
    removeFileRecord(fileRecord: FileRecord) {
      if (this.clearFilename()) {
        return
      }
      if (this.disabled === true) {
        return
      }
      this.$emit('remove', fileRecord)
    },
    editFileName() {
      if (this.editable !== true) {
        return
      }
      if (!this.$refs.input) {
        return
      }
      ;(this.$refs.input as HTMLInputElement).focus()
    },
    editInputFocused() {
      this.isEditInputFocused = true
      this.isEditCancelable = true
    },
    editInputBlured() {
      const {fileRecord} = this
      fileRecord.oldFileName = this.fileRecord.name()
      const oldFilenameWithoutExt = this.fileRecord.name(true)
      const {value} = this.$refs.input as HTMLInputElement
      fileRecord.customName = value
      const newValueWithoutExt = this.fileRecord.name(true)
      if (newValueWithoutExt !== oldFilenameWithoutExt) {
        fileRecord.oldCustomName = oldFilenameWithoutExt
        this.$emit('rename', fileRecord)
      }
      const timeout = 100
      window.setTimeout(() => {
        this.$nextTick(() => {
          if (!this.isEditCancelable) {
            return
          }
          this.isEditInputFocused = false
        })
      }, timeout)
    },
    filenameChanged(completed?: boolean) {
      if (completed) {
        ;(this.$refs.input as HTMLInputElement).blur() // @see editInputBlured method
      }
      if (completed === false) {
        this.clearFilename()
      }
    },
    filenameClearPressed() {
      if (!(this.editable === true && this.isEditInputFocused)) {
        return
      }
      this.isEditCancelable = false
    },
    clearFilename() {
      if (!(this.editable === true && this.isEditInputFocused)) {
        return false
      }
      ;(this.$refs.input as HTMLInputElement).value = ''
      this.isEditCancelable = true
      this.editInputBlured()
      return true
    },
    dismissError() {
      if (this.fileRecord.error && (this.fileRecord.error.size || this.fileRecord.error.type)) {
        return
      }

      this.$emit('dismisserror', this.fileRecord)
    },
  },
})
</script>
