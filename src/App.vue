<template>
	<div id="app">
		<div id="nav">
			<b-navbar toggleable="sm" type="light" variant="light">
				<b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
				<b-navbar-brand to="/">Hotel App</b-navbar-brand>
				<b-collapse id="nav-text-collapse" is-nav>
					<b-navbar-nav>
						<b-nav-item to="/rack">Rack</b-nav-item>
						<b-nav-item to="/users/manage">Manage Users</b-nav-item>
						<b-nav-item to="/rooms/manage">Manage Rooms</b-nav-item>
					</b-navbar-nav>
					<b-navbar-nav class="ml-auto">
						<b-nav-item to="/login">Login</b-nav-item>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
		</div>
		<br><router-view/>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: ''
				},
				logged: true
			}
		}
	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
