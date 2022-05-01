<script>
export default {
  props: ["selectItem", "checked", "data", "deleteSelect"],
};
</script>

<template>
  <div class="w-full flex items-center gap-3 py-5 bg-white px-3">
    <div class="flex items-center">
      <input
        type="checkbox"
        :checked="checked"
        @click="selectItem(data)"
        class="opacity-0 absolute h-8 w-8"
      />
      <div
        class="bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary-500"
      >
        <div
          :class="`${
            checked ? 'block' : 'hidden'
          } h-[90%] w-[90%] bg-primary-500`"
        />
      </div>
    </div>

    <span
      class="text-sm md:text-base flex-1 w-[10vw] overflow-x-hidden min-w-[150px] md:min-w-[200px]"
    >
      {{ data.firstName }}
    </span>
    <span
      class="text-sm md:text-base flex-1 w-[10vw] overflow-x-hidden min-w-[150px] md:min-w-[200px]"
    >
      {{ data.lastName }}
    </span>
    <span
      class="text-sm md:text-base flex-1 w-[10vw] overflow-x-hidden min-w-[250px] md:min-w-[300px]"
    >
      {{ data.email }}
    </span>
    <span
      class="text-sm md:text-base flex-1 w-[10vw] overflow-x-hidden min-w-[150px] md:min-w-[200px]"
    >
      {{ data.phoneNumber }}
    </span>
    <span
      class="text-sm md:text-base flex-1 w-[10vw] overflow-x-hidden min-w-[150px] md:min-w-[200px]"
    >
      {{ data.role }}
    </span>

    <span
      class="text-sm md:text-base flex-1 w-[10vw] overflow-x-hidden min-w-[150px] md:min-w-[200px]"
    >
      <span
        role="button"
        @click="deleteSelect(data)"
        class="material-symbols-outlined"
      >
        delete
      </span>
    </span>
  </div>
</template>
