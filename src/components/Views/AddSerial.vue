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
            <div class="form-group genres">
                <select class="custom-select" id="genres">
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
                    <input :disabled="ongoing" v-model="yearFinished" type="date" class="form-control mb-1" id="seriesTitle" :placeholder="placeholders.title">
                    <label for="checkboxOngoing">Ongoing?</label>
                    <input v-model="ongoing" id="checkboxOngoing" type="checkbox" selected>
                </div>
            </div>
            <div class="form-group">
                <div class="custom-file">
                    <input type="file" @change="onFileSelected" class="custom-file-input" id="serialCoverImg" accept="image/*">
                    <label class="custom-file-label" for="serialCoverImg">Upload Poster</label>
                </div>
            </div>
            <button @click.prevent="addToApi" class="btn btn-primary float-right">Add Serial</button>
        </form>

        <img :src="imageSrc" >
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
                genre: '',
                image: null,
                yearLaunched: '',
                yearFinished: '',
                selectedFile: null,
                placeholders: {
                    title: 'Santa Barbara',
                    synopsis: 'In Santa Barbara, California, the fascinating and tumultuous life of the rich',

                },
                genres: [
                    'Action', 'Anime', 'Cartoon', 'Drama', 'Ethnographic', 'Historical', 'Horror', 'Thriller'
                ]
            }
        },
        methods: {
            addToApi () {
                const serialData = {
                    title: this.title,
                    synopsis: this.synopsis,
                    genre: this.genre,
                    image: this.image,
                    yearLaunched: this.yearLaunched,
                    yearFinished: this.yearFinished,
                }
                console.log(serialData)
                this.$store.dispatch('addSerial', serialData)
                this.$router.push('/series')
            },
            onFileSelected (event) {
                const files = event.target.files;
                let filename = files[0].name;
                if (filename.lastIndexOf('.') <= 0) {
                    return alert('Please use a valid file!');
                }
                const fileReader = new FileReader();
                fileReader.addEventListener('load', () => {
                    this.imageSrc = fileReader.result;
                })
                fileReader.readAsDataURL(files[0]);
                this.image = files[0];
                console.log(this.image);
            }
        }
    }
</script>

<style scoped>

</style>
