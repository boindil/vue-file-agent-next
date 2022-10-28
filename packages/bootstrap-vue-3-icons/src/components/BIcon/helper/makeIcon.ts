import {defineComponent, h, VNode} from 'vue'
import {ICON_BASE_PROPS} from '../../../constants/icon'
import {kebabCase, pascalCase, trim} from '../../../utils/string'
import {omit} from '../../../utils/object'
import BIconBase from '../BIconBase.vue'

const parseFromHtmlString = (str: string): any[] => {
  const doc = new DOMParser().parseFromString('<root>' + str + '</root>', 'text/xml')

  let rendered: VNode[] = []

  Array.from(doc.documentElement.children).forEach((node) => {
    let parsedChildren: VNode[] = []
    if (node.hasChildNodes()) {
      parsedChildren.push(...parseFromHtmlString((<HTMLElement>node).innerHTML))
    }

    rendered.push(
      h(
        node.nodeName,
        Array.from(node.attributes).reduce((accumulator, value) => {
          return {...accumulator, [value.name]: value.value}
        }, {}),
        parsedChildren
      )
    )
  })

  return rendered
}

export const makeIcon = (name: string, content: string) => {
  // For performance reason we pre-compute some values, so that
  // they are not computed on each render of the icon component
  const kebabName = kebabCase(name)
  const iconName = `BIcon${pascalCase(name)}`
  const iconTitle = kebabName.replace(/-/g, ' ')
  const svgContent = trim(content || '')
  const props = omit(ICON_BASE_PROPS, ['content', 'title'])

  return /* #__PURE__ */ defineComponent({
    name: iconName,
    components: {BIconBase},
    props: props,
    setup(props) {
      return () => {
        return h(
          BIconBase,
          {
            ...props,
            content: parseFromHtmlString(svgContent),
            title: iconTitle,
          },
          {
            default: () => '',
          }
        )
      }
    },
  })
}
