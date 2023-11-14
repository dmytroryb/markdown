<template>
  <v-app>

    <v-main>
      <MarkdownEditor/>
    </v-main>
  </v-app>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';

export default {
  name: 'App',

  components: {
    MarkdownEditor,
  },

  data: () => ({
    //
  }),
};
</script>
