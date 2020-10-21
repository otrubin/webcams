<template>
  <div class="edit-tag-item d-flex">
    <template v-if="isEdit">
      <input
        v-model="editedTagName"
        @keyup.enter="finihEditingTagName"
        @keyup.esc="cancelEditingTagName"
        class="mr-auto edit-tagname-input"
        ref="input"
      />
      <b-icon
        class="edit-tag-icon edit-tag-icon-edit"
        icon="patch-check"
        variant="success"
        v-if="visibleFinishEditingIcon"
        @click="finihEditingTagName">
      </b-icon>
      <b-icon
        class="edit-tag-icon edit-tag-icon-cancel"
        icon="patch-minus"
        variant="warning"
        @click="cancelEditingTagName">
      </b-icon>
    </template>
    <template v-else>
      <span class="edit-tag-name mr-auto" @dblclick="startEditingTagName">{{ name }}</span>
      <b-icon
        class="edit-tag-icon edit-tag-icon-edit"
        icon="pencil-square"
        variant="primary"
        @click="startEditingTagName">
      </b-icon>
    </template>
      <b-icon
        class="edit-tag-icon edit-tag-icon-delete"
        icon="x-circle"
        variant="danger"
        @click="deleteTag">
      </b-icon>
  </div>
</template>

<script>
export default {
  name: 'EditTagItem',
  props: {
    name: String,
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    editedTagName: '',
  }),
  computed: {
    visibleFinishEditingIcon() {
      return this.name !== this.editedTagName;
    },
  },
  methods: {
    startEditingTagName() {
      this.$emit('startEditingTagName', this.name);
      this.editedTagName = this.name;
      this.$nextTick(() => {
        this.$refs.input.focus();
        // document.querySelector('.edit-tagname-input').focus();
      });
    },
    finihEditingTagName() {
      if (this.editedTagName && (this.editedTagName !== this.name)) {
        this.$emit('finihEditingTagName', this.name, this.editedTagName);
      }
    },
    cancelEditingTagName() {
      this.$emit('cancelEditingTagName');
    },
    deleteTag() {
      this.$emit('deleteTag', this.name);
    },
    updated() {
      console.log(this.name, this.isEdit);
      this.$nextTick(() => {
        console.log(this.name, this.isEdit);
      });
    },
  },
};
</script>

<style scoped>
  .edit-tag-item{
    padding: 5px 15px;
    background-color: #e0fafd;
    align-items: center;
  }
  .edit-tag-item:nth-child(odd){
    background-color: #f2f2f2;
  }
  .edit-tag-name {
    line-height: 1;
  }
  .edit-tag-icon {
    margin: 0 0 0 10px;
  }
  .edit-tag-icon:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
</style>
