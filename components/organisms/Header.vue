<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";

const links: HorizontalNavigationLink[][] = [
  [],
  [
    {
      label: "Travels",
      to: "/travels",
    },
    {
      label: "Bookings",
      to: "/bookings",
    },
  ],
  [],
];
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>
