// import Promise from 'promise-polyfill'
import './style/main.scss'
import component from './component'
import printMe from './print.js'
import { square, cube } from "./math"
// import _ from 'lodash'

var Promise = require('es6-promise').Promise

console.log(square(2))

printMe()

async function getComponent() {
  var element = document.createElement('div')
  const _ = await import(/* webpackChunkName: "lodash" */ 'lodash')
  element.innerHTML = _.join(['hello', 'world'], ' ')
  return element
}

getComponent().then(component => {
  document.body.appendChild(component)
})

if (module.hot) {
  module.hot.accept();
}

