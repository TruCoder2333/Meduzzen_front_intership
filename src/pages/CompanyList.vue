<template>
    <div>
        <h1>{{ $t('allCompanies') }}</h1>

        <router-link to="/">{{ $t('home_link') }}</router-link>
    </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLanguage: "en",
    };
  },
};
</script>