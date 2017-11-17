import './style/main.scss'
import component from './component'
import printMe from './print.js'
import { square, cube } from "./math"
import _ from 'lodash'

console.log(square(2))

printMe()

console.log(
  _.join(['Another', 'module'], ' ')
)


if (module.hot) {
  module.hot.accept();
}

