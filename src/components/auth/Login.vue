<template>
  <div class="full-width">
    <common-placeholder :title="LOGIN_CTA_TITLE" />
  </div>
</template>

<script>
import CommonPlaceholder from './CommonPlaceholder';
import {
  LOGIN_CTA_TITLE,
} from './constants';

export default {
  name: 'Login',
  components: {
    CommonPlaceholder,
  },
  data () {
    return {
      LOGIN_CTA_TITLE,
    }
  },
}
</script>
