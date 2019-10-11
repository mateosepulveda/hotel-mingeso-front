<template>
  <div class="container">
    <h1>Rack page</h1>
    <span class="table-wrapper">
	    <b-table striped hover :items="items" :bordered="true" :responsive="true"></b-table>
	</span>
  </div>
</template>

<script>
import moment from 'moment'
  export default {
    data() {
      return {
        items: [],
		startDate: '',
		endDate: '',
		// Muchos cuartos bajan la scrollbar horizontal -- arreglar
		rooms: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510],
		vouchers: [{number: 1, room: 502, startDate: '15-10-2019', endDate: '18-10-2019', owner: 'John Smith'}],
      }
    },
    methods: {
		getDates() {
            this.startDate = moment()
            console.log(this.startDate)
            this.endDate = moment(this.startDate).add(90, 'days')
            console.log(this.endDate)
        },
        populateTableRowsAndColumns() {
            //axios.get('http://localhost:8080/rooms/getAll').then(response => {
            //  this.rooms = response.data
            //  ...
            for (var room of this.rooms) {
            	var row = {'Cuarto': room}
            	var dateIter = this.startDate
            	var dateFormatted = ''
            	while (dateIter <= this.endDate) {
            		dateFormatted = moment(dateIter).format('DD-MM-YYYY')
            		row[dateFormatted] = ''
            		dateIter = moment(dateIter).add(1, 'days')
            	}
            	this.items.push(row)
           	}
        },
        populateTableCells() {
        	//axios.get('http://localhost:8080/vouchers/getAll').then(response => {
            //  this.vouchers = response.data
            //  ...
            for (var voucher of this.vouchers) {
        		var dateIter = moment(voucher.startDate, 'DD-MM-YYYY')
        		var dateFormatted = ''
        		var voucherEndDate = moment(voucher.endDate, 'DD-MM-YYYY')
        		var rowIndex = 0
            	for (var row of this.items) {
            		if (row.Cuarto == voucher.room) {
		            	while (dateIter <= voucherEndDate) {
		            		dateFormatted = moment(dateIter).format('DD-MM-YYYY')
            				row[dateFormatted] = 'Reservado por: ' + voucher.owner
		            		dateIter = moment(dateIter).add(1, 'days')
		            	}
		            	this.items[rowIndex] = row
            			break
            		}
            		rowIndex = rowIndex + 1
            	}
           	}
        },
    },
    created() {
        this.getDates()
        this.populateTableRowsAndColumns()
        this.populateTableCells()
    },
  }
</script>

<style>
.table-wrapper {
	white-space: nowrap;
	max-height: 450px;
	max-width: 1000px;
	overflow: auto;
	display: inline-block;
	font-size: small;
}
</style>