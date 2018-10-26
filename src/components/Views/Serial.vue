<template>
    <div>
        <h2>{{ callMethod() }}</h2>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        computed: {
            series () {
                return this.$store.getters.loadedSerial
            },
        },
        methods: {
            callMethod () {
                console.log(this.serial)
            }
        }
    }
</script>

<style scoped>

</style>
