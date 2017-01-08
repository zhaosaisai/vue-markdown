import Vue from 'vue'
import Dialog from './dialog'

let defaultOptions = {
  title: '插入链接',
  placeholder:'请输入你的链接地址',
  show: false,
  offsetParent: 'body',
  value:''
}

let instance = null;

function install () {
  let DialogConstructor = Vue.extend(Dialog)
  return Object.defineProperty(Vue.prototype, '$dialog', {
    get () {
      return function(options) {
        return new Promise((resolve, reject) => {
          if (instance instanceof DialogConstructor) {
            instance.$destroy(true)
          }
          let datas = Object.assign({}, defaultOptions, options)
          instance = new DialogConstructor({
            el: document.createElement('div'),
            data: datas,
            methods: {
              confirm () {
                resolve(this.value)
                this.show = false
              },
              hide () {
                this.show = false
              }
            }
          })
          let parent = document.querySelector(datas.offsetParent)
          parent.appendChild(instance.$el)
        });
      }.bind(this)
    }
  })
}

export default Vue.use(install)
