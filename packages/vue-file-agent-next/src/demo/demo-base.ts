import * as tus from 'tus-js-client';
import {RawFileRecord, Options, default as FileRecord} from '../lib/file-record'
import VueFileUploadPlugins from '../lib/plugins'

export const getFileRecordsInitial = () => {
  const filesBaseUrl = '/assets/demo/'

  let fileRecords: Array<RawFileRecord> = [];
  (<Array<RawFileRecord>>[
    {
      name: 'sample.pdf',
      lastModified: 1565232623243,
      sizeText: '3 KB',
      size: 3028,
      type: 'application/pdf',
      ext: 'pdf',
    },
    {
      name: 'House Sparrow.jpg',
      lastModified: 1583992794341,
      sizeText: '14 KB',
      size: 14403,
      type: 'image/jpeg',
      ext: 'jpg',
    },
    {
      name: 'Important sheet.ods',
      lastModified: 1564392646095,
      sizeText: '31 KB',
      size: 31276,
      type: '',
      ext: 'ods',
    },
    {
      name: 'Golf.mp4',
      lastModified: 1576563996233,
      sizeText: '549 KB',
      size: 561813,
      type: 'video/mp4',
      ext: 'mp4',
      dimensions: { width: 640, height: 360 },
      videoThumbnail: filesBaseUrl + 'Golf-thumb.jpg',
      imageColor: [66, 62, 45, 1],
    },
    {
      name: 'Test Files.zip',
      lastModified: 1572147928098,
      sizeText: '198 KB',
      size: 202680,
      type: 'application/x-zip-compressed',
      ext: 'zip',
    },
    {
      name: 'Document 3.docx',
      lastModified: 1564392646097,
      sizeText: '109 KB',
      size: 111303,
      type: '',
      ext: 'docx'
    },
  ]).forEach(function (fd) {
    fd.url = filesBaseUrl + fd.name;
    fileRecords.push(fd);
  });

  return fileRecords;
};

export const uploadUrl = localStorage.getItem('uploadUrl') || 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3';

export type SortDirection = {
  lastModified: string,
  name: string,
}

export const addTusClient = (plugins: typeof VueFileUploadPlugins) => {
  plugins.tus = tus
}

/*if (window.VueSlicksort && window.Vue) {
  window.Vue.component('vfa-sortable-list', window.VueSlicksort.SlickList);
  window.Vue.component('vfa-sortable-item', window.VueSlicksort.SlickItem);
}
*/