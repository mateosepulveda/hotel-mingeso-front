<template>
	<div class="container-fluid">
		<b-row>
			<b-col>
			<b-card
				header="Create New User"
				header-tag="header"
			>
				<b-form @submit="validate">
					<b-form-group
						id="input-group-1"
						label="Name:"
						label-for="input-1"
					>
					<b-form-input
						id="input-1"
						v-model="form.name"
						type="name"
						required
						placeholder="e.g. John Smith"
					>
					</b-form-input>
					</b-form-group>

					<b-form-group
						id="input-group-2"
						label="Email address:"
						label-for="input-2"
					>
					<b-form-input
						id="input-2"
						v-model="form.email"
						type="email"
						required
						placeholder="e. g. johnsmith@example.com"
					>
					</b-form-input>
					</b-form-group>

					<b-form-group
						id="input-group-3"
						label="Password:"
						label-for="input-3"
					>
					<b-form-input
						id="input-3"
						v-model="form.password"
						type="password"
						required
						placeholder="Enter password"
					>
					</b-form-input>
					</b-form-group>

					<b-form-group
						id="input-group-4"
						label="Verify password:"
						label-for="input-4"
					>
					<b-form-input
						id="input-4"
						v-model="vpassword"
						type="password"
						required
						placeholder="Verify password"
					>
					</b-form-input>
					</b-form-group>
					<b-button type="submit" variant="primary">Add User</b-button>
				</b-form>
			</b-card>
			</b-col>

			<b-col>
			<b-card
				header="User List"
				header-tag="header"
			>
			<b-table striped borderless :items="users" :fields="fields">
			</b-table>
			</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import http from "../../http-common";
	export default {
		data() {
			return {
				fields: ['username', 'email'],
				users: [],
				vpassword: '',
				form: {
					username: '',
					password: '',
					admin: false
				}
			}
		},
		mounted () {
			http.get("/users").then(response => {
			this.users = response.data;
			console.log(response.data);
			})
			.catch(e => {
			console.log(e);
			});
		},
		methods: {
			validate(evt) {
				evt.preventDefault()
				if (this.form.password == this.vpassword) {
					alert(JSON.stringify(this.users))
				}
				else {
					alert('not valid')
				}
			},
		}
	}
</script>

<style scoped>
</style>