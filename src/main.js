import { createApp } from 'vue';
import { createRouter, createWebHashHistory} from 'vue-router';
import AboutUs            from './pages/AboutUs.vue';
import HomePage           from './pages/HomePage.vue';
import UserRegistration   from './pages/UserRegistration.vue';
import UserAuthentication from './pages/UserAuthentication.vue';
import UserList           from './pages/UserList.vue';
import UserProfile        from './pages/UserProfile.vue';
import CompanyProfile     from './pages/CompanyProfile.vue'
import CompanyList        from './pages/CompanyList.vue'
import App                from './App.vue'


const routes = [
    { path: '/',                 component: HomePage          },
    { path: '/about/',           component: AboutUs           },
    { path: '/registration/',    component: UserRegistration  },
    { path: '/auth/',            component: UserAuthentication},
    { path: '/users/',           component: UserList          },
    { path: '/user/',            component: UserProfile       },
    { path: '/company/',         component: CompanyProfile    },
    { path: '/companies/',       component: CompanyList       },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    });

const app = createApp(App);
app.use(router);
app.mount('#app');
