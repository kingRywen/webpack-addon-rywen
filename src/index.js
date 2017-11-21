import _ from 'lodash'

console.log(
  _.join(['Another', 'module'], ' ')
)


if (module.hot) {
  module.hot.accept();
}

