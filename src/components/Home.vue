<template>
  <h1>Home Page status {{statusMsg}}</h1>
</template>

<script>
  import Service from '@/services/Service';

  export default {
    name: 'Home',
    data() {
      return {
        statusMsg: '',
      }
    },
    created() {
      this.getStatus();
    },
    methods: {
      async getStatus() {
        try {
          const response = await Service.getStatus();
          this.statusMsg = response.data && response.data.msg;
        } catch (e) {
          console.error(e || 'Failed to getStatus');
        }
      },
    }
  }
</script>

<style scoped lang="scss"></style>