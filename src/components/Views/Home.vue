<template>
    <div>
        <div class="block">
            <h1 class="d-inline-block">Latest Series</h1>
            <router-link to="/series" tag="h6" class="d-inline-block ml-3">
                <a class="display-6 text-light">See all</a>
            </router-link>
            <div class="row text-dark">
                 <div v-for="serial in series" class="card" style="width: 33%">
                    <img class="card-img-top" :src="serial.imageUrl" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{ serial.title }}</h5>
                        <p class="card-text">{{ serial.synopsis }}</p>
                    </div>
                    <div class="card-body">
                        <a href="#" class="card-link">Serial Details</a>
                        <a href="#" class="card-link">Edit Serial Details</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="block">
            <h1>Random Episodes</h1>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            series () {
                return this.$store.getters.loadedSeries
            }
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

</style>
