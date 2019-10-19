<template>
  <div class="full-width">
    <img
      class="layout__icon"
      src="@/assets/task-icon.jpg"
      />
    <h3>
      {{ CREATE_ACCOUNT_TITLE }}
    </h3>
  </div>
</template>

<script>
import {
  CREATE_ACCOUNT_TITLE,
} from './constants';

export default {
  name: 'Signup',
  data () {
    return {
      CREATE_ACCOUNT_TITLE,
    }
  },
}
</script>
