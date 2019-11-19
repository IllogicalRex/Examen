<template>
<form class="form-inline">
<div class="form-group">
        <label>id:</label>&nbsp;
        <input class="form-control" disabled type="text" v-model="id" />
    <label>Titulo:</label>&nbsp;
   <input class="form-control" type="text" v-model="titulo" />
   <label>Descripcion:</label>&nbsp;
   <input class="form-control" type="text" v-model="descripcion" />
   &nbsp;<input class="btn btn-info " type="button" v-on:click="updateTarea" value="Actualizar" />
</div>
</form>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from "vuex";
    export default {
        name: "ActualizarTarea",
        data: function() {
            return {
                id: "",
                titulo: "",
                descripcion: ""
            };
        },
        methods: {
            async updateTarea() {
                await this.actualizarTarea({
                    id: this.id,
                    descripcion: this.descripcion,
                    titulo: this.titulo
                });
            },

            ...mapActions(["actualizarTarea"])
        }
    };
</script>