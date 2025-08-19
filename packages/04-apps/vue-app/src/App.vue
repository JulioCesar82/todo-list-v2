<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { sessionService } from "@project/data";

const isAuthenticated = ref(sessionService.isAuthenticated());
let unsubscribe;

const handleLoginSuccess = (event) => {
  console.log("Vue App: Login OK", event.detail);
  isAuthenticated.value = true;
};

const handleLogout = () => {
  console.log("Vue App: Logout");
  isAuthenticated.value = false;
};

onMounted(() => {
  unsubscribe = sessionService.onChange((event) => {
    if (event === "logged-out") {
      handleLogout();
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<template>
  <div>
    <h1 style="text-align: center">Aplicação Vue.js</h1>
    <app-shell v-if="isAuthenticated">
      <todo-screen />
    </app-shell>
    <login-form v-else @login-success="handleLoginSuccess" />
  </div>
</template>
