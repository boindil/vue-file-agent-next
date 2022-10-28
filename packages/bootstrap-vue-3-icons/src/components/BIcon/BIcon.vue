<script lang="ts">
import {defineComponent, h, PropType, resolveComponent} from 'vue'
import {ColorVariant} from '../../types'
import {pascalCase, trim} from '../../utils/string'
import {ICON_COMMON_PROPS} from '../../constants/icon'
import BIconBase from './BIconBase.vue'
import BIconBlank from './BIconBlank.vue'

const findIconComponent = (iconName: string): any => resolveComponent(iconName)

export default /* #__PURE__ */ defineComponent({
  name: 'BIcon',
  components: {BIconBase, BIconBlank},
  props: {
    ...ICON_COMMON_PROPS,
    icon: {type: String, required: true},
    stacked: {type: Boolean, default: false},
    title: {type: String, required: false},
    variant: {type: String as PropType<ColorVariant>, required: false},
  },
  setup(props) {
    return () => {
      const icon = pascalCase(trim(props.icon || '')).replace(/^BIcon/, '')
      // If parent context exists, we check to see if the icon has been registered
      // either locally in the parent component, or globally at the `$root` level
      // If not registered, we render a blank icon
      return h(icon ? findIconComponent(`BIcon${icon}`) || BIconBlank : BIconBlank, props, {
        default: () => '',
      })
    }
  },
})
</script>
