<template>
  <div class="home container">
    <h3>Tareas</h3>
    <table class="table">
      <thead><tr><th>Id</th>
      <th>Titulo</th><th>Descripcion</th>
      <th></th>
    </tr>
    </thead>
      <tbody>
        <tr v-for="t in tareas" v-bind:key="t.id" >
          <td>{{t.id}}</td>
          <td>
            <div v-if="updateClicked">
                <input class="form-control" type="text" v-model="t.titulo" />
            </div>
            <div v-else>
              {{t.titulo}}
            </div>
            </td>
          <td>
              <div v-if="updateClicked">
                  <input class="form-control" type="text" v-model="t.descripcion" />
              </div>
              <div v-else>
                {{t.descripcion}}      
              </div>
          </td>
          <td><input class="btn btn-info " type="button" v-on:click="borrar(t.id)" value="Borrar" /></td>
          <td>
              <div v-if="updateClicked">
                <input class="btn btn-info " type="button" v-on:click="actualizar(t,'guardar')" value="guardar" />
              </div>
              <div v-else>
                  <input class="btn btn-info " type="button" v-on:click="actualizar(t,'act')" value="Actualizar" />

              </div>
          </td>
        </tr>
      </tbody>
    </table>
    <crear-tarea></crear-tarea>
    <!-- <actualizar-tarea></actializar-tarea> -->
     
  </div>
</template>

<script>
    // @ is an alias to /src
    import {
        mapGetters,
        mapActions
    } from "vuex";
    import CrearTarea from "../components/CrearTarea";
    // import ActualizarTarea from "../components/ActualizarTarea";

    export default {
        name: "Tareas",
        components: {
            CrearTarea
        },
        data: function() {
            return {
                updateClicked: false // visible to template

            }

        },
        methods: {
            ...mapActions(["leerTareas"]),
            async borrar(id) {
                await this.borrarTarea(id);
                this.leerTareas();

            },
            ...mapActions(["borrarTarea"]),
            async actualizar(t, accion) {
                if (this.updateClicked == false) {
                    console.log('entre xd');
                    this.updateClicked = true;
                    return;
                }
                if (accion == 'guardar') {
                    console.log('entre guardar 1');
                    console.log(t);
                    await this.actualizarTarea({
                        id: t.id,
                        titulo: t.titulo,
                        descripcion: t.descripcion
                    });

                    this.leerTareas();

                    this.updateClicked = false;
                }

            },
            ...mapActions(["actualizarTarea"])

        },
        computed: {
            ...mapGetters(["tareas"])
        },
        created() {
            this.leerTareas();
        }
    };
</script>