import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'

import { Node, mergeAttributes } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
// import Mention from '@tiptap/extension-mention'
import Text from '@tiptap/extension-text'
import './styles.scss'
import { Chip } from './chip2'

// export const MyDocument = Node.create({
//   name: 'doc',
//   topNode: true,
//   content: 'inline+',
// })

export const Container = Node.create({
  name: 'container',
  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      { tag: 'container' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['container', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), ['div', 0]]
  },

  addKeyboardShortcuts() {
    const shortcuts = {
      Backspace: (...args) => { console.log('On Container Backspace', args) /* return true */ },
    }

    return shortcuts
  },
})

export const LocalPill = Node.create({
  name: 'chip',
  group: 'inline',

  inline: true,
  selectable: false,
  atom: true,
  content: 'inline*',

  addOptions() {
    return {
      HTMLAttributes: {
        // contenteditable: false,
        'data-sw': true,
      },
    }
  },

  parseHTML() {
    return [
      { tag: 'chip' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['chip', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addKeyboardShortcuts() {
    const shortcuts = {
      Backspace: (...args) => { console.log('On Chip Backspace', args) /* return true */ },
    }

    return shortcuts
  },
})

export const Span = Node.create({
  name: 'span',
  priority: 1000,
  group: 'block',

  // defining: true,

  content: 'inline*',

  parseHTML() {
    return [
      { tag: 'span' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addKeyboardShortcuts() {
    const shortcuts = {
      Backspace: (...args) => { console.log('On Span Backspace', args) /* return true */ },
    }

    return shortcuts
  },
})

export default () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Chip,
    ],
    content: `
      <p>
        What do you all think about the new <chip data-label="Winona Ryder"></chip> movie?
      </p>
    `,
  })

  return (
    <EditorContent editor={editor} />
  )
}
