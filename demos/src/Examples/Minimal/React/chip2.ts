import { Node, mergeAttributes } from '@tiptap/core'

export const Chip = Node.create<void>({
  name: 'chip',
  group: 'inline',
  inline: true,
  selectable: false, // ?
  atom: true, // ?

  addAttributes() {
    return {
      label: {
        default: null,
        parseHTML: element => element.getAttribute('data-label'),
        renderHTML: attributes => {
          if (!attributes.label) {
            return {}
          }

          return {
            'data-label': attributes.label,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'chip',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'chip',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      node.attrs.label,
    ]
  },
})
