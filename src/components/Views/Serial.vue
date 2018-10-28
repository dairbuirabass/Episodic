<template>
    <div>
        <h1>{{ serial[0].title }}</h1>
        <img :src="serial[0].imageUrl" class="img-thumbnail w-25 float-right my-5">
        <div class="my-5 mr-3">
            <div class="">
                <h4>Synopsis</h4>
                <p>{{ serial[0].synopsis }}</p>
                <ul class="">
                    <li class=""><b>Genre</b>: {{ (serial[0].genre) }}</li>
                    <li class=""><b>Launched</b>: {{ serial[0].yearLaunched }} ({{ dateToMoment(serial[0].yearLaunched) }})</li>
                    <li class="" v-if="serial[0].yearFinished"><b>Finished</b>: {{ serial[0].yearFinished }} ({{ dateToMoment(serial[0].yearFinished) }})</li>
                </ul>
            </div>
        </div>
        <div v-if="errors.length" class="alert alert-danger" role="alert">
            <p>
                <b>Please correct the following error(s):</b>
                 <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
        </div>
        <button class="btn btn-primary" @click="showForm(true)">Add Episode</button>
        <form v-if="formIsDisplayed" class="w-50 mt-5">
            <div class="form-group">
                <label for="seriesTitle">Title or Episode Number</label>
                <input v-model="inputs.title" type="text" class="form-control" id="episodeTitle" placeholder="Add Title">
            </div>
            <div class="form-group">
                <label for="seriesDesc">Description</label>
                <textarea v-model="inputs.synopsis" rows="4" class="form-control" id="episodeDesc" placeholder="Add short storyline. No spoilers!"></textarea>
            </div>
            <div class="row">
                <div class="form-group col-6">
                    <label for="seriesTitle">Date of Release</label>
                    <input v-model="inputs.dateOfRelease" type="date" class="form-control" id="seriesTitle">
                </div>
            </div>
            <div  class="form-group">
                <div v-for="(tag, i) in tags" class="">
                    <input type="checkbox" :id="tag" :value="tag" v-model="inputs.checkedTags">
                    <label for="tag" :class="'btn btn-' + badges[i]">{{ tag }}</label>
                </div>
            </div>
            <button @click.prevent="showForm(false)" class="btn btn-primary">Hide form</button>
            <button @click.prevent="send" class="btn btn-primary">Add Episode</button>
        </form>

        <h4 class="my-5">Episodes</h4>
        <ul class="list-group text-dark w-75 mt-5">
            <li v-for="episode in episodes" class="list-group-item">{{ episode.title }}
                <div class="d-inline-block">
                    <span v-for="(tag, index) in episode.tags" :class="'badge badge-pill badge-' + getTagBadge(episode.tags[index])">{{ episode.tags[index] }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        data () {
            return {
                errors: [],
                formIsDisplayed: false,
                inputs: {
                    title: '',
                    synopsis: '',
                    checkedTags: [],
                    dateOfRelease: ''
                },

                label: '',
                badges: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
                tags: ['Important', 'Filler Episode', 'Special Edition', 'Critical', 'Storyline', 'Guest Creator', 'Pilot', 'Unreleased' ]

            }
        },
        created () {
            this.$store.commit('setActiveSerial', this.$route.params.id)
            this.$store.commit('setActiveEpisodes', this.$route.params.id)
        },
        computed: {
            serial () {
                return this.$store.getters.loadSerial
            },
            episodes () {
                return this.$store.getters.loadEpisodes
            },
            user () {
                return this.$store.getters.user
            }
        },
        methods: {
            send () {
                if (this.validateForm()) {
                    const episodeData = {
                        serialId: this.$route.params.id,
                        title: this.inputs.title,
                        synopsis: this.inputs.synopsis,
                        tags: this.inputs.checkedTags,
                        dateOfRelease: this.inputs.dateOfRelease.toString(),
                    }
                    this.$store.dispatch('addEpisode', episodeData)
                    this.$router.push('/')
                }
            },
            getTagBadge (tag) {
                for (let i=0; i < this.tags.length; i++) {
                    if (tag == this.tags[i]) {
                      return this.badges[i]
                    }
                }
            },
            dateToMoment (date) {
                return moment(date).fromNow();
            },
            printBadge () {

                let rand = Math.floor(Math.random() * badges.length)

                let badge = badges[rand]

                if(labels[rand] != this.label) {
                    this.label = labels[rand]
                }

                return 'badge badge-pill badge-' + badge
            },
            showForm (bool) {
                if (!bool) {
                    this.formIsDisplayed = false
                } else if (bool && this.user) {
                    this.formIsDisplayed = true
                } else {
                    this.formIsDisplayed = false

                    this.errors = [];
                    this.errors.push('Please, Login to Add Episodes');
                }
            },
            validateForm () {
                if (
                    this.inputs.title &&
                    this.inputs.synopsis &&
                    this.inputs.checkedTags &&
                    this.inputs.dateOfRelease
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
                if (!this.inputs.checkedTags) {
                    this.errors.push('At least one tag is required!');
                }
                if (!this.inputs.dateOfRelease) {
                    this.errors.push('Date of Release is required!');
                }

                return false;
            }
        }
    }
</script>

<style scoped>

</style>
