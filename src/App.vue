<template>
    <div>
        <app-header></app-header>
        <div class="container text-light">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Header from './components/Shared/Header.vue';

    export default {
        components: {
            // Shared
            appHeader: Header,
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
