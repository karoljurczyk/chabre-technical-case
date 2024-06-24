<script setup lang="ts">
import Travel from '~/models/travel';

const travel = new Travel();
</script>

<template>
  <MoleculesFormTravel :travel="travel" />
</template>
