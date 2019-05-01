<template>
    <div class="container">
        <div class="text-center my-5" v-if="loading"><i class="my-5 fas fa-spin fa-spinner fa-9x" style="color: #00f"></i></div>
        <div class="card my-5" v-else>
            <div class="card-header">{{title}}</div>
            <!-- <div class="card-img-top my-2" :style="{'background-image': `url(${imgUrl})`, display: 'block', height: '650px'}"></div> -->
            <div class="card-body my-2">
                <!-- <div class="card-title">{{title}}</div> -->
                <div class="card-img-top" :style="{'background-image': `url(${imgUrl})`, display: 'block', height: '650px'}"></div>
                <div class="card-text my-3" v-html="content"></div>
                <div class="comments my-4">
                    <vue-disqus shortname="my-blog" :identifier="slug" :url="url"></vue-disqus>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import config from '@/config';

export default {
    mounted() {
        this.viewArticle(this.$route.params.id);
    },
    data() {
        return {
            title: '',
            content: '',
            slug: '',
            createdAt: '',
            updatedAt: '',
            imgUrl: '',
            loading: true,
            url: window.location.href,
        };
    },
    computed: {
        href() {
            return `http://localhost:8080/article/${slug}`;
        }
    },
    methods: {
        viewArticle(id) {
            // this.loading = true;
            Axios.get(`${config.apiUrl}article/${id}`)
            .then(response => {
                // console.log(response);
                this.loading = false;
                this.title = response.data.data.title;
                this.content = response.data.data.content;
                this.imgUrl = response.data.data.imageUrl;
                this.createdAt = response.data.data.created_at;
                this.upcatedAt = response.data.data.updated_at;
            })
            .catch(({response}) => {
                this.loading = false;
                console.log(response);
            });
        },
    }
}
</script>
