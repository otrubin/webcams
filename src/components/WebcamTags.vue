<template>
  <b-modal
    id="webcam-tags"
    size="lg"
    :title="webcamData.title"
    title-class="text-center"
    ok-title="Применить"
    cancel-title="Отмена"
    @ok="assignTags"
  >
    <div class="row">
      <div class="col-md-5">
        <b-img :src="webcamData.image" fluid :alt="webcamData.title"></b-img>
      </div>
      <div class="col-md-7">
        <h5>Назначенные теги:</h5>
        <TagList
          :tagList="selectedTags"
          closeButton
          :autoClose="false"
          variant="success"
          @onCloseTag="onCloseSelectedTag"
          :filterTagString="newTagValue"
        />

        <label class="mt-4" for="add-tag">Добавить тег:</label>
        <b-form-input
          id="add-tag"
          class="mb-4"
          type="text"
          placeholder="Введите тег и нажмите Enter"
          v-model="newTagValue"
          @keypress.enter="addNewTag"
        ></b-form-input>

        <h5>Доступные теги:</h5>
        <TagList
          :tagList="aviableTags"
          canChoose
          @onChooseTag="onChooseAviableTag"
          :filterTagString="newTagValue"
        />
        <b-alert v-model="isError" variant="danger" dismissible class="mt-4">
          {{ error }}
        </b-alert>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TagList from './TagList.vue';

export default {
  name: 'WebcamTags',
  components: {
    TagList,
  },
  data: () => ({
    webcamData: {},
    aviableTags: [],
    selectedTags: [],
    newTagValue: '',
    error: '',
  }),
  computed: {
    ...mapGetters('tags', ['tagsAsArray', 'webcamFromId']),
    isError: {
      get() {
        return Boolean(this.error);
      },
      set(value) {
        if (value === false) {
          this.error = '';
        }
      },
    },
    // normalizedFilterTagString(){
    //   return this.filterTagString.toLowerCase();
    // }
  },
  methods: {
    ...mapActions('tags', ['addTags', 'addWebcam']),
    onChooseAviableTag(tag) {
      this.moveTag(tag, this.aviableTags, this.selectedTags);
      this.newTagValue = '';
    },
    onCloseSelectedTag(tag) {
      this.moveTag(tag, this.selectedTags, this.aviableTags);
    },
    moveTag(tag, source, destination) {
      const sourceIndex = source.indexOf(tag);
      if (sourceIndex === -1) {
        return false; // нет тега, тогда в источнике ничего не переносим
      }
      source.splice(sourceIndex, 1);
      destination.push(tag);
      return true;
    },
    addNewTag() {
      if (!this.selectedTags.includes(this.newTagValue)) {
        if (this.aviableTags.includes(this.newTagValue)) {
          this.moveTag(this.newTagValue, this.aviableTags, this.selectedTags);
        } else {
          this.selectedTags.push(this.newTagValue);
        }
        this.newTagValue = '';
      }
    },
    assignTags(bvModalEvt) {
      const webcamObj = JSON.parse(JSON.stringify(this.webcamData));
      webcamObj.tags = this.selectedTags;
      try {
        this.addWebcam(webcamObj);
      } catch (error) {
        this.error = error.message;
        bvModalEvt.preventDefault();
      }
    },
    // формируем список доступных
    initTagLists() {
      this.aviableTags = this.tagsAsArray.sort();// доступные теги

      const webcam = this.webcamFromId(this.webcamData.id);
      if (webcam) { // если веб-камере уже назначены теги, получаем их
        this.selectedTags = webcam.tags;
        // удаляем из списка доступных тегов назначенные теги
        for (let i = 0; i < this.selectedTags.length; i += 1) {
          const tag = this.selectedTags[i];
          const index = this.aviableTags.findIndex((item) => item === tag);
          if (index !== -1) {
            this.aviableTags.splice(index, 1);
          }
        }
      }
    },
    // вызывается из SearchList.vue
    handleWebcamTags(webcamData) {
      this.webcamData = webcamData;
      this.initTagLists();
      this.newTagValue = '';
      this.error = '';
      this.$bvModal.show('webcam-tags');
    },
  },
  watch: {
    newTagValue() {
      this.newTagValue = this.newTagValue.trim().toLowerCase();
    },
  },
};
</script>
