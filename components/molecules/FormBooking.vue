<script setup lang="ts">
import type { PropType } from "vue";
import Booking, { schema } from "~/models/booking";
import type Travel from "~/models/travel";

const { booking } = defineProps({ booking: { type: Object as PropType<Booking>, required: true } });

const userGenders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const paymentTypes = [
  { label: "Credit Card", value: "credit" },
  { label: "PayPal", value: "paypal" },
  { label: "Revolut", value: "revolut" },
];

const state = reactive({
  id: booking?.id,
  travelId: booking?.travelId,
  travelName: booking?.travelName,
  userName: booking?.userName,
  userEmail: booking?.userEmail,
  userPhone: booking?.userPhone,
  userAge: booking?.userAge,
  userGender: booking?.userGender,
  paymentType: booking?.paymentType,
  internalNotes: booking?.internalNotes,
});

const step = ref(0);

const { data: travels } = await useFetch<Travel[]>("/api/travels", { lazy: true, server: false });

async function onSubmit() {
  if (step.value < 2) {
    step.value = step.value + 1;
  } else {
    try {
      await $fetch("/api/booking", {
        method: "post",
        body: {
          travel: new Booking({ ...state }),
        },
      });

      await navigateTo("/bookings");
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<template>
  <UForm :schema="schema[step]" :state="state" class="space-y-4" @submit="onSubmit">
    <template v-if="step === 0">
      <UFormGroup name="travelId" label="Travel">
        <USelectMenu
          v-model="state.travelId"
          class="w-full"
          :options="travels ?? []"
          option-attribute="name"
          value-attribute="id"
          searchable
          searchable-placeholder="Search ..."
          :search-attributes="['name']"
        />
      </UFormGroup>
    </template>

    <template v-if="step === 1">
      <UFormGroup name="userName" label="User Name">
        <UInput v-model="state.userName" type="text" />
      </UFormGroup>

      <UFormGroup name="userEmail" label="User Email">
        <UInput v-model="state.userEmail" type="email" />
      </UFormGroup>

      <UFormGroup name="userPhone" label="User Phone">
        <UInput v-model="state.userPhone" type="tel" />
      </UFormGroup>

      <UFormGroup name="userAge" label="User Age">
        <UInput v-model="state.userAge" type="number" />
      </UFormGroup>

      <UFormGroup name="userGender" label="User Gender">
        <URadioGroup v-model="state.userGender" :options="userGenders" />
      </UFormGroup>
    </template>

    <template v-if="step === 2">
      <UFormGroup name="paymentType" label="Payment Type">
        <URadioGroup v-model="state.paymentType" :options="paymentTypes" />
      </UFormGroup>

      <UFormGroup name="internalNotes" label="Internal Notes">
        <UTextarea v-model="state.internalNotes" />
      </UFormGroup>
    </template>

    <div class="flex gap-2">
      <UButton type="submit"> {{ step < 2 ? "Next Step" : "Submit" }} </UButton>
      <UButton color="white" to="/bookings" type="button"> Cancel </UButton>
    </div>
  </UForm>
</template>
