<template>
    <div>
        <h1>{{ serial[0].title }}</h1>
        <img :src="serial[0].imageUrl" class="img-thumbnail w-25 float-right my-5">
        <div class="my-5 mr-3">
            <div class="">
                <h4>Synopsis</h4>
                <p>{{ serial[0].synopsis }}</p>
                <ul class="">
                    <li class=""><b>Genre</b>: {{ (serial[0].genre) }}</li>
                    <li class="">Launched: {{ serial[0].yearLaunched }} ({{ dateToMoment(serial[0].yearLaunched) }})</li>
                    <li class="" v-if="serial[0].yearFinished">Finished: {{ serial[0].yearFinished }} ({{ dateToMoment(serial[0].yearFinished) }})</li>
                </ul>
            </div>
        </div>
        <ul class="list-group text-dark w-75">
            <li v-for="n in 8" class="list-group-item">Episode {{n}} <span :class="'badge badge-pill badge-' + badges[n-1]">{{ labels[n-1] }}</span></li>
        </ul>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        data () {
            return {
                label: '',
                badges: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
                labels: ['Important', 'Filler Episode', 'Special Edition', 'Critical', 'Storyline', 'Guest Creator', 'Pilot', 'Unreleased' ]

            }
        },
        created () {
            this.$store.commit('setActiveSerial', this.$route.params.id)
        },
        computed: {
            serial () {
                return this.$store.getters.loadSerial
            }
        },
        methods: {
            dateToMoment (date) {
                return moment(date).fromNow();
            },
            printBadge () {

                let rand = Math.floor(Math.random() * badges.length)

                let badge = badges[rand]

                if(labels[rand] != this.label) {
                    this.label = labels[rand]
                }

                return 'badge badge-pill badge-' + badge
            }
        }
    }
</script>

<style scoped>

</style>
