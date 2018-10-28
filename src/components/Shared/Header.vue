<template>
    <div>
        <ul class="nav">
            <router-link to="/" tag="li" active-class="active" class="nav-item">
                <a class="nav-link text-light">Home</a>
            </router-link>
            <router-link to="/addSerial" tag="li" active-class="active" class="nav-item">
                <a class="nav-link text-light">Add Serial</a>
            </router-link>

            <div class="ml-auto">
                <template v-if="userIsAuthenticated">
                    <li class="nav-item">
                        <a @click="onLogout" class="nav-link text-light" href="#">
                            Log out
                        </a>
                    </li>
                </template>
                <template v-else>
                    <router-link to="/signin/" tag="li" active-class="active" class="nav-item">
                        <a class="nav-link text-light">Sign in</a>
                    </router-link>
                </template>
            </div>
        </ul>
    </div>
</template>

<script>
    export default {
        methods: {
            onLogout () {
                this.$store.dispatch('logout')
                this.$router.push('/');
            }
        },
        computed: {
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            user () {
                return this.$store.getters.user
            },
        }
    }
</script>
