<script setup lang="ts">
import type Travel from "~/models/travel";

const { id } = useRoute().params;

const { data: travel, status } = await useFetch<Travel>(`/api/travel?id=${id}`, { lazy: true, server: false });
</script>

<template>
  <div v-if="status !== 'success'">
    Loading ...
  </div>
  <div v-else>
    <MoleculesFormTravel :travel="travel" />
  </div>
</template>
