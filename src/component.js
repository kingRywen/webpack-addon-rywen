export default function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default
    print()
  })

  element.appendChild(btn);

  return element;
}
