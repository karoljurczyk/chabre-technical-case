<script setup lang="ts">
import { UiConfirm } from "#components";
import type Booking from "~/models/booking";

const columns = [
  {
    key: "travelName",
    label: "Travel Name",
    sortable: true,
  },
  {
    key: "userName",
    label: "User Name",
    sortable: true,
  },
  {
    key: "userEmail",
    label: "User Email",
  },
  {
    key: "paymentType",
    label: "Payment Type",
  },
  {
    key: "actions",
  },
];

const { data: bookings, refresh, status } = await useFetch<Booking[]>("/api/bookings", { lazy: true, server: false });

const query = ref<string>("");
const paymentType = ref<Booking["paymentType"]>("");

const paymentTypes = [
  { label: "-", value: "" },
  { label: "Credit Card", value: "credit" },
  { label: "PayPal", value: "paypal" },
  { label: "Revolut", value: "revolut" },
];

const rows = computed(() => {
  let _rows = bookings.value ?? [];

  if (query.value) {
    _rows = _rows.filter((v) => v.userName.toLowerCase().includes(query.value.toLowerCase()));
  }

  if (paymentType.value) {
    _rows = _rows.filter((v) => v.paymentType === paymentType.value);
  }

  return _rows;
});

const modal = useModal();

const onDelete = (id: Booking["id"]) => {
  modal.open(UiConfirm, {
    async onSuccess() {
      modal.close();

      try {
        await $fetch("/api/booking", {
          method: "delete",
          body: { id },
        });

        refresh();
      } catch (e) {
        console.error(e);
      }
    },
    onError() {
      modal.close();
    },
  });
};
</script>

<template>
  <div class="border border-gray-200 rounded-md">
    <div class="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
      <UFormGroup label="Search by name">
        <UInput v-model="query" placeholder="query" />
      </UFormGroup>
      <UFormGroup label="Filter by payment type">
        <USelectMenu
          v-model="paymentType"
          :options="paymentTypes"
          placeholder="Select one"
          value-attribute="value"
          option-attribute="label"
        />
      </UFormGroup>
    </div>

    <UTable
      :loading="status !== 'success'"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      class="w-full"
      :columns="columns"
      :rows="rows"
    >
      <template #actions-data="{ row }">
        <div class="flex gap-2 justify-end">
          <UButton color="white" :to="`/booking/${row.id}`">Edit</UButton>
          <UButton color="red" @click="() => onDelete(row.id)">Delete</UButton>
        </div>
      </template>
    </UTable>

    <div class="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
      <UButton color="green" to="/booking/add">Add</UButton>
    </div>
  </div>
</template>
