<template>
  <ConsultaEdPubs :idr="$route.params.idEd"/>
</template>

<script>
import ConsultaEdPubs from "@/components/ConsultaEdPubs.vue";

export default {
  components: {
    ConsultaEdPubs
  }
};
</script>
