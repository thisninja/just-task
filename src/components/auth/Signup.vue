<template>
  <div class="full-width">
    <common-placeholder :title="CREATE_ACCOUNT_TITLE" />
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
