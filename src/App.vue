<template>
  <div>
    <router-view />
    <header>
      <NavBar />
    </header>
    <footer>
      <p>&copy; 2023 My Vue App</p>
    </footer>
  </div>
</template>
  
<script>
import NavBar from '/app/src/components/NavBar.vue' 

export default {
    components: {
      NavBar,
    },
  };
  </script>
  
  <style>
  /* Add your styles for the App.vue component */
  body {
    font-family: Arial, sans-serif;
  }
  /* ... other styles */
  </style>
  