import VueFilePreview from './VueFilePreview.vue'
import {describe, expect, it} from 'vitest'

import FileRecord, {RawFileRecord, Options} from '../lib/file-record'
import {getWrapper, getText} from '../../tests/utils'

describe('vue-file-preview.vue', () => {
  const rawFileRecord = {
    name: 'sample.pdf',
    lastModified: 1565232623243,
    // "sizeText":"3 KB",
    size: 3028,
    type: 'application/pdf',
    ext: 'pdf',
  }

  it('renders FileRecord when passed', () => {
    const fileRecord = new FileRecord(rawFileRecord as RawFileRecord, {} as Options)
    const wrapper = getWrapper(VueFilePreview, {
      fileRecord: fileRecord,
    })
    expect(getText(wrapper, '.file-name')).toBe('sample')
    expect(getText(wrapper, '.file-ext')).toBe('pdf')
    expect(getText(wrapper, '.file-size')).toBe('3 KB')
  })
})
