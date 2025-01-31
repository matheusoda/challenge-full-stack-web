<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="page-container">
    <aside class="sidebar">
        <nav>
          <!-- <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink> -->
          <RouterLink to="/studentList">Alunos</RouterLink>
        </nav>
    </aside>

    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

.page-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #333;
  padding: 1rem;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
}

nav a:hover {
  background-color: #444;
}

nav a.router-link-exact-active {
  background-color: #555;
}

.content {
  margin-left: 200px;
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  overflow-x: auto;
}

@media (min-width: 1024px) {
  .sidebar {
    width: 20vw;
  }
  .content {
    margin-left: 20vw;
  }
}

@media (min-width: 1300px) {
  .sidebar {
    width: 20vw;
  }
  .content {
    margin-left: 15vw;
  }
}
</style>
