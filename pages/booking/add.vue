<script setup lang="ts">
import Booking from '~/models/booking';

const booking = new Booking();
</script>

<template>
  <MoleculesFormBooking :booking="booking" />
</template>
