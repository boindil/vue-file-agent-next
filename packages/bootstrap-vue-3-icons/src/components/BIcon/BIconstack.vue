<script lang="ts">
import {defineComponent, h, PropType, VNode, VNodeArrayChildren} from 'vue'
import normalizeSlot from '../../utils/normalizeSlot'
import {ColorVariant} from '../../types'
import {ICON_COMMON_PROPS} from '../../constants/icon'
import BIconBase from './BIconBase.vue'

export default /* #__PURE__ */ defineComponent({
  name: 'BIconstack',
  components: {BIconBase},
  props: {
    ...ICON_COMMON_PROPS,
    content: {
      type: [String, Object] as PropType<string | number | boolean | VNode | VNodeArrayChildren>,
      required: false,
    },
    title: {type: String, required: false},
    variant: {type: String as PropType<ColorVariant>, required: false},
  },
  setup(props, {slots}) {
    return () =>
      h(
        BIconBase,
        {
          ...props,
          class: 'b-icon-stack',
        },
        {
          default: () => normalizeSlot('default', {}, slots) || '',
        }
      )
  },
})
</script>
