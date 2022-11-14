import {App, Plugin} from 'vue'
import Components from './components'
import './scss/vue-file-agent.scss'

// All available components
// Keep this list in sync with /components/index.ts please
import VueFileIcon from './components/VueFileIcon.vue';
import VueFilePreview from './components/VueFilePreview.vue';
import VueFileList from './components/VueFileList.vue';
import VueFileListItem from './components/VueFileListItem.vue';
import VueFileAgent from './components/VueFileAgent.vue';

// Export available utils
export { default as plugins } from './lib/plugins';

// Export components
export {
  VueFileIcon,
  VueFilePreview,
  VueFileList,
  VueFileListItem,
  VueFileAgent,
}

// Export types
export type { Sortable, SortEvent } from './types'

// Inject all components into the global @vue/runtime-core
// This allows intellisense in templates w/out direct importing
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VueFileIcon: typeof VueFileIcon
    VueFilePreview: typeof VueFilePreview
    VueFileList: typeof VueFileList
    VueFileListItem: typeof VueFileListItem
    VueFileAgent: typeof VueFileAgent
  }
}

// Main app plugin
const plugin: Plugin = {
  install(app: App) {
    Object.entries(Components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

export {plugin as VueFileAgentNext}
export default plugin
