<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Owner</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Delete</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(booking, ID) in bookingsList" :key="ID">
              <td>{{ booking['ID'] }}</td>
              <td>{{ booking['Owner'] }}</td>
              <td>{{ booking['Start Date']}}</td>
              <td>{{ booking['End Date']}}</td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" v-on:click="deleteBooking(booking.ID)" class="btn btn-danger btn-sm">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {rest_ip} from "../router";
	export default {
		data() {
			return {
				bookingsList: [],
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
	                	objectBooking['Delete'] = ''
	                	this.bookingsList.push(objectBooking)
	                }
	            })

			},

			async deleteBooking(id) {
        try {
            await this.deleteById()
        } catch(error) {
            console.log(error)
        }

				this.getBookingData()
			},

      deleteById() {
        axios.post(rest_ip + 'bookings/DeleteById/' + id)
      },
		},

	    created() {
	        this.getBookingData()
	    },
	}
</script>

<style scoped>
</style>