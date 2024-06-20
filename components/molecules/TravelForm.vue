<script setup lang="ts">
import Travel, { schema } from "~/models/travel";

const { travel } = defineProps({ travel: Travel });

const state = reactive({
  id: travel?.id,
  name: travel?.name,
  price: travel?.price,
  picture: travel?.picture,
  description: travel?.description,
  userRating: travel?.userRating,
  departureDate: travel?.departureDate ? travel.departureDate.toString().split("T")[0] : undefined,
  returnDate: travel?.returnDate ? travel.returnDate.toString().split("T")[0] : undefined,
});

async function onSubmit() {
  try {
    await $fetch("/api/travel", {
      method: "post",
      body: {
        travel: new Travel({
          ...state,
          departureDate: new Date(state.departureDate ?? ""),
          returnDate: new Date(state.returnDate ?? ""),
        }),
      },
    });

    await navigateTo('/travels');
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup name="name" label="Name">
      <UInput v-model="state.name" type="text" />
    </UFormGroup>

    <UFormGroup name="price" label="Price">
      <UInput v-model="state.price" type="number" />
    </UFormGroup>

    <UFormGroup name="picture" label="picture">
      <UInput v-model="state.picture" type="url" />
    </UFormGroup>

    <UFormGroup name="description" label="Description">
      <UTextarea v-model="state.description" />
    </UFormGroup>

    <UFormGroup name="userRating" label="User Rating">
      <UInput v-model="state.userRating" type="number" />
    </UFormGroup>

    <UFormGroup name="departureDate" label="Departure Date">
      <UInput v-model="state.departureDate" type="date" />
    </UFormGroup>

    <UFormGroup name="returnDate" label="Return Date">
      <UInput v-model="state.returnDate" type="date" />
    </UFormGroup>

    <div class="flex gap-2">
      <UButton type="submit"> Save </UButton>
      <UButton color="white" to="/travels" type="button"> Cancel </UButton>
    </div>
  </UForm>
</template>
