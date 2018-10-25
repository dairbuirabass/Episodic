<template>
    <div class="container text-light">
        <app-home></app-home>
    </div>
</template>

<script>
    import Home from './components/Home/Home.vue';
    export default {
        components: {
            appHome: Home
        }
    }
</script>

<style>
    body {
        background-color: #605a9c;
    }
    .container {
    }
</style>
