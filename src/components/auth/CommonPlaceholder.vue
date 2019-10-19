<script>
export default {
  functional: true,
  props: ['title'],
  render(h, { props }) {
    return [
      h('img', {
        class: 'layout__icon',
        attrs: {
          src: 'src/assets/task-icon.jpg',
        },
      }),
      h('h3', props.title)
    ];
  }
}
</script>
