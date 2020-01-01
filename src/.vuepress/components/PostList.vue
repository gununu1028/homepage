<template>
  <div>
    <ul>
      <li v-for="post in posts">
        <router-link :to="post.path">
          {{ post.title }}
          <span class="has-text-grey">{{ show_date(post.frontmatter.date) }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="stylus">
li
  margin-bottom 1rem
  &:last-of-type
    margin-bottom 0
</style>

<script>
export default {
  computed: {
    posts() {
      var posts = this.$site.pages.filter(function(page) {
        // home指定がないものだけを表示するように
        return !page.frontmatter.home;
      });
      return posts.sort(function(a, b) {
        return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
      });
    }
  },
  methods: {
    show_date(string) {
      if (string === undefined) {
        return null;
      }
      var date = new Date(string);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
  }
};
</script>
