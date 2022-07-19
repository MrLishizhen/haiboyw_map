/**
 * Created by Wade (weida1985@163.com) on 2021/6/7.
 */
import {xml2js} from 'xml-js'

function simpleXmlObj (o) {
  if (o) {
    if (o instanceof Array) {
      return o.forEach(_ => simpleXmlObj(_))
    } else if (o instanceof Object) {
      if (o['_attributes']) {
        Object.assign(o, o['_attributes'])
        delete o['_attributes']
      }
      Object.keys(o).forEach(_ => simpleXmlObj(o[_]))
      return o
    } else {
      return o
    }
  }
}

export const xml2obj = (xmlStr) => {
  const o = xml2js(xmlStr, {compact: true})
  return simpleXmlObj(o)
}


