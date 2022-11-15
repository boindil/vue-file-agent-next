<h1 align="center">Vue File Agent for Vue 3</h1>
<p align="center">Every file deserves to be treated equally</p>

<br>

<p align="center">
  <a href="https://www.npmjs.com/package/@boindil/vue-file-agent-next">
    <img src="https://flat.badgen.net/npm/v/@boindil/vue-file-agent-next" alt="Current version">
  </a>
  <a href="https://v3.vuejs.org/">
    <img src="https://flat.badgen.net/badge/vue.js/3.0.x/4fc08d" alt="Vue.js version">
  </a>

  <a href="https://github.com/boindil/vue-file-agent-next/actions?workflow=Tests">
    <img src="https://flat.badgen.net/github/status/boindil/vue-file-agent-next" alt="Build status">
  </a>

  <br>

  <a href="https://www.npmjs.com/package/@boindil/vue-file-agent-next">
    <img src="https://flat.badgen.net/npm/dt/@boindil/vue-file-agent-next" alt="npm downloads">
  </a>
  <a href="https://www.npmjs.com/package/@boindil/vue-file-agent-next">
    <img src="https://flat.badgen.net/npm/dw/@boindil/vue-file-agent-next" alt="npm weekly downloads">
  </a>
</p>

High performant Vue file **upload** component with elegant and distinguishable **previews** for every file type and support for **drag and drop**, **validations**, default uploader with **progress** support and externally customizable in the "vue way"

<div class="clearfix"></div>

<!-- ## [Live Demo][] · [CodePen Playground](https://codepen.io/boindil/pen/<not yet ready>) 

![Demo](website/assets/demo.gif?v=1.5)
-->
## Features

- Exclusively designed for Vue with performance and simplicity in mind
- No dependency but small footprint - **17KB** minified, gzipped
- Elegant and responsive design with two official themes: grid view and list view
- File input with drag and drop with support for folders
- Smooth Transitions
- Multiple File Uploads
- Max File Size, Accepted file types validation
- Image/Video/Audio Previews
- File type icons
- Default uploader with progress
- Externally controllable via Vue bindings and methods
- Built in support for server side validation and error handling
- Official [Upload Server Examples](upload-server-examples) for **PHP** and **Node Js**
- File names can be edited with `:editable` prop
- Intuitive drag & drop sortable with `:sortable` prop
- Resumable uploads with `:resumable` prop through [tus.io](https://tus.io) protocol
- Can be used with any css/component framework, including but not limited to: Bootstrap, Bulma, Tailwind, Vuetify, etc.

## Basic Usage

<!-- #### Template -->

<!-- {% raw %}) -->

```html
<template>
  <VueFileAgent :uploadUrl="uploadUrl" v-model="fileRecords" v-model:rawModelValue="rawFileRecords"></VueFileAgent>
</template>
```

<!-- {% endraw %}) -->

**NOTE:** when `uploadUrl` is provided, auto uploading is enabled. See demo examples for manual uploading example.

<!-- #### Script -->

<!-- ```javascript -->

```html
<script>
  export default {
    data() {
      return {
        // ...
        fileRecords: [],
        rawFileRecords: [],
        uploadUrl: 'https://example.com',
        // ...
      };
    },
    // ...
  };
</script>
```

### That's it?

Yes. That's it. It's _that_ simple. See [Advanced Usage](#advanced-usage) section below to tailor it for your specific needs.

## Installation

```console
# NPM
npm install @boindil/vue-file-agent-next --save

# Yarn
yarn add @boindil/vue-file-agent-next

# PNPM
pnpm add @boindil/vue-file-agent-next
```

```javascript
import {createApp} from 'vue'
import VueFileAgentNext from '@boindil/vue-file-agent-next'

import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'

createApp(App).use(VueFileAgentNext).mount('#app')
```

or with script tag

```html
<!-- jsdelivr cdn -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@boindil/vue-file-agent-next@latest/dist/vue-file-agent-next.css" />
<script src="https://cdn.jsdelivr.net/npm/@boindil/vue-file-agent-next@latest/dist/vue-file-agent-next.umd.js"></script>

<!-- unpkg -->
<link rel="stylesheet" href="https://unpkg.com/@boindil/vue-file-agent-next@latest/dist/vue-file-agent-next.css" />
<script src="https://unpkg.com/@boindil/vue-file-agent-next@latest/dist/vue-file-agent-next.umd.js"></script>
```

[Download from Github](https://github.com/boindil/vue-file-agent-next/releases)

## License

The MIT License
