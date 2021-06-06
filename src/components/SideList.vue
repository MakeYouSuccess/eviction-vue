<template>
  <v-list class="py-0 side-list">
    <div
      v-for="item in items"
      :key="item.text"
    >
      <v-list-item
        v-if="item.status !== 'hidden'"
        class="py-1 d-flex justify-space-between"
        :class="[
          item.status === 'completed'
            ? 'side-list-complete'
            : 'side-list-incomplete',
        ]"
        @click="$router.push({ name: item.linkname })"
      >
        <div :class="textColor(item.status)">
          <v-icon
            :color="iconColor(item.status)"
            class="pr-2"
          >
            mdi-{{
              item.status === "completed"
                ? "check-circle"
                : "checkbox-blank-circle-outline"
            }}
          </v-icon>
          {{ item.text }}
        </div>
        <v-spacer />
        <v-btn
          v-if="item.displayChildren"
          :color="iconColor(item.status)"
          class="btn--plain"
          icon
          @click="
            () => {
              item.showChildren = !item.showChildren;
            }
          "
        >
          <v-icon>mdi-chevron-{{ direction(item.showChildren) }}</v-icon>
        </v-btn>
      </v-list-item>
      <div
        v-if="item.showChildren"
        class="side-list-subchild"
      >
        <div
          v-for="child in item.children"
          :key="child.text"
        >
          <v-list-item
            class="py-1"
            :class="[child.status === 'completed' ? 'side-list-complete' : '']"
          >
            <div :class="textColor(child.status)">
              <v-icon
                :color="iconColor(child.status)"
                class="pr-2"
              >
                mdi-{{
                  child.status === "completed"
                    ? "check-circle"
                    : "checkbox-blank-circle-outline"
                }}
              </v-icon>
              {{ child.text }}
            </div>
          </v-list-item>
        </div>
      </div>
    </div>
  </v-list>
</template>

<script>
export default {
  name: "SideList",
  props: {
    items: Object,
  },
  data() {
    return {};
  },
  computed: {
    direction() {
      return (name) => (name ? "up" : "down");
    },
  },
  methods: {
    textColor(status) {
      switch (status) {
        case "completed":
          return "white--text";
        case "disabled":
          return "info--text";
        default:
          return "secondary--text";
      }
    },
    iconColor(status) {
      switch (status) {
        case "completed":
          return "white";
        case "disabled":
          return "info";
        default:
          return "primary";
      }
    },
  },
};
</script>

<style>
.side-list {
  border-radius: 10px;
}

.side-list > div:first-child > div {
  border-radius: 10px 10px 0 0;
}

.side-list > div:last-child > div {
  border-radius: 0 0 10px 10px;
}

.side-list-incomplete {
  background-color: white;
  pointer-events: none;
  opacity: 1;
}

.side-list-complete {
  background-color: #4dccc4;
  /* border-radius: 20px; */
}

.side-list-subchild {
  background-color: rgb(248, 250, 251);
  border-radius: 0% !important;
}
</style>