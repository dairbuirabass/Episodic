<template>
    <div>
        <h1>Sign in</h1>
        <div v-if="error" class="alert alert-danger" role="alert">
            {{ error.message }}
        </div>
        <form @submit.prevent="onSignin">
            <div class="form-group">
                <label for="email">Email address</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">
                Sign in
            </button>
            <button @click="goToSignup" type="button" class="btn btn-link">Sign up</button>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                email: '',
                password: ''
            }
        },
        computed: {
            user () {
                return this.$store.getters.user
            },
            error () {
               return this.$store.getters.error
            },
            loading () {
                return this.$store.getters.loading
            }
        },
        watch: {
            user (value) {
                if (value !== null && value !== undefined) {
                   this.$router.push('/')
                }
            }
        },
        methods: {
            onSignin () {
                this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
            },
            onDismissed () {
                this.$store.dispatch('clearError')
            },
            goToSignup () {
                this.$router.push('/signup')
            }
        }
    }
</script>
