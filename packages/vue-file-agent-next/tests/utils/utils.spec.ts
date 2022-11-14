import utils from '../../src/lib/utils';
import { createFile } from '../utils';
import {describe, expect, it} from 'vitest'

describe('utils', () => {
  it('arrayMove', () => {
    const inp = ['a', 'b', 'c', 'd', 'e', 'f'];
    const out = ['a', 'c', 'd', 'e', 'b', 'f'];
    const out2 = ['d', 'a', 'b', 'c', 'e', 'f'];
    const moved = utils.arrayMove(inp, inp.indexOf('b'), inp.indexOf('e'));
    const moved2 = utils.arrayMove(inp, inp.indexOf('d'), inp.indexOf('a'));
    for (let i = 0; i < moved.length; i++) {
      expect(moved[i]).toBe(out[i]);
    }
    for (let i = 0; i < moved2.length; i++) {
      expect(moved2[i]).toBe(out2[i]);
    }
  });
  //   it('getAverageColor', () => {
  //     //
  //   });
  //   it('createVideoThumbnail', () => {
  //     //
  //   });
  //   it('getDataURL', () => {
  //     //
  //   });
  //   it('getImageOrientationFromArrayBuffer', () => {
  //     //
  //   });
  //   it('getImageOrientation', () => {
  //     //
  //   });
  //   it('rotateCanvas', () => {
  //     //
  //   });
  //   it('getImageResized', () => {
  //     //
  //   });
  //   it('resizeImageUrl', () => {
  //     //
  //   });
  //   it('resizeImageFile', () => {
  //     //
  //   });
  //   it('resizeImage', () => {
  //     //
  //   });
  const sizes = {
    '8 KB': 8 * 1024,
    '567 B': 567,
    '25 KB': 25 * 1024,
    '250 KB': 250 * 1024,
    '3 MB': 3 * 1024 * 1024,
  };
  it('getSizeFormatted', () => {
    for (const sizeText in sizes) {
      if (!sizes.hasOwnProperty(sizeText)) {
        continue;
      }
      expect(utils.getSizeFormatted((sizes as any)[sizeText])).toBe(sizeText);
    }
  });
  it('getSizeParsed', () => {
    for (const sizeText in sizes) {
      if (!sizes.hasOwnProperty(sizeText)) {
        continue;
      }
      expect(utils.getSizeParsed(sizeText)).toBe((sizes as any)[sizeText]);
    }
  });
  //   test('getColorForText', () => {
  //     //
  //   });

  it('validateType', () => {
    const file = createFile('Hello.html', 16500, 'text/html');
    expect(utils.validateType(file, '.html')).toBe(true);
    expect(utils.validateType(file, '.jpg')).toBe(false);
    expect(utils.validateType(file, '.jpg,.html')).toBe(true);
    expect(utils.validateType(file, '.jpg,.txt')).toBe(false);
    expect(utils.validateType(file, 'image/jpeg')).toBe(false);
    expect(utils.validateType(file, 'text/html')).toBe(true);
  });
  it('validateSize', () => {
    const size = '146 KB';
    const bytes = utils.getSizeParsed(size);
    expect(utils.getSizeFormatted(bytes)).toBe(size);

    const file = createFile('Hello.html', bytes, 'text/html');
    expect(utils.validateSize(file, '145KB')).toBe(false);
    expect(utils.validateSize(file, '146KB')).toBe(true);
    expect(utils.validateSize(file, '147KB')).toBe(true);
    expect(utils.validateSize(file, '5KB')).toBe(false);
    expect(utils.validateSize(file, '2MB')).toBe(true);
    expect(utils.validateSize(file, '10B')).toBe(false);
  });

  //   it('getFilesFromDroppedItems', () => {
  //     //
  //   });
});
