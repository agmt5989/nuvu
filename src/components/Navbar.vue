<template>
    <nav id="header" class="navbar navbar-expand-lg navbar-light bg-light container">
							<router-link to="/" class="navbar-brand"><img src="../assets/logo.png" width="30px" height="30px" alt=""></router-link>
							<button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" class="navbar-toggler">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar navbar-toggler-icon"></span>
							</button>
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="nav navbar-nav navbar-left mr-auto">
									<li class="nav-item">
										<router-link class="nav-link" :class="{'active' : currentLocation === 'home'}" to="/">Home<span v-if="currentLocation === 'home'" class="sr-only"> (current)</span></router-link>
									</li>
									<li class="nav-item" v-if="authUser">
										<router-link class="nav-link" :class="{'active' : currentLocation === 'create'}" to="/articles/create">Create Article<span v-if="currentLocation === 'create'" class="sr-only"> (current)</span></router-link>
									</li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<form action="/" class="form-inline my-2 my-lg-0">
                                <input type="search" aria-label="Search" placeholder="Search" class="form-control mr-sm-2">
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                                    <li class="nav-item" v-if="!authUser">
                                        <router-link to="/login" :class="{'active' : currentLocation === 'login'}" class="nav-link">Login<span v-if="currentLocation === 'login'" class="sr-only"> (current)</span></router-link>
                                    </li>
                                    <li class="nav-item" v-if="!authUser">
                                        <router-link to="/register" :class="{'active' : currentLocation === 'register'}" class="nav-link">Register<span v-if="currentLocation === 'register'" class="sr-only"> (current)</span></router-link>
                                    </li>
									<li class="nav-item dropdown" v-if="authUser">
										<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Hey {{authUser.name}}</a>
                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a href="#" @click="logout()" class="dropdown-item">Logout</a>
                                        </div>
									</li>
							</ul>
						</div>
		</nav>
</template>

<script>
export default {
    computed: {
        authUser() {
            return this.$root.auth.user;
        },
		currentLocation() {
			return this.$root.location;
		}
	},
	data() {
		return {}
	},
	methods: {
		logout() {
			localStorage.removeItem('auth');
			this.$root.auth = {};
			this.$noty.success('Successfully logged out!');
		}
	}
}
</script>
