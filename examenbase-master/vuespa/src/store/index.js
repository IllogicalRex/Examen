import Vue from 'vue'
import Vuex from 'vuex'

import Axios from 'axios';

Vue.use(Vuex)

const apiURLTareas = 'http://localhost:5000/api/Tareas/';


export default new Vuex.Store({
    state: {
        tareas: [],
        otracosa: []
    },
    getters: {
        tareas: state => state.tareas
    },
    mutations: {
        setTareas(state, data) {
            state.tareas = data;
        }
    },
    actions: {
        async leerTareas(context) {
            console.log("leyendo tareas");
            let tareasData = (await Axios.get(apiURLTareas)).data;
            console.log("se leyeron tareas", tareasData);
            context.commit("setTareas", tareasData);
        },
        async agregarTarea(context, nuevaTarea) {
            let grabar = (await Axios.post(apiURLTareas, nuevaTarea));
            await context.dispatch('leerTareas');
            // this.leerTareas(context);
        },
        async borrarTarea(context, id) {
            if (id !== undefined) {
                let ruta = apiURLTareas + id;
                console.log(ruta);
                let borrar = (await Axios.delete(ruta));
                await context.dispatch('borrarTarea');
                // this.leerTareas(context);

            }
        },
        async actualizarTarea(context, tarea) {
            if (tarea.id !== undefined) {
                let update = {
                    Id: tarea.id,
                    Titulo: tarea.titulo,
                    Descripcion: tarea.descripcion
                }
                let ruta = apiURLTareas + tarea.id;
                console.log(ruta);
                let actualizar = (await Axios.put(ruta, update));
                await context.dispatch('actualizarTarea');
                // this.leerTareas(context);
                return;
            }
        }
    },
    modules: {}
})