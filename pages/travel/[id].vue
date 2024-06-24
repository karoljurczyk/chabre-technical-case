<script setup lang="ts">
import type Travel from "~/models/travel";

const { id } = useRoute().params;

const { data: travel } = await useFetch<Travel>(`/api/travel?id=${id}`);
</script>

<template>
  <div v-if="!travel">Loading ...</div>
  <div v-else>
    <TravelForm :travel="travel" />
  </div>
</template>
