<script setup lang="ts">
import type Booking from "~/models/booking";
import type Travel from "~/models/travel";

const { id } = useRoute().params;

const { data: booking } = await useFetch<Booking>(`/api/booking?id=${id}`);
const { data: travels } = await useFetch<Travel[]>("/api/travels");
</script>

<template>
  <div v-if="!booking">Loading ...</div>
  <div v-else>
    <BookingForm :booking="booking" :travels="travels ?? []" />
  </div>
</template>
