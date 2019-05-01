<template>
	<div class="container">
		<div class="row">
			<div class="col-md-8 offset-md-2">
				<div class="card my-4">
					<div class="card-body">
						<v-p
							accept="image/jpeg,image/png"
							size="2"
							button-class="btn btn-danger"
							:custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a 😺 GIF or GTFO'
                            }"
							@change="onChange"/>
						<div class="form-group mt-2">
							<input v-model="title" type="text" placeholder="Title" class="form-control">
						</div>
						<div class="formgroup">
							<select v-model="cat" name="cat" id="cat">
								<option selected value="">Select a Category</option>
								<option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.name}}</option>
							</select>
						</div>
						<wysiwyg class="mt-3" v-model="content"></wysiwyg>
						<div class="form-group">
							<button @click="createArticle()" :disabled="loading" class="btn btn-lg btn-success mt-3 form-control">
								<i v-if="loading" class="fas fa-spin fa-spinner"></i>
								{{loading ? '' : 'Submit'}}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import VP from 'vue-picture-input';
	import Axios from 'axios';
	import config from '@/config';

	export default {
		name: 'CreateArticle',
		components: {
			VP,
		},
		mounted() {
			this.$root.location = 'create';
			this.getCategories();
		},
		data() {
			return {
				title: '',
				content: '',
				image: null,
				imgUrl: '',
				cat: '',
				loading: false,
				categories: [],
			};
		},
		beforeRouteEnter(to, from, next) {
			if (!localStorage.getItem('auth')) {
				return next({path: '/login'});
			}
			next();
		},
		computed: {},
		methods: {
			onChange(image) {
				// console.log('New picture selected!');
				if (image) {
					// console.log('Picture loaded.');
					this.image = image
				} else {
					this.$noty.error('Images are only accepted from the form.', {timeout: 2500});
				}
			},
			createArticle() {
				if (!this.title || !this.content || !this.image || !this.cat) {
					this.$noty.warning('Duh! You have to fill it up.', {timeout: 1500});
					return;
				}
				this.loading = true;
				const form = new FormData();
				form.append('file', this.image);
				form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET);
				form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);

				Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
					.then(response => {
						// console.log(response);
						if (response.status === 200) {
							// console.log(response.data);
							this.imgUrl = response.data.url;
							if (this.title.length >= 1 && this.content.length >= 2) {
								this.$noty.warning('About to send', {timeout: 1500});
								Axios.post(`${config.apiUrl}articles`, {
									title: this.title,
									content: this.content,
									category_id: this.cat,
									imageUrl: this.imgUrl,
								}, {
									headers: {
										Authorization: `Bearer ${this.$root.auth.token}`,
									}
								})
									.then(() => {
										this.loading = false;
										this.$noty.success('Article created successfully!', {timeout: 2500});
										this.$router.push('/');
									})
									.catch(() => {
										this.$noty.error('Oops! Something went wrong!', {timeout: 2500});
										this.loading = false;
									});
							} else {
								this.$noty.warning('Please fill in valid contents, then try again.', {timeout: 2500});
								this.loading = false;
							}
						} else {
							this.$noty.error('Oops! Something went wrong!', {timeout: 2500});
							this.loading = false;
						}
					})
					.catch(({response}) => {
						this.loading = false;
						let error = {response};
						if (error.status === 400) {
							this.$noty.error('Please upload a valid image.', {timeout: 2500});
						}
					});
			},
			getCategories() {
				const categories = localStorage.getItem('cat');
				if (categories) {
					this.categories = JSON.parse(categories);
					return;
				}
				Axios.get(`${config.apiUrl}categories`)
					.then(res => {
						localStorage.setItem('cat', JSON.stringify(res.data.categories));
						this.categories = res.data.categories;
					})
					.catch(({response}) => {
						console.log(response);
					})
			}
		}
	}
</script>
