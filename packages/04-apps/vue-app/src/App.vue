<script setup>
import { ref } from 'vue';
const isAuthenticated = ref(false);
const handleLoginSuccess = (event) => {
  console.log('Vue App: Login OK', event.detail);
  document.cookie = `session_token=${event.detail.token}; Path=/;`;
  isAuthenticated.value = true;
};
</script>

<template>
  <div>
    <h1 style="text-align: center;">Aplicação Vue.js</h1>
    <app-shell v-if="isAuthenticated">
      <todo-screen></todo-screen>
    </app-shell>
    <login-form v-else @login-success="handleLoginSuccess"></login-form>
  </div>
</template>