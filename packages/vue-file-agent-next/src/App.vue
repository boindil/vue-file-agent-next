<template>
  <div class="container mb-3">
    <h2>Demo VueFileIcon</h2>
    <div>
      <demo-icons />
    </div>
    <h2>Demo Basic</h2>
    <div class="bg-dark p-3">
      <demo-basic />
    </div>
    <hr />
    <h2>Demo Advanced</h2>
    <div>
      <demo-advanced />
    </div>
    <h2>Demo VueFilePreview</h2>
    <div>
      <demo-previews />
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

import DemoBasic from './demo/demo-basic.vue'
import DemoAdvanced from './demo/demo-advanced.vue'
import DemoIcons from './demo/demo-icons.vue'
import DemoPreviews from './demo/demo-previews.vue'

export default defineComponent({
  name: 'App',
  components: {
    DemoBasic,
    DemoAdvanced,
    DemoIcons,
    DemoPreviews,
  },
})
</script>
<style>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
.bg-dark {
  background: #333;
  color: #fff;
}
</style>
