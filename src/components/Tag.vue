<template>
  <span :class="classes" :style="tagElementStyle" @click="emitChooseTag">
    <span class="label" v-html="tagTitle"></span>
    <span v-if="closeButton"
      class="close-button"
      @click.stop="emitCloseTag">
      &times;
    </span>
  </span>
</template>

<script>
// const VARIANT_DEFAULT = 'default';
// const VARIANT_SUCCESS = 'success';

export default {
  name: 'Tag',
  props: {
    closeButton: {
      type: Boolean,
      default: false,
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
    canChoose: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: '',
    },
    filterTagString: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    tagElementStyle: '',
    tag: '',
  }),
  computed: {
    classes() {
      const result = {
        tag: true,
      };
      result['tag-success'] = this.variant === this.$appConfig.tags.VARIANT_SUCCESS;
      result['tag-can-choise'] = this.canChoose;
      return result;
    },
    tagTitle() {
      const index = this.tag.indexOf(this.filterTagString);
      if (index === -1) {
        return this.tag;
      }
      const beforeStr = this.tag.slice(0, index);
      const afterStr = this.tag.slice(index + this.filterTagString.length);
      return `${beforeStr}<span style="color: red; font-weight: bold">${this.filterTagString}</span>${afterStr}`;
    },
  },
  methods: {
    emitChooseTag() {
      if (!this.canChoose) {
        return;
      }
      this.$emit('onChooseTag', this.$slots.default[0].text);
    },
    emitCloseTag() {
      if (this.autoClose) {
        this.closeTag();
      }
      this.$emit('onCloseTag', this.$slots.default[0].text);
    },
    closeTag() {
      this.tagElementStyle += 'display: none;';
    },
  },
  created() {
    this.tag = this.$slots.default[0].text;
  },
};
</script>

<style scoped>
.tag {
  padding: 1px 7px 3px;
  line-height: 1;
  font-size: 0.75rem;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  border-radius: 4px;
  margin: 5px;
  cursor: default;
  transition: all 0.3s;
  white-space: nowrap;
}
.tag:hover {
  background-color: #0f77d8;
  border-color: #007bbb;
}
.tag-success {
  background-color: #28a745 !important;
  border-color: #28a745 !important;
}
.tag-success:hover {
  background-color: #218838 !important;
  border-color: #1e7e34 !important;
}
.tag-can-choise:hover {
  cursor: pointer !important;
  box-shadow: 0 0 5px #000 !important;
}
.tag .close-button {
  margin-left: 7px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.5s ease;
}
.tag .close-button:hover {
  color: #ffff00;
}
.tag .highlight {
  color: red !important;
}

</style>
