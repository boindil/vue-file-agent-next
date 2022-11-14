import {VueWrapper} from '@vue/test-utils'

export const createFile = (name: string, size: number, mimeType: string) => {
  name = name || 'mock.txt'
  size = size || 1024
  mimeType = mimeType || 'plain/txt'

  const range = (count: number) => {
    let output = ''
    for (let i = 0; i < count; i++) {
      output += 'a'
    }
    return output
  }

  const blob = new Blob([range(size)], {type: mimeType})
  ;(blob as any).lastModifiedDate = new Date()
  ;(blob as any).name = name

  return blob as File
}

export const getText = (wrapper: VueWrapper<any>, selector: string) => {
  return wrapper.find(selector).text().trim()
}
