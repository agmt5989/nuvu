<template>
    <div class="row my-5">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-body">
                    <h3 class="my-4">Register</h3>
                    <div class="form-group">
                        <input v-model="name" type="text" placeholder="Name" class="form-control" :class="{'is-valid': !errors.name && this.submitted, 'is-invalid': errors.name && this.submitted}">
                        <div class="errors" v-if="errors.name">
                            <small class="text-danger" :key="error" v-for="error in errors.name">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input v-model="email" type="email" placeholder="Email" class="form-control" :class="{'is-valid': !errors.email && this.submitted, 'is-invalid': errors.email && this.submitted}">
                        <div class="errors" v-if="errors.email">
                            <small class="text-danger" :key="error" v-for="error in errors.email">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input v-model="password" type="password" placeholder="Password" class="form-control" :class="{'is-valid': !errors.password && this.submitted, 'is-invalid': errors.password && this.submitted}" @keypress.enter="registerUser()">
                        <div class="errors" v-if="errors.password">
                            <small class="text-danger" :key="error" v-for="error in errors.password">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <button @click="registerUser()" class="btn btn-info form-control" :disabled="loading">
                            <i v-if="loading" class="fas fa-spin fa-spinner"></i>
                            {{loading ? '' : 'Register'}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import config from '@/config';

export default {
    beforeRouteEnter(to, from, next) {
        if(localStorage.getItem('auth')) {
            return next({path: '/'});
        }
        next();
    },
    mounted() {
        this.$root.location = 'register';
    },
    beforeMount() {
        // if(this.authUser) {
        //     this.$router.push('/');
        // }
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            errors: {},
            submitted: false,
            loading: false,
        }
    },
    computed: {
        authUser() {
            return this.$root.auth.user;
        },
    },
    methods: {
        registerUser() {
            this.loading = true;
            Axios.post(`${config.apiUrl}auth/register`, {
                name: this.name,
                email: this.email,
                password: this.password
            }).then(response => {
                this.loading = false;
                this.submitted = true;
                localStorage.setItem('auth', JSON.stringify(response.data.data));
                this.$root.auth = response.data.data;
                this.$noty.success('User successfully registered!');

                this.$router.push('/');
            }).catch(({response}) => {
                this.submitted = true;
                this.loading = false;
                this.errors = response.data;
                this.$noty.error('Oops! Something went wrong!');
                // console.log(this.errors.length);
            })
        }
    }
}
</script>
