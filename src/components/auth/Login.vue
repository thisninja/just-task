<template>
  <div class="full-width">
    <img
      class="layout__icon"
      src="@/assets/task-icon.jpg"
    />
    <h3>
      {{ LOGIN_CTA_TITLE }}
    </h3>
  </div>
</template>

<script>
import {
  LOGIN_CTA_TITLE,
} from './constants';

export default {
  name: 'Login',
  data () {
    return {
      LOGIN_CTA_TITLE,
    }
  },
}
</script>
