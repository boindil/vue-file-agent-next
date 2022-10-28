import {PropType, VNode, VNodeArrayChildren} from 'vue'
import {Animation, IconSize, TextColorVariant} from '../types'

export const ICON_COMMON_PROPS = {
  animation: {type: String as PropType<Animation>},
  flipH: {type: Boolean, default: false},
  flipV: {type: Boolean, default: false},
  fontScale: {type: [Number, String], default: 1},
  rotate: {
    type: [String, Number],
    required: false,
    validator: (value: string | number) => value >= -360 && value <= 360,
  },
  scale: {type: [Number, String], default: 1},
  shiftH: {type: [Number, String], default: 0},
  shiftV: {type: [Number, String], default: 0},
  size: {type: String as PropType<IconSize>, required: false},
}

export const ICON_BASE_PROPS = {
  ...ICON_COMMON_PROPS,
  class: {type: [Array, Object, String], required: false},
  content: {
    type: [String, Object] as PropType<string | number | boolean | VNode | VNodeArrayChildren>,
    required: false,
  },
  stacked: {type: Boolean, default: false},
  title: {type: String, required: false},
  variant: {type: String as PropType<TextColorVariant>, required: false},
}
