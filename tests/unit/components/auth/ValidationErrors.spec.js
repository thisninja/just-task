import { shallowMount } from '@vue/test-utils';
import ValidationErrors from '@/components/auth/ValidationErrors.vue';

describe('ValidationErrors.vue', () => {
  const errors = [
    'foo',
    'bar'
  ];

  it('should match snapshot', () => {
    const wrapper = shallowMount(ValidationErrors, {
      propsData: {
        errors,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
