<template>
    <div class="row my-5">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-body">
                    <h3 class="my-4">Login</h3>
                    <div class="form-group">
                        <input v-model="email" type="email" placeholder="Email" class="form-control" :class="{'is-valid': !errors.email && this.submitted, 'is-invalid': errors.email && this.submitted}">
                        <div class="errors" v-if="errors.email">
                            <small class="text-danger" :key="error" v-for="error in errors.email">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input v-model="password" type="password" placeholder="Password" class="form-control" :class="{'is-valid': !errors.password && this.submitted, 'is-invalid': errors.password && this.submitted}" @keypress.enter="logUserIn()">
                        <div class="errors" v-if="errors.password">
                            <small class="text-danger" :key="error" v-for="error in errors.password">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <button @click="logUserIn()" class="btn btn-info form-control">
                             <i v-if="loading" class="fas fa-spin fa-spinner"></i>
                             {{loading ? '' : 'Login'}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import config from '@/config'

export default {
    beforeRouteEnter(to, from, next) {
        if(localStorage.getItem('auth')) {
            return next({path: '/'});
        }
        next();
    },
    mounted() {
        this.$root.location = 'login';
    },
    beforeMount() {
        // if(this.authUser) {
        //     this.$router.push('/');
        // }
    },
    data() {
        return {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            errors: {},
            loadBlock: '<i class="fas fa-spin fa-spinner"></i>'
        }
    },
    computed: {
        authUser() {
            return this.$root.auth.user;
        },
    },
    methods: {
        logUserIn() {
            this.loading = true;
            Axios.post(`${config.apiUrl}auth/login`, {
                email: this.email,
                password: this.password,
            })
            .then(response => {
                this.loading = false;
                this.submitted = true;
                // console.log(response);
                localStorage.setItem('auth', JSON.stringify(response.data.data));
                this.$root.auth = response.data.data;
                this.$noty.success('User successfully logged in!');
                this.$router.push('/');
            })
            .catch(({response}) => {
                this.loading = false;
                this.submitted = true;
                if(response.status === 401) {
                    this.errors = {
                        email: ['These credentials do not match!'],
                    };
                } else {
                    this.errors = response.data;
                }
                this.$noty.error('Oops! Something went wrong!');
            });
        }
    }
}
</script>
