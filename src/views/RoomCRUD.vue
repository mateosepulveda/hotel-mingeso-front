<template>
  <div>
    
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-12">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Rooms</h3>
                </div>
                <div class="col-4 text-right">
                  <router-link :to="{name: 'create-room'}"> <b-button> Create room <i class="ni ni-fat-add"></i></b-button> </router-link>
                </div>
              </div>
            </div>
            <div>
              <b-table
                      show-empty
                      striped hover
                      :items="room"
                      :fields="fields"
              >
                <template slot="actions" slot-scope="row">
                  <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1" variant="primary">
                    Detalle
                  </b-button>
                  <b-button size="sm" @click="showMsgBoxOne(row.item)" class="mr-1" variant="danger">
                    Borrar
                  </b-button>

                </template>
              </b-table>

            </div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {rest_ip} from "../router";
   
    export default {
        name: 'RoomCrud',
        data() {
            return {
                fields: [
                    {label: 'Number', key: 'number'},
                    {label: 'Floor', key:'floor'},
                    {label:'Description',key:'description'}
                    ,{label:'Price',key:'price'}
                    ,{label: 'Ocuppied', key:'ocuppied'}
                    ,{label:'Acciones',key:'actions'}
                    ],
                room: []
                
            }
        },
        created(){
          this.retrieveRooms();
          
        },
        methods:{
           info(){
           
            },
            showMsgBoxOne() {
                this.$bvModal.msgBoxConfirm('¿Está seguro que desea eliminar?')
            },
           
         mounted(){
        this.retrieveData()
    },
retrieveRooms(){
              this.axios.get(rest_ip+'rooms/')
              .then((rooms) => this.volunteersTask(rooms.data))
              .catch((e) => alert(e))
          },
          volunteersTask(rooms){
            let i = 0;
            while (i < rooms.length){
                
                this.room.push({
                    id: rooms[i].id,
                    number: rooms[i].number,
                    floor: rooms[i].floor,
                    description:rooms[i].description,
                    price:rooms[i].price,
                    ocuppied:"ocupado"
                });

                i+=1;
            }
        },  
            
            }
    };
</script>
<style></style>
