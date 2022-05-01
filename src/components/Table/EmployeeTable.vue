<script>
import TableHead from "./TableHead.vue";
import TableRow from "./TableRow.vue";
import DeleteModal from "./DeleteModal.vue";

export default {
  components: {
    TableHead,
    TableRow,
    DeleteModal,
  },
  props: ["list", "selected", "refetch", "setSelected"],
  data() {
    return {
      open: false,
      employee: {},
    };
  },
  methods: {
    setOpen(boolean) {
      this.open = boolean;
    },
    deleteSelect(employee) {
      this.employee = employee;
      this.open = true;
    },
    selectAll() {
      if (this.selected.length === this.list.length) {
        this.setSelected([]);
      } else {
        this.setSelected([...this.list]);
      }
    },
    selectItem(employee) {
      if (this.selected.find((item) => item.id === employee.id)) {
        const newArray = [...this.selected];
        newArray.splice(
          newArray.findIndex((item) => item.id === employee.id),
          1
        );

        this.setSelected(newArray);
      } else {
        const newArray = [...this.selected];
        newArray.push(employee);
        this.setSelected(newArray);
      }
    },
  },
};
</script>

<template>
  <div class="flex w-full overflow-x-auto">
    <div class="2xl:min-w-full flex flex-col gap-3">
      <TableHead
        :selectAll="selectAll"
        :checked="selected.length === list.length"
      />

      <template v-for="item of list" :key="item.id">
        <TableRow
          :data="item"
          :checked="selected.map((listItem) => listItem.id).includes(item.id)"
          :selectItem="selectItem"
          :deleteSelect="deleteSelect"
        />
      </template>
    </div>
  </div>

  <DeleteModal
    :open="open"
    :setOpen="setOpen"
    :refetch="refetch"
    :employee="employee"
  />
</template>
