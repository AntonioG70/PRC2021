<template>
  <div class="w3-container">
    <h3 class="w3-header w3-teal">Publicações com participação de {{idr}}</h3>
    <table class="w3-table-all">
        <tr v-for="(pub,i) in dados" v-bind:key="i" id="pub.p">
            <th>{{pub.p}}</th>
        </tr>
    </table>
  </div> 
</template>
<script>
import axios from 'axios';

  export default {
    name: 'AuthPubs',

    props: ["idr"],

    data() {
      return {
            dados: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/api/authors/' + this.idr)
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