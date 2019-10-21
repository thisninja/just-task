import { mount } from '@vue/test-utils';
import CommonPlaceholder from '@/components/auth/CommonPlaceholder.vue';

describe('CommonPlaceholder.vue', () => {
  const title = 'bar';

  const WrapperHOC = {
    components: { CommonPlaceholder },
    template: `
    <div>
      <common-placeholder v-bind="$attrs" />
    </div>
  `
  }

  const wrapper = mount(WrapperHOC, {
    propsData: {
      title,
    },
  });

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
