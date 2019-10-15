<template>
	<div class="container-fluid">
		<b-table striped hover :items="bookingsList" :fields="fields" :bordered="true" :responsive="true"></b-table>
	</div>
</template>

<script>
import axios from 'axios'
import {rest_ip} from "../router";
	export default {
		data() {
			return {
				bookingsList: [],
				fields: [
				{key: 'ID', sortable: true},
				{key: 'Owner', sortable: true},
				{key: 'Start Date', sortable: false},
				{key: 'End Date', sortable: false},
				{key: 'Room', sortable: true},
				]
			}
		},

		methods: {
			getBookingData() {
				axios.get(rest_ip + 'bookings/getAll').then(response => {
	                var bookingsListFull = response.data
	                for (var booking of bookingsListFull) {
	                	var objectBooking = new Object()
	                	objectBooking['ID'] = booking.id
	                	objectBooking['Owner'] = booking.owner
	                	objectBooking['Start Date'] = booking.startDate
	                	objectBooking['End Date'] = booking.endDate
	                	objectBooking['Room'] = booking.room.number
	                	this.bookingsList.push(objectBooking)
	                }
	            })

			},
		},

	    created() {
	        this.getBookingData()
	    },
	}
</script>

<style scoped>
</style>