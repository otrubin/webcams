<template>
  <div class="tag-managenent-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <EditTagList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditTagList from '@/components/EditTagList.vue';

export default {
  name: 'TagsManagement',
  components: { EditTagList },
};
</script>
