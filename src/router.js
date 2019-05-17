import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Home from './views/Home.vue';
import Article from './views/Article.vue';
import CreateArticle from './views/CreateArticle.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article,
    },
    {
      path: '/articles/create',
      name: 'createArticle',
      component: CreateArticle,
    },
  ]
});

export default router;
