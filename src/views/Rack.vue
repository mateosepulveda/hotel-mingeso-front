<template>
    <div class="container">
        <highcharts :constructor-type="'ganttChart'" :options="chartOptions"></highcharts>
    </div>
</template>

<script>
// NOTES: Maybe we could add a dropdown list of floors to select a single floor, and then redraw the Gantt chart with only the rooms of that floor.
import axios from 'axios'
import {rest_ip} from "../router";
export default {
    data() {
        return {
            chartOptions: {
                series: [{
                    name: '',
                    data: [],
                }],
                    /*
                    {name: 'Booked by John Smith; booking ID #306',
                    data: [{
                        start: Date.UTC(2019, 11, 1),
                        end: Date.UTC(2019, 11, 2),
                        name: '504',
                    }, {
                        start: Date.UTC(2019, 11, 2),
                        end: Date.UTC(2019, 11, 5),
                        name: '505'
                    }, {
                        start: Date.UTC(2019, 11, 8),
                        end: Date.UTC(2019, 11, 9),
                        name: '506'
                    }, {
                        start: Date.UTC(2019, 11, 9),
                        end: Date.UTC(2019, 11, 19),
                        name: '507'
                    }, {
                        start: Date.UTC(2019, 11, 10),
                        end: Date.UTC(2019, 11, 23),
                        name: '508'
                    }
                    */
                chart: {
                    renderTo: 'container',
                    height: 500,
                },
                navigator: {
                    enabled: true,
                    liveRedraw: true,
                    series: {
                        type: 'gantt',
                        pointPlacement: 0.5,
                        pointPadding: 0.25,
                    },
                    yAxis: {
                        min: 0,
                        max: 3,
                        reversed: true,
                        categories: []
                    },
                },
                rangeSelector: {
                    buttons: [{
                        type: 'day',
                        count: 7,
                        text: '1w',
                    }, {
                        type: 'month',
                        count: 1,
                        text: '1m',
                    }, {
                        type: 'month',
                        count: 3,
                        text: '3m',
                    }, {
                        type: 'month',
                        count: 6,
                        text: '6m',
                    }, {
                        type: 'year',
                        count: 1,
                        text: '1y',
                    }, {
                        type: 'all',
                        text: 'All',
                    }],
                    enabled: true,
                },
                scrollbar: {
                    enabled: true,
                },
                title: {
                    text: 'Bookings',
                },
                tooltip: {
                    enabled: true,
                    formatter: function () {
                        var text = '';
                        text = text.concat('<b>Room:</b> ' + this.point.name + '<br>');
                        text = text.concat('<b>Booked by:</b> ' + this.point.owner + '<br>');
                        text = text.concat('<b>Booking ID:</b> ' + this.point.bookingID.substring(this.point.bookingID.length - 5) + '<br>');
                        text = text.concat('<b>Start date:</b> ' + this.point.startStr + '<br>');
                        text = text.concat('<b>End date:</b> ' + this.point.endStr);
                        return text;
                    }
                },
                xAxis: {
                    currentDateIndicator: true,
                    title: 'Dates',
                    zoomEnabled: true,
                    tickInterval: 86400000,
                },
                yAxis: {
                    title: 'Rooms',
                    uniqueNames: true,
                    scrollbar: {
                        enabled: true,
                        showFull: false,
                    },
                    max: 2,
                },
            },
            bookingsList: [/*{
                id: 3,
                owner: 'Peter Smith',
                startDate: '05/11/2019',
                endDate: '15/11/2019',
                room: {number: '803'},
            }, {
                id: 1,
                owner: 'John Smith',
                startDate: '15/10/2019',
                endDate: '18/10/2019',
                room: {number: '401'},
            }, {
                id: 2,
                owner: 'Jack Smith',
                startDate: '21/10/2019',
                endDate: '24/10/2019',
                room: {number: '501'},
            }, {
                id: 4,
                owner: 'David Smith',
                startDate: '25/10/2019',
                endDate: '27/10/2019',
                room: {number: '401'},
            }, {
                id: 5,
                owner: 'Jeremy Smith',
                startDate: '28/10/2019',
                endDate: '02/11/2019',
                room: {number: '1101'},
            }*/],
            roomsList: [/*{
                id: 1,
                number: '401',
            }, {
                id: 2,
                number: '501',
            }, {
                id: 3,
                number: '803',
            }, {
                id: 4,
                number: '607',
            }, {
                id: 5,
                number: '1101',
            }*/],
        }
    },
    methods: {
        async loadChart() {

            // LOAD ALL ROOMS TO ROOMSLIST

            try {
                await this.getRoomsList()
            } catch(error) {
                console.log(error)
            }

            this.roomsList.sort(this.compareRooms)

            for (var room of this.roomsList) {
                this.chartOptions.series[0].data.push({
                        name: room.number.toString(),
                    })
            }

            // LOAD BOOKINGS FOR ROOMS TO BOOKINGSLIST (USE ASYNC())

            axios.get(rest_ip + 'bookings/getAll').then(response => {
                this.bookingsList = response.data

                console.log(this.bookingsList)

                for (var booking of this.bookingsList) {
                    var startDateUTC = this.dateStrToDateUTC(booking.startDate)
                    var endDateUTC = this.dateStrToDateUTC(booking.endDate)

                    this.chartOptions.series[0].data.push({
                            name: booking.room.number.toString(),
                            owner: booking.owner,
                            bookingID: booking.id,
                            start: startDateUTC,
                            end: endDateUTC,
                            startStr: booking.startDate,
                            endStr: booking.endDate,
                        })
                }

                this.chartOptions.rangeSelector.selected = 0
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

        dateStrToDateUTC(dateStr) {
            var dateArrayStr = dateStr.split("/")
            var dateDayInt = parseInt(dateArrayStr[0])
            var dateMonthInt = parseInt(dateArrayStr[1]) - 1
            var dateYearInt = parseInt(dateArrayStr[2])
            var dateUTC = Date.UTC(dateYearInt, dateMonthInt, dateDayInt)
            return dateUTC
        },

        getRoomsList() {
            return axios.get(rest_ip + 'rooms/').then(response => {
                this.roomsList = response.data
            })
        },
    },

    created() {
        this.loadChart()
    },
}
</script>