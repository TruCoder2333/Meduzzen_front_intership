<template>
    <div class="ratings">
      <span v-for="n in fullStars" :key="`full-${n}`">&#9733;</span> 
      <span v-if="hasHalfStar">&#9734;</span> 
      <span v-for="n in emptyStars" :key="`empty-${n}`">&#9734;</span> 
    </div>
  </template>
  
  <script>
  
  export default {
    props: {
      rating: {
        type: Number,
        required: true
      },
      maxRating: {
        type: Number,
        default: 5
      }
    },
    computed: {
      scaledRating() {
        const validRating = (!isNaN(this.rating) && this.rating >= 0 && this.rating <= 1) ? this.rating : 0;
        return validRating * this.maxRating;
      },
      fullStars() {
        return Math.floor(this.scaledRating);
      },
      hasHalfStar() {
      return this.scaledRating % 1 !== 0;
      },
      emptyStars() {
        return this.hasHalfStar ? this.maxRating - this.fullStars - 1 : this.maxRating - this.fullStars;
      }
    }
  };
  </script>
  
<style>
 .ratings {
  }
  .ratings span {
    color: gold;
    font-size: 24px;
  }
</style>
  