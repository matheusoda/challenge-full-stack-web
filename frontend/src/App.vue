<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.clearToken()
  router.push('/login')
}
</script>

<template>
  <div class="layout-container">
    <header v-if="authStore.token && !route.meta.noSidebar" class="topbar">
      <!-- <img src="@/assets/grupo-a-logo.png" alt="Logo" class="logo" /> -->
    </header>

    <div class="main-container">
      <aside v-if="authStore.token && !route.meta.noSidebar" class="sidebar">
        <nav>
          <RouterLink
            to="/studentList"
            class="nav-link"
            :class="{ active: route.path === '/studentList' }"
            >Alunos</RouterLink
          >
        </nav>
        <button class="logout-btn" @click="logout">Logout</button>
      </aside>
      <div v-if="authStore.token" class="content">
        <RouterView />
      </div>
      <div v-else class="login-container">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  background-color: #ffff;
  overflow-y: auto;
  overflow-x: auto;
}

.topbar {
  height: 60px;
  background-color: #ffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logo {
  height: 40px;
  width: auto;
}

.main-container {
  display: flex;
  flex-grow: 1;
}

.sidebar {
  width: 250px;
  padding: 1rem;
  color: white;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}

.sidebar-logo {
  width: 150px;
  margin-bottom: 1rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1rem;
  flex-grow: 1;
  width: 100%;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  background-color: #aaaaaa;
}

nav a:hover {
  background-color: #444;
}

nav a.router-link-exact-active {
  background-color: #555;
}

.logout-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
}

.logout-btn:hover {
  background-color: #cc0000;
}

.content {
  flex-grow: 1;
  padding: 50px 0 0 2rem;
  width: calc(100% - 270px);
  display: flex;
  justify-content: center;
  overflow-y: auto;
  overflow-x: auto;
  margin-left: 250px;
  height: calc(100vh - 60px);
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.edit-btn {
  color: blue;
  cursor: pointer;
  font-weight: bold;
}

.delete-btn {
  color: red;
  cursor: pointer;
  font-weight: bold;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 200px;
  }
  .content {
    margin-left: 200px;
    width: calc(100% - 200px);
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 180px;
  }
  .content {
    margin-left: 180px;
    width: calc(100% - 180px);
  }
}
</style>
