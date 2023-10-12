import { createApp } from 'vue';
import { createRouter, createWebHashHistory} from 'vue-router';
import App from './App.vue'


const routes = [
  { path: '/', component: () => import('./pages/HomePage.vue') },
  { path: '/about/', component: () => import('./pages/AboutUs.vue') },
  { path: '/sign_up/', component: () => import('./pages/UserRegistration.vue') },
  { path: '/sign_in/', component: () => import('./pages/UserAuthentication.vue') },
  { path: '/all_users/', component: () => import('./pages/UserList.vue') },
  { path: '/user_profile/', component: () => import('./pages/UserProfile.vue') },
  { path: '/company_profile/', component: () => import('./pages/CompanyProfile.vue') },
  { path: '/all_companies/', component: () => import('./pages/CompanyList.vue') },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    });

const app = createApp(App);
app.use(router);
app.mount('#app');
