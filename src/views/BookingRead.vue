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
	                	objectBooking['ID'] = booking.id.substring(booking.id.length - 5)
	                	objectBooking['Owner'] = booking.owner
	                	objectBooking['Start Date'] = booking.startDate
	                	objectBooking['End Date'] = booking.endDate
	                	if (booking.room != null) {
	                		objectBooking['Room'] = booking.room.number.toString()
	                	}
	                	this.bookingsList.push(objectBooking)
	                }
	                console.log(this.bookingsList)
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