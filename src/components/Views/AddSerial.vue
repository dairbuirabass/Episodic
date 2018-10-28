<template>
    <div>
        <h2>Add New Serial</h2>
        <form>
            <div v-if="errors.length" class="alert alert-danger" role="alert">
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors">{{ error }}</li>
                    </ul>
                </p>
            </div>

            <div class="form-group">
                <label for="seriesTitle">Title</label>
                <input v-model="inputs.title" type="text" class="form-control" id="seriesTitle" :placeholder="placeholders.title">
            </div>
            <div class="form-group">
                <label for="seriesDesc">Synopsis</label>
                <textarea v-model="inputs.synopsis" rows="4" class="form-control" id="seriesDesc" :placeholder="placeholders.synopsis"></textarea>
            </div>
            <div class="form-group genres">
                <select v-model="inputs.genre" class="custom-select" id="genres">
                    <option selected>Choose...</option>
                    <option v-for="genre in genres" :value="genre">{{ genre }}</option>
                </select>
            </div>
            <div class="row">
                <div class="form-group col-6">
                    <label for="seriesTitle">Launched in</label>
                    <input v-model="inputs.yearLaunched" type="date" class="form-control" id="seriesTitle" :placeholder="placeholders.title">
                </div>
                <div class="form-group col-6">
                    <label for="seriesTitle">Finished in</label>
                    <input :disabled="ongoing" v-model="inputs.yearFinished" type="date" class="form-control mb-1" id="seriesTitle" :placeholder="placeholders.title">
                    <label for="checkboxOngoing">Ongoing?</label>
                    <input v-model="ongoing" id="checkboxOngoing" type="checkbox" selected>
                </div>
            </div>
            <div class="form-group">
                <div class="custom-file">
                    <input type="file" @change="onFileSelected" class="custom-file-input" id="serialCoverImg" accept="image/*">
                    <label class="custom-file-label" for="serialCoverImg">{{ inputs.filename }}</label>
                </div>
            </div>
            <button @click.prevent="send" class="btn btn-primary float-right">Add Serial</button>
        </form>

        <img :src="previewImg" >
    </div>
</template>

<script>
    export default {
        data () {
            return {
                ongoing: true,
                errors: [],
                previewImg: null,
                inputs: {
                    title: '',
                    synopsis: '',
                    genre: '',
                    filename: 'Upload Poster',
                    image: null,
                    yearLaunched: '',
                    yearFinished: '',
                },
                placeholders: {
                    title: 'Santa Barbara',
                    synopsis: 'In Santa Barbara, California, the fascinating and tumultuous life of the rich',
                },
                genres: [
                    'Action', 'Anime', 'Cartoon', 'Drama', 'Ethnographic', 'Historical', 'Horror', 'Thriller', 'Sitcom'
                ]
            }
        },
        methods: {
            send () {
                if (this.validateForm()) {
                    const serialData = {
                        title: this.inputs.title,
                        synopsis: this.inputs.synopsis,
                        genre: this.inputs.genre,
                        image: this.inputs.image,
                        yearLaunched: this.inputs.yearLaunched.toString(),
                        yearFinished: this.inputs.yearFinished.toString(),
                    }
                    this.$store.dispatch('addSerial', serialData)
                    this.$router.push('/')
                }
            },
            onFileSelected (event) {
                const files = event.target.files;
                this.inputs.filename = files[0].name;
                if (this.inputs.filename .lastIndexOf('.') <= 0) {
                    return alert('Please use a valid file!');
                }
                const fileReader = new FileReader();
                // Displays preview
                fileReader.addEventListener('load', () => {
                    this.previewImg = fileReader.result;
                })
                fileReader.readAsDataURL(files[0]);
                this.inputs.image = files[0];
            },
            validateForm () {
                if (
                    this.inputs.title &&
                    this.inputs.synopsis &&
                    this.inputs.genre &&
                    this.inputs.yearLaunched &&
                    this.inputs.image
                ) {
                  return true;
                }

                this.errors = [];

                if (!this.inputs.title) {
                    this.errors.push('Title required!');
                }
                if (!this.inputs.synopsis) {
                    this.errors.push('Synopsis required!');
                }
                if (!this.inputs.genre) {
                    this.errors.push('Genre required!');
                }
                if (!this.inputs.yearLaunched) {
                    this.errors.push('Year Launched required!');
                }
                if (!this.inputs.image) {
                    this.errors.push('Poster image is required!');
                }
                return false;
            }
        }
    }
</script>

<style scoped>

</style>
