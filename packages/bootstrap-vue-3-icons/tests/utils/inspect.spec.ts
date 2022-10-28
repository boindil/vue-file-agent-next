import {
  toType,
  isUndefined,
  isNull,
  isUndefinedOrNull,
  isFunction,
  isBoolean,
  isString,
  isNumber,
  isNumeric,
} from '../../src/utils/inspect'
import {describe, expect, it} from 'vitest'

describe('inspect', () => {
  it('toType()', () => {
    expect(toType(123)).toEqual('number')
    expect(toType('123')).toEqual('string')
    expect(toType(true)).toEqual('boolean')
    expect(toType({})).toEqual('object')
    expect(toType([])).toEqual('object')
    expect(toType(/abc/)).toEqual('object')
    expect(toType(() => {})).toEqual('function')
    expect(toType(Date)).toEqual('function')
    expect(toType(new Date())).toEqual('object')
    expect(toType(undefined)).toEqual('undefined')
    expect(toType(null)).toEqual('object')
  })

  it('isUndefined()', () => {
    expect(isUndefined(123)).toEqual(false)
    expect(isUndefined('123')).toEqual(false)
    expect(isUndefined(true)).toEqual(false)
    expect(isUndefined({})).toEqual(false)
    expect(isUndefined([])).toEqual(false)
    expect(isUndefined(/abc/)).toEqual(false)
    expect(isUndefined(() => {})).toEqual(false)
    expect(isUndefined(Date)).toEqual(false)
    expect(isUndefined(new Date())).toEqual(false)
    expect(isUndefined(undefined)).toEqual(true)
    expect(isUndefined(null)).toEqual(false)
  })

  it('isNull()', () => {
    expect(isNull(123)).toEqual(false)
    expect(isNull('123')).toEqual(false)
    expect(isNull(true)).toEqual(false)
    expect(isNull({})).toEqual(false)
    expect(isNull([])).toEqual(false)
    expect(isNull(/abc/)).toEqual(false)
    expect(isNull(() => {})).toEqual(false)
    expect(isNull(Date)).toEqual(false)
    expect(isNull(new Date())).toEqual(false)
    expect(isNull(undefined)).toEqual(false)
    expect(isNull(null)).toEqual(true)
  })

  it('isUndefinedOrNull()', () => {
    expect(isUndefinedOrNull(123)).toEqual(false)
    expect(isUndefinedOrNull('123')).toEqual(false)
    expect(isUndefinedOrNull(true)).toEqual(false)
    expect(isUndefinedOrNull({})).toEqual(false)
    expect(isUndefinedOrNull([])).toEqual(false)
    expect(isUndefinedOrNull(/abc/)).toEqual(false)
    expect(isUndefinedOrNull(() => {})).toEqual(false)
    expect(isUndefinedOrNull(Date)).toEqual(false)
    expect(isUndefinedOrNull(new Date())).toEqual(false)
    expect(isUndefinedOrNull(undefined)).toEqual(true)
    expect(isUndefinedOrNull(null)).toEqual(true)
  })

  it('isFunction()', () => {
    expect(isFunction(123)).toEqual(false)
    expect(isFunction('123')).toEqual(false)
    expect(isFunction(true)).toEqual(false)
    expect(isFunction({})).toEqual(false)
    expect(isFunction([])).toEqual(false)
    expect(isFunction(/abc/)).toEqual(false)
    expect(isFunction(() => {})).toEqual(true)
    expect(isFunction(Date)).toEqual(true)
    expect(isFunction(new Date())).toEqual(false)
    expect(isFunction(undefined)).toEqual(false)
    expect(isFunction(null)).toEqual(false)
  })

  it('isBoolean()', () => {
    expect(isBoolean(123)).toEqual(false)
    expect(isBoolean('123')).toEqual(false)
    expect(isBoolean(true)).toEqual(true)
    expect(isBoolean({})).toEqual(false)
    expect(isBoolean([])).toEqual(false)
    expect(isBoolean(/abc/)).toEqual(false)
    expect(isBoolean(() => {})).toEqual(false)
    expect(isBoolean(Date)).toEqual(false)
    expect(isBoolean(new Date())).toEqual(false)
    expect(isBoolean(undefined)).toEqual(false)
    expect(isBoolean(null)).toEqual(false)
  })

  it('isString()', () => {
    expect(isString(123)).toEqual(false)
    expect(isString('123')).toEqual(true)
    expect(isString(true)).toEqual(false)
    expect(isString({})).toEqual(false)
    expect(isString([])).toEqual(false)
    expect(isString(/abc/)).toEqual(false)
    expect(isString(() => {})).toEqual(false)
    expect(isString(Date)).toEqual(false)
    expect(isString(new Date())).toEqual(false)
    expect(isString(undefined)).toEqual(false)
    expect(isString(null)).toEqual(false)
  })

  it('isNumber()', () => {
    expect(isNumber(123)).toEqual(true)
    expect(isNumber(123.5)).toEqual(true)
    expect(isNumber('123')).toEqual(false)
    expect(isNumber(true)).toEqual(false)
    expect(isNumber({})).toEqual(false)
    expect(isNumber([])).toEqual(false)
    expect(isNumber(/abc/)).toEqual(false)
    expect(isNumber(() => {})).toEqual(false)
    expect(isNumber(Date)).toEqual(false)
    expect(isNumber(new Date())).toEqual(false)
    expect(isNumber(undefined)).toEqual(false)
    expect(isNumber(null)).toEqual(false)
  })

  it('isNumeric()', () => {
    expect(isNumeric(123)).toEqual(true)
    expect(isNumeric(123.5)).toEqual(true)
    expect(isNumeric('123')).toEqual(true)
    expect(isNumeric('123.5')).toEqual(true)
    expect(isNumeric('123,5')).toEqual(false)
    expect(isNumeric(true)).toEqual(false)
    expect(isNumeric({})).toEqual(false)
    expect(isNumeric([])).toEqual(false)
    expect(isNumeric(/abc/)).toEqual(false)
    expect(isNumeric(() => {})).toEqual(false)
    expect(isNumeric(Date)).toEqual(false)
    expect(isNumeric(new Date())).toEqual(false)
    expect(isNumeric(undefined)).toEqual(false)
    expect(isNumeric(null)).toEqual(false)
  })
})
