<template>
	<div id="app">
		<Navbar></Navbar>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Navbar from '@/components/Navbar.vue';
	// import Login from '@/views/Login.vue';
	// import Register from '@/views/Register.vue';
	// import Article from '@/views/Article.vue';
	// import Create from '@/views/CreateArticle.vue';

	export default {
		name: 'app',
		components: {
			Navbar,
		}
	}
</script>

<style>
	* {
		font-family: 'Orotund', sans-serif;
		border-radius: 0px !important;
	}

	body {
		background-color: #f5f3ef;
	}
</style>
