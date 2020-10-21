<template>
  <div class="favorite-sidebar">
    <h5>Выбранные теги</h5>
    <TagList
      :tagList="selectedTags"
      :filterTagString="filterTagValue"
      closeButton
      variant="success"
      @onCloseTag="onDeselectTag"
    />
    <b-form-input
      id="tag-filter"
      class="mb-3 mt-3"
      type="text"
      placeholder="Фильтр тегов: вводите символы"
      v-model="filterTagValue"
    ></b-form-input>
    <h5>Доступные теги</h5>
    <TagList
      :tagList="allTags"
      :filterTagString="filterTagValue"
      canChoose
      @onChooseTag="onSelectTag"
    />
  </div>
</template>

<script>
import TagList from '@/components/TagList.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FavoriteSidebar',
  components: { TagList },
  data: () => ({
    filterTagValue: '',
    allTags: [],
  }),
  computed: {
    ...mapGetters('tags', ['tagsAsArray', 'selectedTags']),
  },
  methods: {
    ...mapActions('tags', ['setSelectedTags']),
    onSelectTag(tag) {
      const index = this.allTags.indexOf(tag);
      if (index !== -1) {
        this.allTags.splice(index, 1);
        const arr = this.selectedTags;
        arr.push(tag);
        this.setSelectedTags(arr);
      }
    },
    onDeselectTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index !== -1) {
        this.selectedTags.splice(index, 1);
        this.allTags.push(tag);
      }
    },
  },
  watch: {
    tagsAsArray() {
      this.allTags = this.tagsAsArray.filter((tag) => !this.selectedTags.includes(tag));
    },
  },
  created() {
    this.allTags = this.tagsAsArray.slice();
    this.setSelectedTags([]);
  },
};
</script>

<style scoped>
  .favorite-sidebar {
    background-color: #c0f0f6;
    padding: 20px;
  }
</style>
