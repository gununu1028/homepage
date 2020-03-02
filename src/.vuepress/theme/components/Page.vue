<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<style lang="stylus">
p
  margin-bottom 1rem

h2
  margin-bottom 1rem
</style>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"]
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page
  padding-bottom: 2rem
  display block
@media (max-width: $MQMobile)
  .content
    h1 
      font-size 1.5rem
    h2
      font-size 1.25rem
    h3
      font-size 1.1rem
</style>
