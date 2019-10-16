<template>
	<div class="container-fluid">
		<b-row>
			<b-col></b-col>
			<b-col>
			<b-card
				header="Create New Booking"
				header-tag="header"
			>
				<b-form @submit="submitBooking">
					<b-form-group
						id="input-group-1"
						label="Owner name:"
						label-for="input-1"
					>
					<b-form-input
						id="input-1"
						v-model="form.owner"
						type="name"
						required
						placeholder="e.g. John Smith"
					>
					</b-form-input>
					</b-form-group>

					<hr>

					<b-form-group
						id="input-group-2"
						label="Select the start date:"
						label-for="input-2"
					>
					<b-form-input
						id="input-2"
						v-model="form.startDate"
						type="date"
						format="dateFormat"
						@change="startDateChange"
					>
					</b-form-input>
					</b-form-group>

					<b-form-group
						id="input-group-3"
						label="Select the end date:"
						label-for="input-3"
					>
					<b-form-input
						id="input-3"
						v-model="form.endDate"
						type="date"
						format="dateFormat"
						@change="endDateChange"
					>
					</b-form-input>
					</b-form-group>

					<b-form-group
						id="input-group-4"
						label="Room:"
						label-for="input-4"
					>
					<b-form-select v-model="selectedRoom" id="roomDropdown" text="Select a room" :options="availableRoomNumbersList">
					</b-form-select>
					</b-form-group>

					<b-form @submit="submitRoomForBooking">
						<b-form-group>
						<b-button type="submit" variant="primary">Add room to booking</b-button>
						</b-form-group>
					</b-form>

					<b-table striped hover :items="form.bookingsListFormDisplay" :bordered="true" :responsive="true"></b-table>

					<hr>

					<b-form-group>
					<b-button type="submit" variant="primary">Add booking</b-button>
					</b-form-group>
				</b-form>
				<b-button type="submit" @click="reset" variant="primary">Reset fields</b-button>
			</b-card>
			</b-col>
			<b-col></b-col>
		</b-row>
	</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import {rest_ip} from "../router";
	export default {
		data() {
			return {
				form: {
					owner: '',
					startDate: '',
					endDate: '',
					bookingsListForm: [], // LIST OF ROOMS BOOKED IN THIS FORM
					bookingsListFormDisplay: [], // LIST OF ROOMS BOOKED IN THIS FORM IN DISPLAY FORMAT
				},
				availableRoomNumbersList: [],	// LIST OF ROOMS AVAILABLE IN A DATE RANGE
				selectedRoom: '',
				roomsList: [], // LIST OF ALL ROOMS
				roomNumbersList: [], // LIST OF ALL ROOM NUMBERS
				bookingsList: [], // LIST OF ALL BOOKINGS
				dateFormat: 'DD/MM/YYYY'
			}
		},

		methods: {
			async getBookingData() {

	            // LOAD ALL ROOMS ON ROOMSLIST

	            try {
	                await this.getRoomsList()
	            } catch(error) {
	                console.log(error)
	            }

	            // LOAD ALL BOOKINGS

	            axios.get(rest_ip + 'bookings/getAll').then(response => {
	                this.bookingsList = response.data
	                this.bookingsList.sort(this.compareBookings)
	            })

			},

		    compareBookings(a, b) {
		        if ((parseInt(a.room.number) == null) || (parseInt(b.room.number) == null)) {
		            return 1
		        }

		        if (parseInt(a.room.number) < parseInt(b.room.number)) {
		            return -1
		        } else if (parseInt(a.room.number) > parseInt(b.room.number)) {
		            return 1
		        }
		        return 0
		    },

		    compareRooms(a, b) {
		        if ((parseInt(a.number) == null) || (parseInt(b.number) == null)) {
		            return 1
		        }

		        if (parseInt(a.number) < parseInt(b.number)) {
		            return -1
		        } else if (parseInt(a.number) > parseInt(b.number)) {
		            return 1
		        }
		        return 0
		    },

		    startDateChange(evt) {
		    	if ((this.form.startDate != '') && (this.form.endDate != '')) {
		    		this.availableRoomNumbersList = this.roomNumbersList.slice()

		    		for (var booking of this.bookingsList) {
		    			if (moment(booking.startDate, 'DD-MM-YYYY').isBetween(this.form.startDate, this.form.endDate) || (moment(booking.endDate, 'DD-MM-YYYY').isBetween(this.form.startDate, this.form.endDate))) {
		    				
		    				var i = 0
		    				for (var room of this.availableRoomNumbersList) {
		    					if (room.value == booking.room.number.toString()) {
		    						this.availableRoomNumbersList.splice(i,1)
		    						break
		    					}
		    					i++
		    				}
		    			}
		    		}
		    	}
		    },

		    endDateChange(evt) {
		    	if ((this.form.startDate != '') && (this.form.endDate != '')) {
		    		this.availableRoomNumbersList = this.roomNumbersList.slice()
		    		console.log(this.roomNumbersList)

		    		for (var booking of this.bookingsList) {
		    			if (moment(booking.startDate, 'DD-MM-YYYY').isBetween(this.form.startDate, this.form.endDate) || (moment(booking.endDate, 'DD-MM-YYYY').isBetween(this.form.startDate, this.form.endDate))) {
		    				
		    				var i = 0
		    				for (var room of this.availableRoomNumbersList) {
		    					if (room.value == booking.room.number.toString()) {
		    						this.availableRoomNumbersList.splice(i,1)
		    						break
		    					}
		    					i++
		    				}
		    			}
		    		}
		    	}
		    },

			getRoomsList() {
	            return axios.get(rest_ip + 'rooms/').then(response => {
	                this.roomsList = response.data
		            this.roomsList.sort(this.compareRooms)
	                for (var room of this.roomsList) {
	                	var roomSelectObject = {value: room.number.toString(), text: room.number.toString()}
	                	this.roomNumbersList.push(roomSelectObject)
	                }
	            })
			},

			submitBooking(evt) {
				evt.preventDefault()
				if (this.form.bookingsListForm.length > 0) {
					alert("The booking has been created.")
            		return axios.post(rest_ip + 'bookings/create', this.form.bookingsListForm)
				} else {
					alert("No rooms have been booked.")
				}

				this.form.owner = ''
				this.form.startDate = ''
				this.form.endDate = ''
				this.bookingsListForm = []
				this.bookingsListFormDisplay = []
				this.availableRoomNumbersList = []
				this.selectedRoom = ''
			},

			submitRoomForBooking(evt) {
				evt.preventDefault()

				var roomObject = {}

				for (var room of this.roomsList) {
					if (room.number.toString() == this.selectedRoom) {
						roomObject = room
						break
					}
	            }

	            var startDateFormatted = this.form.startDate.substring(8,10) + '/' + this.form.startDate.substring(5,7) + '/' + this.form.startDate.substring(0,4)
	            var endDateFormatted = this.form.endDate.substring(8,10) + '/' + this.form.endDate.substring(5,7) + '/' + this.form.endDate.substring(0,4)

				this.form.bookingsListForm.push({
					'owner': this.form.owner,
					'startDate': startDateFormatted,
					'endDate': endDateFormatted,
					'room': roomObject
				})

				this.form.bookingsListFormDisplay.push({
					startDate: startDateFormatted,
					endDate: endDateFormatted,
					room: roomObject.number,
				})

				this.form.startDate = ''
				this.form.endDate = ''

				this.selectedRoom = ''

				this.availableRoomNumbersList = []

				alert("Room added to booking.")
			},

			reset() {
				this.form.owner = ''
				this.form.startDate = ''
				this.form.endDate = ''
				this.bookingsListForm = []
				this.bookingsListFormDisplay = []
				this.availableRoomNumbersList = []
				this.selectedRoom = ''
			}
		},

	    created() {
	        this.getBookingData()
	    },
	}
</script>

<style scoped>
</style>