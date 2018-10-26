import Home from '../components/Views/Home.vue';
import AddSerial from '../components/Views/AddSerial.vue';
import AddEpisode from '../components/Views/AddEpisode.vue';
import Series from '../components/Views/Series.vue';
import Episode from '../components/Views/Episode.vue';
import AuthGuard from './auth-guard';
import Signin from '../components/Authentication/Signin';
import Profile from '../components/Authentication/Profile';
import Signup from '../components/Authentication/Signup';

export const routes = [
    // Auth
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },

    { path: '', component: Home },

    // Actions
    { path: '/addSerial', component: AddSerial, beforeEnter: AuthGuard },
    { path: '/addEpisode', component: AddEpisode, beforeEnter: AuthGuard },

    // Views
    { path: '/serials/', component: Series, children: [
            { path: '/:id', component: Series }
        ]
    },
    { path: '/serials/:id', component: Series },
    { path: '/serials/:s_id/:e_id', component: Episode },

    // 404
    { path: '*', redirect: '/', data: {msg: '404! Route not found'} },
]
