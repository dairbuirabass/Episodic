# Episodic

> A Vue.js project

## Idea

People nowadays watch tons of series from Netflix, HBO, Anime creators etc. It gets hard to choose what to watch or keep track of something you have already watched. If you remember some quote, how do you find the right episode? If you want to just chill and watch fillers - How do you know which episode is the filler? Which one is critically important? 

**Episodic** solves these problems by introducing the huge database of Series and Episodes, and without any spoilers letting users see and filter episodes with needed criteria.

## Functionality

You can see the site from [here](http://episodic-vuejs.s3-website.eu-central-1.amazonaws.com/). When you open the page a list of available series and episodes is displayed. You can open each one of them by clicking on the poster image. From there you can see the list of episodes and their tags (_Filler, Important etc._) You cannot add new episodes or new series without logging in (or signing up). When adding new episodes and new series, they appear immediately. Custom validators are used to require and check some inputs in forms.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
