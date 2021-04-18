<template>
  <div class="w3-container">
    <h3 class="w3-header w3-teal">Publicação {{idr}}</h3>
    <table class="w3-table-all">
        <tr>
            <th v-for="(pub,i) in dados" v-bind:key="i" id="pub.p">{{pub.p}}</th>
        </tr>
        <tr>
            <td v-for="pub in dados" v-bind:key="pub.o">{{pub.o}}</td>
        </tr>
    </table>
  </div> 
</template>
<script>
import axios from 'axios';

  export default {
    name: 'Pub',

    props: ["idr"],

    data() {
      return {
            dados: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/api/pubs/' + this.idr)
        .then(res => {
          this.dados = res.data;
        })
    }
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>