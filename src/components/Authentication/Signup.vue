<template>
    <div>
        <h1>Sign up</h1>
        <div v-if="error">
            <div class="alert alert-danger" role="alert">
                {{ error.message }}
            </div>
        </div>
        <form @submit.prevent="onSignup">
            <div class="form-group">
                <label for="email">Email address</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="password">Confirm password</label>
                <input v-model="confirmPassword" type="password" class="form-control" id="confirmPassword" placeholder="Re-type password">
            </div>
            <button type="submit" class="btn btn-primary">
                Sign up
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                email: '',
                password: '',
                confirmPassword: ''
            }
        },
        computed: {
            comparePasswords () {
                if (this.password !== this.confirmPassword) {
                    this.$store.dispatch('clearError')
                    this.$store.setError({ message: 'Passwords should be identical.' });
                    return false;
                } else {
                    return true;
                }
            },
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
            onSignup () {
                if (this.comparePasswords) {
                    this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
                }
            },
            onDismissed () {
                this.$store.dispatch('clearError')
            }
        }
    }
</script>
