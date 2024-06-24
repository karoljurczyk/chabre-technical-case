<script setup lang="ts">
import type Booking from "~/models/booking";

const { id } = useRoute().params;

const { data: booking, status } = await useFetch<Booking>(`/api/booking?id=${id}`, { lazy: true, server: false });
</script>

<template>
  <div v-if="status !== 'success'">
    Loading ...
  </div>
  <div v-else>
    <MoleculesFormBooking :booking="booking" />
  </div>
</template>
