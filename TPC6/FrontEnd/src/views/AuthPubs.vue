<template>
  <ConsultaAuthPubs :idr="$route.params.idAut"/>
</template>

<script>
import ConsultaAuthPubs from "@/components/ConsultaAuthPubs.vue";

export default {
  components: {
    ConsultaAuthPubs
  }
};
</script>
