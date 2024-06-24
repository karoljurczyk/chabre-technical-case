<script setup lang="ts">
import Booking from "~/models/booking";
import type Travel from "~/models/travel";

const booking = new Booking();
const { data: travels } = await useFetch<Travel[]>("/api/travels");
</script>

<template>
  <BookingForm :booking="booking" :travels="travels ?? []" />
</template>
