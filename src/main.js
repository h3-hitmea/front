import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import store from './store';
import Inscription from './components/Inscription.vue';
import Connexion from './components/Connexion.vue';
import MaterialInput from './components/Material-input.vue';
import FaceComparaison from './components/FaceComparaison.vue';
import Materials from './components/MaterialList.vue';

const routes = [
  {
    path: '/',
    redirect: () => {
      // Si l'utilisateur est déconnecté, redirige vers /materials
      return store.state.authToken ? '/' : '/materials';
    },
  },
  {
    path: '/inscription',
    component: Inscription
  },
  {
    path: '/connexion',
    component: Connexion
  },
  {
    path: '/material',
    component: MaterialInput
  },
  {
    path: '/facecompare',
    component: FaceComparaison
  },
  {
    path: '/materials',
    component: Materials
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const authToken = localStorage.getItem('authToken');
if (authToken) {
  // Si un token est trouvé, le mettre dans le store Vuex
  store.commit('SET_AUTH_TOKEN', authToken);
}

createApp(App).use(router).use(store).mount('#app');
