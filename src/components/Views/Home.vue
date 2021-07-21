<template>
    <div>
        <div class="block">
            <h1 class="d-inline-block">Latest Series</h1>
            <router-link to="/series" tag="h6" class="d-inline-block ml-3">
                <a class="display-6 text-light">See all</a>
            </router-link>
            <div class="card-columns text-dark" v-if="!loading">
                <div v-for="(serial, i) in series">
                    <div class="card p-0">
                        <img @click="redirectToSerial(serial.id)" class="card-img-top" :src="serial.imageUrl" :alt="serial.title">
                        <div class="card-body">
                            <h5 class="card-title">{{ serial.title }}</h5>
                            <p class="card-text">{{ serial.synopsis | truncate(300, '...') }}</p>
                            <ul class="list-group">
                                <li class="list-group-item"><b>Genre</b>: {{ (serial.genre) }}</li>
                                <li class="list-group-item">Launched: {{ serial.yearLaunched }} ({{ dateToMoment(serial.yearLaunched) }})</li>
                                <li class="list-group-item" v-if="serial.yearFinished">Finished: {{ serial.yearFinished }} ({{ dateToMoment(serial.yearFinished) }})</li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <a @click="redirectToSerial(serial.id)" href="#" class="card-link">Serial Details</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>

        <div class="block">
            <h1>Random Episodes</h1>
            <div class="card-columns text-dark" v-if="!loading">
                <div v-for="(episode, i) in episodes">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">{{ episode.title }}</h5>
                            <p class="card-text">{{ episode.synopsis | truncate(300, '...') }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        computed: {
            series () {
                return this.$store.getters.loadedSeries
            },
            episodes () {
                return this.$store.getters.loadedEpisodes
            },
            loading () {
                return this.$store.getters.loading
            }
        },
        methods: {
            redirectToSerial (id) {
                this.$router.push('/serial/' + id)
            },
            dateToMoment (date) {
                return moment(date).fromNow();
            },
        }
    }
</script>

<style scoped>
    .block {
      margin: 64px 0;
    }

    a {
        text-decoration: none;
    }

    .card-img-top:hover {
        cursor: pointer;
    }

</style>
