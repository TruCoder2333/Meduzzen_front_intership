<template>
    <div>
        <h1>{{ $t('signUp') }}</h1>

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