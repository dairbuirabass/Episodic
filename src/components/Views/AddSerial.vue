<template>
    <div>
        <h2>Add New Serial</h2>
        <form>
            <div class="form-group">
                <label for="seriesTitle">Title</label>
                <input v-model="title" type="text" class="form-control" id="seriesTitle" :placeholder="placeholders.title">
            </div>
            <div class="form-group">
                <label for="seriesDesc">Synopsis</label>
                <textarea v-model="synopsis" rows="4" class="form-control" id="seriesDesc" :placeholder="placeholders.synopsis"></textarea>
            </div>
            <div class="genres">
                <select class="custom-select" id="genres" aria-label="Example select with button addon">
                    <option selected>Choose...</option>
                    <option v-for="genre in genres">{{ genre }}</option>
                </select>
            </div>
            <div class="row">
                <div class="form-group col-6">
                    <label for="seriesTitle">Launched in</label>
                    <input v-model="yearLaunched" type="date" class="form-control" id="seriesTitle" :placeholder="placeholders.title">
                </div>
                <div class="form-group col-6">
                    <label for="seriesTitle">Finished in</label>
                    <input v-model="ongoing" type="checkbox" aria-label="Ongoing?" selected>
                    <input :disabled="ongoing" v-model="yearFinished" type="date" class="form-control" id="seriesTitle" :placeholder="placeholders.title">
                </div>
            </div>
            <button @click.prevent="addToApi" class="btn btn-primary float-right">Add Serial</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data () {
            return {
                ongoing: true,
                title: '',
                synopsis: '',
                genre: Array,
                yearLaunched: Date,
                yearFinished: Date,
                placeholders: {
                    title: 'Santa Barbara',
                    description: 'In Santa Barbara, California, the fascinating and tumultuous life of the rich',

                },
                genres: [
                    'Action', 'Anime', 'Cartoon', 'Drama', 'Ethnographic', 'Historical', 'Horror', 'Thriller'
                ]
            }
        },
        methods: {
            addToApi () {
                const formData = {
                    title: this.title,
                    synopsis: this.synopsis,
                    genre: this.genre,
                    yearLaunched: this.yearLaunched,
                    yearFinished: this.yearFinished,
                }

                axios.post('https://episodic-7721b.firebaseio.com/series.json', {formData})
                  .then(res => console.log(res))
                  .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>
