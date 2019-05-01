<template>
    <!-- <div class="container"> -->
        <div class="card my-2">
            <div class="card-header font-weight-bolder">{{title}}</div>
            <div class="card-body">
                <p class="my-2">{{content}}</p>
                <router-link :to="`/article/${slug}`" @click="viewArticle(id)" class="btn btn-primary">Read More</router-link>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Axios from 'axios';
import config from '@/config'

export default {
    props: ['title', 'content', 'slug', 'id'],
    methods: {
        //
    }
}
</script>

