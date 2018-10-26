<template>
    <div>
        <div class="container text-light">
            <app-header></app-header>
            <transition name="slide" mode="out-in">
                <router-view></router-view>
            </transition>
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
