<script setup lang="ts">
import { UiConfirm } from "#components";
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

const query = ref<string>("");
const priceMin = ref<Travel["price"]>();
const priceMax = ref<Travel["price"]>();

const rows = computed(() => {
  let _rows = travels.value ?? [];

  if (query.value) {
    _rows = _rows.filter((v) => v.name.toLowerCase().includes(query.value.toLowerCase()));
  }

  if (priceMin.value) {
    _rows = _rows.filter((v) => v.price! >= priceMin.value!);
  }

  if (priceMax.value) {
    _rows = _rows.filter((v) => v.price! <= priceMax.value!);
  }

  return _rows;
});

const modal = useModal();

const onDelete = (id: Travel["id"]) => {
  modal.open(UiConfirm, {
    async onSuccess() {
      modal.close();

      try {
        await $fetch("/api/travel", {
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
      <UFormGroup class="" label="Filter by price" :ui="{ container: 'flex gap-2' }">
        <UInput v-model="priceMin" type="number" placeholder="min" />
        <UInput v-model="priceMax" type="number" placeholder="max" />
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
      <template #picture-data="{ row }">
        <UAvatar :src="row.picture" size="2xs" />
      </template>
      <template #price-data="{ row }"> ${{ row.price.toFixed(2) }} </template>
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

    <div class="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
      <UButton color="green" to="/travel/add">Add</UButton>
    </div>
  </div>
</template>
