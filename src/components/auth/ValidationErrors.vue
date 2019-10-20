<template>
  <div class="validation-errors">
    <b>
      {{ INFO_MESSAGE_TEXT }}:
    </b>
    <ul>
      <transition-group name="slide" mode="out-in">
        <li
        class="validation-errors__error"
        v-for="(error, index) in errors"
        :key="index"
        >
          {{ error }}
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import {
  INFO_MESSAGE_TEXT,
} from './constants';

export default {
  data() {
    return {
      INFO_MESSAGE_TEXT,
    }
  },
  props: {
    errors: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.validation-errors {
  display: inline-block;

  &__error {
    color: $material-red-200;
    text-align: left;
  }
}
</style>
