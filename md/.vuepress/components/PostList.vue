<template>
  <div>
    <ul v-for="post in posts">
      <li>
        <a v-bind:href="post.path">
          {{ post.title }}
          <span class="has-text-grey">{{ show_date(post.frontmatter.date) }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$site.pages;
    }
  },
  methods: {
    show_date(string) {
      if (string === undefined) {
        return null;
      }
      var date = new Date(string);
      console.log(date);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
  }
};
</script>
