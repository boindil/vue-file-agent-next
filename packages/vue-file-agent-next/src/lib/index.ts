import AjaxRequest from './ajax-request'
import { getFilesFromDroppedItems } from './drop-handler'
import extensionsMap from './extensions'
import FileRecord from './file-record'
import {extensionsMap as iconExtensionsMap, default as icons, getIconByName, getIconFromExt, SvgIcon} from './icons'
import plugins from './plugins';
import UploadHelper from './upload-helper'
import Utils from './utils'


export {
  plugins,
  AjaxRequest,
  getFilesFromDroppedItems,
  extensionsMap,
  FileRecord,
  iconExtensionsMap,
  icons,
  getIconByName,
  getIconFromExt,
  SvgIcon,
  UploadHelper,
  Utils
};

const e = {
  plugins,
  AjaxRequest,
  getFilesFromDroppedItems,
  extensionsMap,
  FileRecord,
  iconExtensionsMap,
  icons,
  getIconByName,
  getIconFromExt,
  SvgIcon,
  UploadHelper,
  Utils
};

export default e