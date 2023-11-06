<template>
    <div>
      <ul>
        <li v-for="entity in displayedEntities" 
        :key="entity.id">
        {{ entity.username }}
        </li>
      </ul>
  
      <button @click="previousPage" :disabled="currentPage === 1">{{ $t('previous') }}</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">{{ $t('next') }}</button>
    </div>
</template>
  
  <script>
  export default {
    props: {
      entities: {
        type: Array,
        required: true,
      },
      currentPage: {
        type: Number,
        required: true,
      },
      entitiesPerPage: {
        type: Number,
        required: true,
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.entities.length / this.entitiesPerPage);
      },
      displayedEntities() {
        const startIndex = (this.currentPage - 1) * this.entitiesPerPage;
        const endIndex = startIndex + this.entitiesPerPage;
        return this.entities.slice(startIndex, endIndex);
      },
    },
    methods: {
      previousPage() {
        if (this.currentPage > 1) {
          this.$emit('update:currentPage', this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.$emit('update:currentPage', this.currentPage + 1);
        }
      },
    },
  };
  </script>
  