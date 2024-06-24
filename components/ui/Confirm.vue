<script setup lang="ts">
const emit = defineEmits(["success", "error"]);

function onSuccess() {
  emit("success");
}
function onError() {
  emit("error");
}
</script>

<template>
  <UModal prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      Are you sure?

      <template #footer>
        <div class="flex gap-2 justify-between">
          <UButton color="red" type="button" @click="onSuccess"> Yes </UButton>
          <UButton color="white" type="button" @click="onError"> No </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
