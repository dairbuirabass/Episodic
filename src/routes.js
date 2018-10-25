import Home from './components/Views/Home.vue';
import AddSerial from './components/Views/AddSerial.vue';
import AddEpisode from './components/Views/AddEpisode.vue';
import Serial from './components/Views/Serial.vue';
import Episode from './components/Views/Episode.vue';

export const routes = [
    { path: '', component: Home },
    // Actions
    { path: '/addSerial', component: AddSerial },
    { path: '/addEpisode', component: AddEpisode },

    // Views
    { path: '/serial/:id', component: Serial },
    { path: '/serial/:sid/:eid', component: Episode },
]
