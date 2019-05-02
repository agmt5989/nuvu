<template>
	<div class="container-fluid">
		<h1 class="text-center my-5">Welcome Home</h1>
		<div class="mt-4 d-flex justify-content-between">
			<button :disabled="!articles.prev_page_url" @click="customGet(articles.prev_page_url)" class="btn btn-warning">
				Prev Page
			</button>
			<button :disabled="!articles.next_page_url" @click="customGet(articles.next_page_url)" class="btn btn-warning">
				Next Page
			</button>
		</div>
		<div class="text-center my-5" v-if="loading"><i class="my-5 fas fa-spin fa-spinner fa-9x" style="color: #00f"></i>
		</div>
		<div class="row" v-else>
			<div class="col-md-10 offset-md-1" v-for="article in articles.data" :key="article.id">
				<Article :id="article.id" :title="article.title" :content="article.content.substring(0, 160)" :slug="article.slug"/>
			</div>
		</div>
	</div>
</template>

<script>
	import Axios from 'axios';
	import config from '@/config';
	import Article from '@/components/Article.vue';

	export default {
		components: {
			Article
		},
		mounted() {
			this.$root.location = 'home';
			this.getArticles();
		},
		data() {
			return {
				articles: {},
				loading: false,
			}
		},
		methods: {
			customGet(next) {
				let k = next.split('?');
				this.getArticles(`${config.apiUrl}articles?${k[1]}`);
			},
			getArticles(url = `${config.apiUrl}articles`) {
				this.loading = true;
				Axios.get(url)
					.then(response => {
						this.loading = false;
						this.articles = response.data.data;
					})
					.catch(() => {
						this.loading = false;
						this.$noty.error('Couldn\'t reach the API');
					})
			}
		}
	}
</script>
