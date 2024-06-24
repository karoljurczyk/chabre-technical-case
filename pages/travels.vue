<script setup lang="ts">
import type Travel from "~/models/travel";

const columns = [
  {
    key: "picture",
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "price",
    label: "Price",
    sortable: true,
  },
  {
    key: "rating",
    label: "User Rating",
  },
  {
    key: "departure",
    label: "Departure Date",
  },
  {
    key: "return",
    label: "Return Date",
  },
  {
    key: "actions",
  },
];

const { data: travels, refresh, status } = await useFetch<Travel[]>("/api/travels", { lazy: true, server: false });

const query = ref("");

const rows = computed(() => {
  let _rows = travels.value ?? [];

  if (query.value) {
    _rows = _rows.filter((v) => v.name.toLowerCase().includes(query.value.toLowerCase()));
  }

  return _rows;
});

const onDelete = async (id: Travel["id"]) => {
  try {
    await $fetch("/api/travel", {
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
      <UButton color="green" to="/travel/add">Add</UButton>
    </div>

    <UTable
      :loading="status !== 'success'"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      class="w-full"
      :columns="columns"
      :rows="rows"
    >
      <template #picture-data="{ row }">
        <UAvatar :src="row.picture" size="2xs" />
      </template>
      <template #price-data="{ row }">
        ${{ row.price.toFixed(2) }}
      </template>
      <template #rating-data="{ row }">
        {{ row.userRating.toFixed(1) }}
      </template>
      <template #departure-data="{ row }">
        {{ new Date(row.departureDate).toLocaleDateString() }}
      </template>
      <template #return-data="{ row }">
        {{ new Date(row.returnDate).toLocaleDateString() }}
      </template>
      <template #actions-data="{ row }">
        <div class="flex gap-2 justify-end">
          <UButton color="white" :to="`/travel/${row.id}`">Edit</UButton>
          <UButton color="red" @click="() => onDelete(row.id)">Delete</UButton>
        </div>
      </template>
    </UTable>
  </div>
</template>
