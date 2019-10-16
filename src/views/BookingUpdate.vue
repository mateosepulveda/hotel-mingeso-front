<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="7">
        <b-card>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Owner</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Room</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(booking, ID) in bookingsList" :key="ID">
                <td>{{ booking['ID'] }}</td>
                <td>{{ booking['Owner'] }}</td>
                <td>{{ booking['Start Date']}}</td>
                <td>{{ booking['End Date']}}</td>
                <td>{{ booking['Room']}}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button type="button" v-on:click="updateBookingActivate(booking.FullID)" class="btn btn-primary btn-sm">Update</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card>
      </b-col>
      <b-col>
      <b-card
        header="Update Booking"
        header-tag="header"
      >
      ID: {{ bookingUpdating['ID'] }}
      <br>
        <b-form @submit="saveUpdateBooking">
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

          <b-form-group>
          <b-button type="submit" variant="primary">Save update</b-button>
          </b-form-group>
        </b-form>
        <b-button type="submit" @click="cancel" variant="primary">Cancel</b-button>
      </b-card>
      </b-col>
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
        },
        availableRoomNumbersList: [], // LIST OF ROOMS AVAILABLE IN A DATE RANGE
        selectedRoom: '',
        roomsList: [], // LIST OF ALL ROOMS
        roomNumbersList: [], // LIST OF ALL ROOM NUMBERS
        bookingsList: [], // LIST OF ALL BOOKINGS
        bookingsListActive: [], // LIST OF ACTIVE BOOKINGS (BOOKING BEING UPDATED IS NOT PRESENT)
        bookingUpdating: {ID: '---'},
        dateFormat: 'DD/MM/YYYY'
      }
    },

    methods: {
      async getBookingDataTable() {
        // LOAD ALL ROOMS ON ROOMSLIST
        try {
            await this.getRoomsList()
        } catch(error) {
            console.log(error)
        }

        // LOAD BOOKING DATA ON TABLE
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
                    objectBooking['FullID'] = booking.id
                    this.bookingsList.push(objectBooking)
                  }
              })

      },

      updateBookingActivate(fullID) {
        var i = 0
        var selectedRoomTemp = ''
        for (var booking of this.bookingsList) {
          if (fullID == booking['FullID']) {
            this.bookingUpdating = booking
            this.form.owner = booking['Owner']

            var startDateFormatted = booking['Start Date'].substring(6,10) + '-' + booking['Start Date'].substring(3,5) + '-' + booking['Start Date'].substring(0,2)
            var endDateFormatted = booking['End Date'].substring(6,10) + '-' + booking['End Date'].substring(3,5) + '-' + booking['End Date'].substring(0,2)

            this.form.startDate = startDateFormatted
            this.form.endDate = endDateFormatted

            selectedRoomTemp = booking['Room']

            this.bookingsListActive = this.bookingsList.slice()

            this.bookingsListActive.splice(i,1)

            break
          }
          i++
        }

        this.availableRoomNumbersList = this.roomNumbersList.slice()

        for (var booking of this.bookingsListActive) {
          if (moment(booking['Start Date'], 'DD-MM-YYYY').isBetween(this.form.startDate, this.form.endDate) || (moment(booking['End Date'], 'DD-MM-YYYY').isBetween(this.form.startDate, this.form.endDate))) {

            var i = 0
            for (var room of this.availableRoomNumbersList) {
              if (room.value.toString() == booking.room.number.toString()) {
                this.availableRoomNumbersList.splice(i,1)
                break
              }
              i++
            }
          }
        }

        this.selectedRoom = selectedRoomTemp
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

          for (var booking of this.bookingsListActive) {
            if (moment(booking['Start Date'], 'DD-MM-YYYY').isBetween(this.form.startDate, this.form.endDate) || (moment(booking['End Date'], 'DD-MM-YYYY').isBetween(this.form.startDate, this.form.endDate))) {
              
              var i = 0
              for (var room of this.availableRoomNumbersList) {
                if (room.value.toString() == booking['Room'].toString()) {
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

          for (var booking of this.bookingsListActive) {
            booking.startDate
            this.form.startDate
            if (moment(booking['Start Date'], 'DD-MM-YYYY').isBetween(this.form.startDate, this.form.endDate) || (moment(booking['End Date'], 'DD-MM-YYYY').isBetween(this.form.startDate, this.form.endDate))) {

              var i = 0
              for (var room of this.availableRoomNumbersList) {
                if (room.value.toString() == booking['Room'].toString()) {
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

      saveUpdateBooking(evt) {
        if (this.bookingUpdating['ID'] == '---') {
          alert("No booking is selected.")
          return
        }

        evt.preventDefault()

        var bookingUpdated = this.bookingUpdating

        var startDateFormatted = this.form.startDate.substring(8,10) + '/' + this.form.startDate.substring(5,7) + '/' + this.form.startDate.substring(0,4)
        var endDateFormatted = this.form.endDate.substring(8,10) + '/' + this.form.endDate.substring(5,7) + '/' + this.form.endDate.substring(0,4)

        var roomUpdated = ''

        if (this.selectedRoom != '') {
          for (var room of this.roomsList) {
            if (room.number.toString() == this.selectedRoom) {
              roomUpdated = room
              break
            }
          }
        }

        bookingUpdated = {id: this.bookingUpdating['FullID'], owner: this.form.owner, startDate: startDateFormatted, endDate: endDateFormatted, room: roomUpdated}

        axios.put(rest_ip + 'bookings/update/' + bookingUpdated.id, bookingUpdated)

        alert("The booking has been updated.")

        this.form.owner = ''
        this.form.startDate = ''
        this.form.endDate = ''
        this.selectedRoom = ''
        this.availableRoomNumbersList = []
        this.bookingsListActive = []
        this.bookingUpdating = {ID: '---'}
        this.bookingsList = []
        this.roomNumbersList = []
        this.roomsList = []

        this.getBookingDataTable()
      },

      cancel() {
        this.form.owner = ''
        this.form.startDate = ''
        this.form.endDate = ''
        this.selectedRoom = ''
        this.availableRoomNumbersList = []
        this.bookingsListActive = []
        this.bookingUpdating = {ID: '---'}
        this.bookingsList = []
        this.roomNumbersList = []
        this.roomsList = []

        this.getBookingDataTable()
      }
    },

      created() {
          this.getBookingDataTable()
      },
  }
</script>

<style scoped>
</style>