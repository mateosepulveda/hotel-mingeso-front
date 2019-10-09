<template>
	<div class="container">
		<b-row>
			<b-col></b-col>
			<b-col>
			<b-card
				header="Login"
				header-tag="header"
			>
				<b-form @submit="onSubmit" v-if="show">
					<b-form-group
						id="input-group-1"
						label="Email address:"
						label-for="input-1"
					>
					<b-form-input
						id="input-1"
						v-model="form.email"
						type="email"
						required
						placeholder="Enter email"	
					>
					</b-form-input>
					</b-form-group>
					<b-form-group
						id="input-group-2"
						label="Password:"
						label-for="input-2"
					>
					<b-form-input
						id="input-2"
						type="password"
						required
						placeholder="Enter password"	
					>
					</b-form-input>
					</b-form-group>
					<b-button type="submit" variant="primary">Login</b-button>
				</b-form>
			</b-card>
			</b-col>
			<b-col></b-col>
		</b-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					email: '',
					password: ''
				},
				show: true
			}
		},
		methods: {
			onSubmit(evt) {
				evt.preventDefault()
				alert(JSON.stringify(this.form))
			},
		}
	}
</script>

<style scoped>
</style>