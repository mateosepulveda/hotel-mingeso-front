<template>
	<div class="container-fluid">
		<b-row>
			<b-col>
			<b-card
				header="Create New User"
				header-tag="header"
			>
				<b-form @submit="validate" @reset="reset" v-if="show">
					<b-form-group
						id="input-group-1"
						label="Username:"
						label-for="input-1"
					>
					<b-form-input
						id="input-1"
						v-model="form.username"
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
						v-model="form.mail"
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

					<b-form-group>
					<b-form-checkbox v-model="form.admin" name="check-button" switch>
						Admin
					</b-form-checkbox>
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
	import {rest_ip} from "../router";
	import axios from 'axios'
	export default {
		data() {
			return {
				fields: ['username', 'mail'],
				users: [],
				vpassword: '',
				form: {
					username: '',
					mail: '',
					password: '',
					admin: false
				},
				show: true
			}
		},
		mounted () {
			axios.get(rest_ip + 'users/').then(response => {
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
					alert('User created')
					return axios.post(rest_ip + 'users/', this.form).then(reset())
				}
				else {
					alert('not valid')
				}
			},
			reset(evt) {
				evt.preventDefault()
				this.form.username = ''
				this.form.mail = ''
				this.form.password = ''
				this.form.admin = false
				this.show = false
				this.$nextTick(() => {
				this.show = true
				})
			}
		}
	}
</script>

<style scoped>
</style>