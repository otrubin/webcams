<template>
  <div class="tag-list">
    <template v-if="Boolean(tagList.length)">
      <Tag
        :close-button="closeButton"
        :autoClose="autoClose"
        :can-choose="canChoose"
        :variant="variant"
        :filterTagString="filterTagString"
        v-for="tag in tagList" :key="tag"
        @onChooseTag="onChooseTag"
        @onCloseTag="onCloseTag"
      >{{ tag }}</Tag>
    </template>
    <template v-else>
      <div class="empty-tag-list">Нет тегов</div>
    </template>
  </div>
</template>

<script>
import Tag from './Tag.vue';

export default {
  name: 'TagList',
  props: {
    tagList: {
      type: Array,
      required: true,
    },
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
  components: {
    Tag,
  },
  methods: {
    onChooseTag(tag) {
      this.$emit('onChooseTag', tag);
    },
    onCloseTag(tag) {
      this.$emit('onCloseTag', tag);
    },
  },
};
</script>

<style scoped>
.empty-tag-list{
  font-size: 1rem;
  color: #aaaaaa;
}
</style>
