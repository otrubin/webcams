<template>
  <div class="edit-tag-list">
    <h3>Список тегов</h3>
    <EditTagItem
      v-for="(tagName) in tagsArray" :key="tagName"
      :name="tagName"
      :isEdit="editState[tagName]"
      @startEditingTagName="startEditingTagName"
      @finihEditingTagName="finihEditingTagName"
      @cancelEditingTagName="resetEditState"
      @deleteTag="deleteTagEvent"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EditTagItem from './EditTagItem.vue';

export default {
  name: 'EditTagList',
  components: { EditTagItem },
  data: () => ({
    editState: {},
    tagsArray: [],
  }),
  computed: {
    ...mapGetters('tags', ['tags', 'tagsAsArray']),
  },
  methods: {
    ...mapActions('tags', ['renameTag', 'deleteTag']),
    resetEditState() {
      this.editState = Object.fromEntries(this.tagsAsArray.map((tag) => [tag, false]));
    },
    updateTagList() {
      this.tagsArray = Array.from(this.tags.keys());
    },
    startEditingTagName(tagName) {
      this.editState = Object.fromEntries(this.tagsAsArray.map((tag) => [tag, tag === tagName]));
    },
    finihEditingTagName(oldName, newName) {
      this.resetEditState();
      this.renameTag({ oldName, newName });
      this.updateTagList();
    },
    deleteTagEvent(tagName) {
      this.$bvModal.msgBoxConfirm(`Удалить тег "${tagName}"?`, {
        title: 'Подтвердите удаление',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'УДАЛИТЬ',
        cancelTitle: 'ОТМЕНА',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
        .then((value) => {
          if (value) {
            this.deleteTag(tagName);
            this.updateTagList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.resetEditState();
    this.updateTagList();
  },
};
</script>
