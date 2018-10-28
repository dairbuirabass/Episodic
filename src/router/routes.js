import Home from '../components/Views/Home.vue';
import AddSerial from '../components/Views/AddSerial.vue';
import Serial from '../components/Views/Serial.vue';
import AuthGuard from './auth-guard';
import Signin from '../components/Authentication/Signin';
import Signup from '../components/Authentication/Signup';

export const routes = [
    // Auth
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },

    { path: '', component: Home },

    // Actions
    { path: '/addSerial', component: AddSerial, beforeEnter: AuthGuard },

    // Views
    { path: '/serial/:id', component: Serial },

    // 404
    { path: '*', redirect: '/' },
]
