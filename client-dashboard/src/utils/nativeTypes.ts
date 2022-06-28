export const isBlank = (str: string): boolean => {
  return !str || str.length === 0 || /^[^\S]+$/.test(str);
}

const isUndefined = (param: any): boolean => {
  return typeof param === 'undefined'
}

const isPropDefined = (obj: any, prop: string | string[]): boolean => {
  let keys = Array.isArray(prop) ? prop : prop.split('.')
  if (keys.length === 0) return true

  if (!isUndefined(obj[keys[0]])) {
    return isPropDefined(obj[keys[0]], keys.slice(1))
  } else {
    return false
  }
}

const arePropsDefined = (obj: any, prop: string | string[]): boolean => {
  let keys = typeof prop === 'string' ? [prop] : prop
  return keys.every(key => {
    return isPropDefined(obj, key)
  })
}

const getProp = (obj: any, path: string): any => {
  if (isUndefined(obj)) return

  let pointIndex = path.indexOf('.')
  let propName = path.substring(0, pointIndex === -1 ? path.length : pointIndex)
  if (pointIndex === -1 && obj.hasOwnProperty(propName)) return obj[propName]
  else {
    let newPath = path.substring(pointIndex + 1)
    return getProp(obj[propName], newPath)
  }
}

export default {
  isBlank,
  isUndefined,
  isPropDefined,
  arePropsDefined,
  getProp
}
