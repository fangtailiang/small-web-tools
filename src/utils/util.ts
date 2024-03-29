// import { validatorNull } from './validators'

type NObject = Record<string, string>

// 表单序列化
export const serialize = (data: any): string => {
  const list: any[] = []
  Object.keys(data).forEach((ele) => {
    list.push(`${String(ele)}=${String(data[ele])}`)
  })
  return list.join('&')
}

export const getObjType = (
  obj:
    | any[]
    | Record<string, unknown>
    | string
    | number
    | null
    | undefined
    | boolean
    | any
): string => {
  const toString = Object.prototype.toString
  const map: NObject = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
/**
 * deepClone
 */
export const deepClone = (data: any): any => {
  const type = getObjType(data)
  let obj: any
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (const key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}
/**
 * 判断路由是否相等
 */
export const diff = (obj1: any, obj2: any): boolean => {
  delete obj1.close
  const o1 = obj1 instanceof Object
  const o2 = obj2 instanceof Object
  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (const attr in obj1) {
    const t1 = obj1[attr] instanceof Object
    const t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}
/**
 * 设置主题
 */
export const setTheme = (name: string): void => {
  document.body.className = name
}

/**
 * 递归寻找子类的父类
 */

export const findParent = (menu: any, id: string | number): any => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id === id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length !== 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}

/**
 * 动态插入css
 */

export const loadStyle = (url: string): void => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a: any, b: any): any => {
  let result = true
  Object.keys(a).forEach((ele) => {
    const type = typeof a[ele]
    if (type === 'string' && a[ele] !== b[ele]) result = false
    else if (
      type === 'object' &&
      JSON.stringify(a[ele]) !== JSON.stringify(b[ele])
    )
      result = false
  })
  return result
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len: number = 4, date: true): string => {
  let random: string = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len)
  if (date) random = random + String(Date.now())
  return random
}

export const getQueryString = (url: string, paraName: string): any => {
  const arrObj = url.split('?')
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&')
    let arr
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')

      if (arr != null && arr[0] === paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}
/**
 * 数字千分位格式化
 * @param s
 * @param n 小数点位数
 * @returns {string}
 */
export function toThousands(s: string, n: number): any {
  n = n > 0 && n <= 20 ? n : 2
  let prefix = ''
  if ((s + '').includes('-')) {
    prefix = '-'
    s = s.replace('-', '')
  }
  if (parseFloat(s + '') === 0) {
    return '0'
  }
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''

  const l = s.split('.')[0].split('').reverse()
  const r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '')
  }
  return prefix + t.split('').reverse().join('') + '.' + r
}

export const getSearchString = (name: string): any => {
  // 获取路由查询的函数
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

// 检查浏览器型号和版本
export const useBrowser = (): any => {
  const ua: string = navigator.userAgent.toLowerCase()
  const re: RegExp = /(msie|firefox|chrome|opera|version).*?([\d.]+)/
  const m: any = ua.match(re)
  const Sys = {
    browser: m[1].replace(/version/, "'safari"),
    version: m[2]
  }

  return Sys
}
