<script setup lang="ts">
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

const query = ref("");

const rows = computed(() => {
  let _rows = bookings.value ?? [];

  if (query.value) {
    _rows = _rows.filter((v) => v.userName.toLowerCase().includes(query.value.toLowerCase()));
  }

  return _rows;
});

const onDelete = async (id: Booking["id"]) => {
  try {
    await $fetch("/api/booking", {
      method: "delete",
      body: { id },
    });

    refresh();
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="border border-gray-200 rounded-md">
    <div class="flex justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="query" placeholder="Filter ..." />
      <UButton color="green" to="/booking/add">Add</UButton>
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
  </div>
</template>
