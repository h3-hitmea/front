import { createRouter, createWebHistory } from 'vue-router'
import Inscription from './components/Inscription.vue';
import Connexion from './components/Connexion.vue';
import MaterialInput from './components/Material-input.vue';
import FaceComparaison from './components/FaceComparaison.vue';

const routes = [
  { path: '/inscription', component: Inscription },
  { path: '/connexion', component: Connexion },
  { path: '/material', component: MaterialInput },
  { path: '/facecompare', component: FaceComparaison }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
