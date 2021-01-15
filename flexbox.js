const FlexSelector = {
  name: 'flex-selector',
  props: {
    value: Object,
    inputAttrs: Object
  },
  data() {
    return {
      flex: {
        'flex-grow': '',
        'flex-shrink': '',
        'flex-basis': ''
      }
    }
  },
  computed: {
  },
  mounted() {
    /* const flex = this.value.split(' ');
    this.flexProperties.grow = flex[0];
    this.flexProperties.shrink = flex[1];
    this.flexProperties.basis = flex[2]; */
  },
  methods: {
    updateFlex(input, property) {
      const newFlex = Object.assign({}, this.value);
      newFlex[property] = input;
      this.$emit('input', newFlex);
    },
    clearFlex() {
      /* this.flex = {
        'flex-grow': '',
        'flex-shrink': '',
        'flex-basis': ''
      }; */
      this.$emit('input', {
        'flex-grow': '',
        'flex-shrink': '',
        'flex-basis': ''
      });
    },
    /* resetFlex() {
      Object.keys(this.flexProperties).forEach(property => {
        this.flexProperties[property] = '';
      });
      this.$emit('input', '');
    } */
    /* isGrowOrShrink(property) {
      return property === 'grow' || property === 'shrink';
    } */
  },
  /* watch: {
    value(val) {
      if (!val.trim()) {
        this.resetFlex();
      }
    }
  }, */
  template: `
    <div class="css-property mt-2">
      <span>flex:</span>
      <div class="flex-properties">
        <v-text-field 
          :value="value['flex-grow']"
          type="number" 
          :min="0"
          placeholder="grow"
          @input="updateFlex($event, 'flex-grow')"
          v-bind="inputAttrs"
        ></v-text-field>
        <v-text-field 
          :value="value['flex-shrink']"
          type="number" 
          :min="0"
          placeholder="shrink"
          @input="updateFlex($event, 'flex-shrink')"
          v-bind="inputAttrs"
        ></v-text-field>
        <v-text-field 
          :value="value['flex-basis']"
          type="text" 
          placeholder="basis"
          @input="updateFlex($event, 'flex-basis')"
          v-bind="inputAttrs"
        ></v-text-field>
      </div>
      <span>;</span>
    </div>
  `
}


const FlexItem = {
  name: 'flex-item',
  props: {
    itemNumber: Number,
    content: String | Number,
    language: String,
    flexAllItems: Object,
    positionOptions: Array,
    inputAttrs: Object,
    isIndividualEditingEnabled: Boolean
  },
  components: {
    FlexSelector
  },
  data() {
    return {
      styles: {
        order: '0',
        flex: {
          'flex-grow': '',
          'flex-shrink': '',
          'flex-basis': '',
        },
        'align-self': 'auto',
      },
      itemKey: 0
    }
  },
  computed: {
    itemStyles() {
      let newStyles = {
        'order': this.styles.order, 
        'align-self': this.styles['align-self']
      };
      for (let property in this.flexAllItems) {
        newStyles[property] = this.styles.flex[property] || this.flexAllItems[property];
      }
      
      return newStyles;
    }
    /* itemPosition() {
      let element = this.$el;
      if (!element) {
        return ''
      }
      else {
        let bounds = element.getBoundingClientRect();
        if (bounds.left < 102) {
          return 'leftmost';
        } else if (bounds.right > window.innerWidth - 102) {
          return 'rightmost';
        } else {
          return '';
        }
      }
      
    } */
  },
  methods: {
    clearFlex() {
      console.log('clear');
      this.styles.flex = '';
      /* this.itemKey++; */
      console.log(this.styles.flex);
      console.log(this.itemStyles);
    }
  },
  template: `
    <div class="flex-item" :key="'item' + itemNumber" :style="itemStyles">
      {{ content }}
      <span class="item-number" v-if="language !== 'English'">{{ itemNumber }}</span>
      <div 
        v-if="isIndividualEditingEnabled"
        :key="'itemControls' + itemNumber" 
        class="item-controls" 
      >
        <span class="title">#flex-item{{ itemNumber }} {</span>
        <div class="css-property">
          <span>order:</span>
          <v-text-field
            v-model="styles.order"
            type="number"
            v-bind="inputAttrs"
            class="mt-2"
          ></v-text-field>
          <span>;</span>
        </div>
        <flex-selector 
          v-model="styles.flex" 
          :input-attrs="inputAttrs"
          @clear-flex="clearFlex"
        ></flex-selector>
        <div class="css-property">
          <span>align-self:</span>
          <v-combobox
            v-model="styles['align-self']"
            :items="positionOptions"
            v-bind="inputAttrs"
          ></v-combobox>
          <span>;</span>
        </div>
        <span class="title">}</span>
      </div>
    </div>
  `
}

/* const FlexItemStyles = {
  components: {
    FlexSelector
  },
  template:`
    <span class="title">Item #</span>
    <v-text-field v-model="" type="number" min="0" 
				placeholder="Order" v-bind="inputAttrs"></v-text-field>
    <flex-selector v-model="" :input-attrs="inputAttrs"></flex-selector>
    
    <div v-for="(options, property) in " class="css-property">
      <span>{{ property }}:</span>
      <v-combobox
        v-model=""
        :items="options"
        v-bind="inputAttrs"
      ></v-combobox>
      <span>;</span>
    </div>
  `
} */

/* ---------------------------------------------------------------------------- */

/* Vue.config.devtools = true; */

new Vue({ 
  el: '#app',
  components: {
    FlexSelector,
    FlexItem
  },
  data: {
    currentLanguageId: 0,
    languages: [{
      name: 'English',
      writingMode: 'horizontal-tb',
      direction: 'ltr',
    },{
      name: 'Hebrew',
      writingMode: 'horizontal-tb',
      direction: 'rtl',
      numbers: [],
    },{
      name: 'Japanese',
      writingMode: 'vertical-rl',
      direction: 'ltr',
      numbers: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一']   
    },{
      name: 'Mongolian',
      writingMode: 'vertical-lr',
      direction: 'ltr',
      numbers: ['᠑', '᠒', '᠓', '᠔', '᠕', '᠖', '᠗', '᠘', '᠙', '᠑᠐', '᠑᠑', '᠑᠒', '᠑᠓', '᠑᠔', '᠑᠕', '᠑᠖', '᠑᠗', '᠑᠘', '᠑᠙', '᠒᠐', '᠒᠑']
    }],

    body: {
      styles: {
        'writing-mode': 'horizontal-tb',
        'direction': 'ltr',
      },
      properties: {
        'writing-mode': [
          'horizontal-tb',
          'vertical-lr',
          'vertical-rl'
        ],
        'direction': [
          'ltr',
          'rtl'
        ],
      }
    },
    container: {
      styles: {
        'display': 'block',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        'align-items': 'stretch',
        'align-content': 'normal',
        'justify-content': 'normal',
        'height': '360px'
      },
      properties: {
        'display': [
          'block',
          'flex',
          'inline-flex'
        ],
        'flex-direction': [
          'row',
          'column',
          'row-reverse',
          'column-reverse'
        ],
        'flex-wrap': [
          'nowrap',
          'wrap',
          'wrap-reverse'
        ],
        'align-items': [
          'normal',
          'stretch',
          'flex-start',
          'flex-end',
          'center',
          'baseline',
        ],
        'align-content': [
          'normal',
          'stretch',
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-around',
          'space-evenly'
        ],
        'justify-content': [
          'normal',
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-around',
          'space-evenly'
        ],
      },
      key: 0
    },
    items: {
      styles: {
        flex: {
          'flex-grow': '',
          'flex-shrink': '',
          'flex-basis': ''
        }
      },
      itemCount: 3,
      min: 1,
      max: 21,
      isIndividualEditingEnabled: false,
    },
    itemBounds: [],
    inputAttrs: {class: 'pt-0', box: true, 'hide-details': true},
  },
  computed: {
    currentLanguage() {
      return this.languages[this.currentLanguageId].name;
    },
    numbers() {
      return this.languages[this.currentLanguageId].numbers ?? false;
    },
    /* itemBounds() {
      let items = this.$refs.flexItems;
      let bounds = items ? items.map(item => item.$el.getBoundingClientRect()) : [];
      console.log(items);
      console.log(bounds);
      return bounds;
    } */
  },
  methods: {
    handleItemCountChange(event) {
      console.log(event);
      this.items.itemCount = parseInt(event.target.value);
    },
    updateItemBounds() {
      let items = this.$refs.flexItems;
      const gutterWidth = 120;
      /* $refs takes time to rerender, so wait until nextTick to update bounding boxes  */
      Vue.nextTick( function() {
        items.forEach(item => {
          item.$el.classList.remove('leftmost', 'rightmost');
          let bounds = item.$el.getBoundingClientRect();
          /* if (bounds.left < gutterWidth) {
            item.$el.classList.add('leftmost');
          } else if (bounds.right > window.innerWidth - gutterWidth) {
            item.$el.classList.add('rightmost');
          } */
        });
      });
    }
  },
  watch: {
    currentLanguageId(lang) {
      this.body.styles['writing-mode'] = this.languages[lang].writingMode;
      this.body.styles['direction'] = this.languages[lang].direction;
      if (lang !== 0) {
        this.items.isIndividualEditingEnabled = false;
      }
      this.updateItemBounds();
    },
    body: {
      handler() {
        this.updateItemBounds();
      },
      deep: true
    },
    container: {
      handler() {
        this.updateItemBounds();
      },
      deep: true
    },
    items: {
      handler() {
        this.updateItemBounds();
      },
      deep: true
    }
  },
  mounted() {
    /* Had trouble initializing the Hebrew text due to bidirectionality issues in VSCode */
    let rightToLeftNumbers = 'א ב ג ד ה ו ז ח ט י יא יב יג יד ט״ו ט״ז יז יח יט כ כא';
    this.languages.find(language => language.name === "Hebrew").numbers = rightToLeftNumbers.split(' ');
    this.updateItemBounds();
  }
});





