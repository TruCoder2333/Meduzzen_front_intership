import { createApp } from 'vue';
import { createRouter, createWebHistory} from 'vue-router';
import App from './App.vue'
import i18n from './i18n';
import store from './store/store'

const routes = [
  { path: '/', component: () => import('./pages/HomePage.vue') },
  { path: '/about/', component: () => import('./pages/AboutUs.vue') },
  { path: '/sign_up/', component: () => import('./pages/UserRegistration.vue') },
  { path: '/sign_in/', component: () => import('./pages/UserAuthentication.vue') },
  { path: '/all_users/', component: () => import('./pages/UserList.vue'), meta: { requiresAuth: true } },
  { path: '/user_profile/', component: () => import('./pages/UserProfile.vue'), meta: { requiresAuth: true } },
  { path: '/company_profile/', component: () => import('./pages/CompanyProfile.vue'), meta: { requiresAuth: true } },
  { path: '/all_companies/', component: () => import('./pages/CompanyList.vue'), meta: { requiresAuth: true } },
  { path: '/health_check/', component: () => import('./pages/HealthCheck.vue')},
  { path: '/quizzes/:quizId/', component: () => import('./pages/QuizPage.vue'), meta: { requiresAuth: true }}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    });

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated;
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/sign_in');
      } else {
        next();
      }
    });

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(store);
app.mount('#app');
