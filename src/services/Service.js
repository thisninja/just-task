import Api from '@/services/Api';

export default {
  getStatus() {
    return Api().get('');
  }
};
