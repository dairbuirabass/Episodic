<template>
    <div>
        <div class="block">
            <h1>Latest Series</h1>
            <div class="row text-dark">
                 <div v-for="n in 3" class="card" style="width: 33%">
                    <img class="card-img-top" src="/src/assets/logo.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <div class="card-body">
                        <a href="#" class="card-link">Serial Details</a>
                        <a href="#" class="card-link">Edit Serial Details</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="block">
            <h1>Random Episode</h1>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .block {
      margin: 64px 0;
    }

</style>
