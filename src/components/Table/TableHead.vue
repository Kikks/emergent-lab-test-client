<script>
export default {
  props: ["selectAll", "checked"],
  data() {
    return {
      headings: ["first name", "last name", "email", "phone number", "role"],
    };
  },
};
</script>

<template>
  <div class="w-full flex items-center gap-3 py-5 bg-transparent px-3">
    <div class="flex items-center">
      <input
        type="checkbox"
        :checked="checked"
        @click="selectAll()"
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
      class="capitalize tex-sm md:text-base flex-1 w-[10vw] min-w-[150px] md:min-w-[200px]"
      >First Name
    </span>
    <span
      class="capitalize tex-sm md:text-base flex-1 w-[10vw] min-w-[150px] md:min-w-[200px]"
      >Last Name
    </span>
    <span
      class="capitalize tex-sm md:text-base flex-1 w-[10vw] min-w-[250px] md:min-w-[300px]"
      >Email
    </span>
    <span
      class="capitalize tex-sm md:text-base flex-1 w-[10vw] min-w-[150px] md:min-w-[200px]"
      >Phone Number
    </span>
    <span
      class="capitalize tex-sm md:text-base flex-1 w-[10vw] min-w-[150px] md:min-w-[200px]"
      >Role
    </span>

    <span
      class="capitalize tex-sm md:text-base flex-1 w-[10vw] min-w-[150px] md:min-w-[200px]"
    />
  </div>
</template>
