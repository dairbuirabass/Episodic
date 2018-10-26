<template>
    <div>
        <h2>{{ title }}</h2>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        created () {
            axios.get('/series.json')
              .then(res => {
                  console.log(res);
              })
              .err(err => console.log(err))
        },
        data () {
            return {
                title: 'Kakahi'
            }
        }
    }
</script>

<style scoped>

</style>
