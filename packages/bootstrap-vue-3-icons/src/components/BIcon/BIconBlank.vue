<script lang="ts">
import {defineComponent, h} from 'vue'
import BIconBase from './BIconBase.vue'

export default /* #__PURE__ */ defineComponent({
  name: 'BIconBlank',
  components: {BIconBase},
  props: {},
  setup() {
    return () =>
      h(
        BIconBase,
        {
          content: '',
        },
        {
          default: () => '',
        }
      )
  },
})
</script>
