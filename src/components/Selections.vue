<template>
  <div class="selection-bar clearfix">
    <ul class="selection-index clearfix">
      <template v-for="(selection,$index) in leftSelections">
        <li :title="selection.toast">
          <a
            href="javascript:;"
            :style="{'background-position':`${$index * -20}px 0`}"
            class="index-link"
            @mouseover.self="changeY($event,'in')"
            @mouseout.self="changeY($event,'out')"
            @click = "insert(selection.mode)"
            ></a>
        </li>
        <li v-if="selection.isDelimiter" class="delimiter"></li>
      </template>
    </ul>
    <ul class="selection-mode clearfix">
      <template v-for="(selection,$index) in rightSelections">
        <li :title="selection.toast">
          <a
             href="javascript:;"
            :style="{'background-position': $index == 0 ? ('-240px 0') : `${($index + 15) * -20}px 0`}"
            @mouseover.self="changeY($event,'in')"
            @mouseout.self="changeY($event,'out')"
            @click = "updateStatus(selection.mode)"
            class="index-link"
            ></a>
        </li>
        <li v-if="selection.isDelimiter" class="delimiter"></li>
      </template>
    </ul>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  setMdContent,
  updateMdContent
} from 'utils'
export default {
  data () {
    return {
      leftSelections: [
        {
          toast:'加粗<strong>',
          key:'Ctrl+B',
          mode:'**Bold**',
          isDelimiter:false
        },
        {
          toast:'斜体<em>',
          key:'Ctrl+I',
          mode:'*Italic*',
          isDelimiter:true
        },
        {
          toast:'链接<a>',
          key:'Ctrl+L',
          mode:'link',
          isDelimiter:false
        },
        {
          toast:'引用<blockquote>',
          key:'Ctrl+Q',
          mode:'\n> ',
          isDelimiter:false
        },
        {
          toast:'代码<pre><code>',
          key:'Ctrl+K',
          mode:'`code`',
          isDelimiter:false
        },
        {
          toast:'图片<img>',
          key:'Ctrl+G',
          mode:'img',
          isDelimiter:true
        },
        {
          toast:'数字列表<ol>',
          key:'Ctrl+O',
          mode:'\n1. 列表一',
          isDelimiter:false
        },
        {
          toast:'普通列表<ul>',
          key:'Ctrl+U',
          mode:'\n- 列表一',
          isDelimiter:false
        },
        {
          toast:'标题<h1>/<h2>',
          key:'Ctrl+H',
          mode:'\n## ',
          isDelimiter:false
        },
        {
          toast:'分割线<hr>',
          key:'Ctrl+R',
          mode:'\n\n-----\n\n',
          isDelimiter:true
        },
        {
          toast:'撤销-',
          key:'Ctrl+Z',
          mode:'',
          isDelimiter:false
        },
        {
          toast:'重做',
          key:'Ctrl+Shift+Z',
          mode:'',
          isDelimiter:true
        }
      ],
      rightSelections: [
        {
          toast:'全屏',
          mode: 'fullscreen',
          isDelimiter:true
        },
        {
          toast:'编辑模式',
          mode: 'edit',
          isDelimiter:false
        },
        {
          toast:'实况模式',
          mode: 'editWatch',
          isDelimiter:false
        },
        {
          toast:'预览模式',
          mode: 'watch',
          isDelimiter:false
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      'inputValue': 'getInputValue'
    })
  },
  created () {

  },
  attached () {},
  methods: {
    ...mapActions([
      'updateInputValue',
      'updateRender'
    ]),
    changeY (event, mode) {
      let target = event.target
      if (mode === 'in') {
        target.style.backgroundPositionY = '-40px'
      } else {
        target.style.backgroundPositionY = '0'
      }
    },
    updateStatus (mode) {
      let status = {};
      switch (mode) {
        case 'fullscreen':

          break;
        case 'edit':
          status = {
            edit: true,
            editWatch: false,
            watch: false
          }
          break;
        case 'editWatch':
          status = {
            edit: false,
            editWatch: true,
            watch: false
          }
          break;
        case 'watch':
          console.log(111)
          status = {
            edit: false,
            editWatch: false,
            watch: true
          }
          break;
      }
      this.$store.dispatch('updateStatus', status)
    },
    insert (mode, url = 'http://github.com/Pavoooo') {
      if (mode === 'link') {
        return this.$dialog({
          show: true
        }).then((value) => {
          this.insert('[Link](http://github.com/Pavoooo)', value)
        })
      }
      if (mode === 'img') {
        return this.$dialog({
          show: true,
          title: '插入图片链接',
          placeholder: '请输入图片的链接'
        }).then((value) => {
          this.insert('![Img](http://github.com/Pavoooo)', value)
        })
      }
      let input = document.querySelector('.md-textarea')
      let start = input.selectionStart
      let end = input.selectionEnd
      let content = this.inputValue
      let insertContent = ''
      input.focus()

      let map = {
        '**Bold**': {index: [2, 2], symbol:['**', '**']},
        '*Italic*': {index: [1, 1], symbol:['*', '*']},
        '[Link](http://github.com/Pavoooo)': {index: [7, 1], symbol:['[', ']('+ url +')']},
        '`code`': {index: [1, 1], symbol:['`', '`']},
        '![Img](http://github.com/Pavoooo)': {index: [7, 1], symbol: ['![', ']('+ url +')']}
      }

      if (start === end) {
        if (mode in map) {
          console.log(mode)
          if(mode.indexOf('[Link]') == 0) {
            let len = url.length
            mode = `[Link](${url})`
            insertContent = setMdContent(input, content, mode, start, [1, len + 3])
          } else if (mode.indexOf('![Img]') == 0) {
            let len = url.length
            mode = `![Img](${url})`
            insertContent = setMdContent(input, content, mode, start, [2, len + 3])
          } else {
            insertContent = setMdContent(input, content, mode, start, map[mode]['index'])
          }
        } else {
          insertContent = setMdContent(input, content, mode, start, [0, 0])
        }
      } else {
        if (mode in map) {
          insertContent = updateMdContent(input, content, start, end, map[mode]['symbol'])
        } else {
          return false
        }
      }
      console.log(insertContent)
      this.updateInputValue(insertContent)
      this.updateRender(insertContent)
    }
  },
  components: {}
}
</script>

<style lang="stylus">
  .selection-bar
    width: 100%
    height: 30px
    line-height: 30px
    border-bottom: solid 1px #ccc
    .selection-index
      float: left
    .selection-mode
      float: right
    .selection-index,.selection-mode
      li
        float: left
        margin: 0 2px
        vertical-align: text-top
        width: 30px
        height: 30px
        box-sizing: border-box
        position: relative
        &:hover
          background-color: #f6f6f6
        &.delimiter
          margin: 5px 4px
          width: 0
          height: 20px
          padding-left: 0
          padding-right: 0
          border-right: 1px solid #ddd
          text-indent: 110%
          white-space: nowrap
          overflow: hidden
          text-transform: capitalize
        .index-link
          cursor: pointer
          display: block
          border: 5px solid #FFF
          width: 20px
          height: 20px
          background-repeat: no-repeat
          background-size: 380px 60px
          background-image: url(../assets/editor@2x.png)
          text-indent: 110%
          white-space: nowrap
          overflow: hidden
          text-transform: capitalize
          -moz-box-sizing: content-box
          -webkit-box-sizing: content-box
          box-sizing: content-box

</style>
