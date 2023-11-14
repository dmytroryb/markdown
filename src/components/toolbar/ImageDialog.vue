<template>
  <v-dialog v-model="dialog" width="350">
    <template v-slot:activator="{ on, attrs }">
      <button class="toolbar-button" v-bind="attrs" v-on="on">Image</button>
    </template>

    <v-card>
      <v-card-title class="text-h6">
        Select image
      </v-card-title>

      
      <v-container fluid>
        <v-card elevation="2" v-for="item in items" :key="item.id" class="d-flex align-center pa-2 mb-3">
          <v-checkbox
            v-model="selected"
            :value="item.id"
          ></v-checkbox>
          <v-img
            :lazy-src="item.fileUrl"
            max-height="150"
            max-width="250"
            :src="item.fileUrl"
          ></v-img>
        </v-card>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
        <v-btn color="success" text @click="onSaveClick"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ImageDialog",
  data() {
    return {
      dialog: false,
      selected: [],
      items: [],
    };
  },
  created () {
    this.items = this.predefinedItems.slice(0);
  },
  computed: {
    predefinedItems() {
      return [
        {
          id: 'item1',
          fileUrl: "https://posterumsoft.com/images/blog_article_cover_2.png",
          fileName: "item1,"
        },
        {
          id: 'item2',
          fileUrl: "https://posterumsoft.com/images/blog_article_cover_1.png",
          fileName: "item2,"
        },
        {
          id: 'item3',
          fileUrl: "https://posterumsoft.com/images/demystifying-javascript-data-types.jpg",
          fileName: "item3,"
        },
      ]
    }
  },
  methods: {
    onSaveClick() {
      const data = this.selected
        .map(id => this.items.find(i => i.id === id))
        .filter(i => i)
      this.$emit('save', data)
      this.dialog = false
      this.selected = []
    }
  },
};
</script>
