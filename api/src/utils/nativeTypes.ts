function isBlank(str: string): boolean {
  if (!str || str.length === 0 || /^[^\S]+$/.test(str)) {
    return true
  }
  return false
}

function isUndefined(param: any): boolean {
  return typeof param === 'undefined'
}

function IsPropDefined(obj: object, prop: string | string[]): boolean {
  let keys = Array.isArray(prop) ? prop : prop.split('.')
  if (keys.length === 0) return true

  if (!isUndefined(obj[keys[0]]) && obj[keys[0]] !== null) {
    return IsPropDefined(obj[keys[0]], keys.slice(1))
  } else {
    return false
  }
}

function ArePropsDefined(obj: object, props: string | string[]): boolean {
  let keys = typeof props === 'string' ? [props] : props
  return keys.every(key => {
    return IsPropDefined(obj, key)
  })
}

function getProp(obj: object, path: string): any {
  if (isUndefined(obj)) return

  let pointIndex = path.indexOf('.')
  let propName = path.substring(0, pointIndex === -1 ? path.length : pointIndex)
  if (pointIndex === -1 && obj.hasOwnProperty(propName)) return obj[propName]
  else {
    let newPath = path.substring(pointIndex + 1)
    return getProp(obj[propName], newPath)
  }
}

function findMinDate(dates: Date[]): Date {
  if (dates.length === 0) return null

  let datesCopy = Object.assign([], dates)
  datesCopy.sort((a, b) => a.getTime() - b.getTime())

  return datesCopy[0]
}

function findMaxDate(dates: Date[]): Date {
  if (dates.length === 0) return null

  let datesCopy = Object.assign([], dates)
  datesCopy.sort((a, b) => b.getTime() - a.getTime())

  return datesCopy[0]
}

function formatNumber(nb: number): number {
  return Math.round(nb * 100) / 100
}

export {
  isBlank,
  isUndefined,
  IsPropDefined,
  ArePropsDefined,
  getProp,
  findMinDate,
  findMaxDate,
  formatNumber,
}
