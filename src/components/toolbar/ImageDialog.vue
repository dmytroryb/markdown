<template>
  <v-dialog v-model="dialog" width="720">
    <template v-slot:activator="{ on, attrs }">
      <button class="toolbar-button" v-bind="attrs" v-on="on">Image</button>
    </template>

    <v-card>
      <v-card-title class="text-h6">
        Select image
      </v-card-title>

      <v-container fluid>
        <v-file-input
          accept="image/*"
          multiple
          :loading="loadingStatus"
          label="Upload images"
          @change="saveFile"
        ></v-file-input>
      </v-container>

      <v-container fluid>
      <v-row no-gutters>
        <v-col
          v-for="item in items" :key="item.id"
          cols="6"
          class="pa-2"
        >
            <v-card elevation="2" class="d-flex align-center pa-2">
              <v-checkbox
                v-model="selected"
                :value="item.id"
              ></v-checkbox>
              <v-img
                :lazy-src="item.fileUrl"
                height="150"
                width="270"
                contain
                :src="item.fileUrl"
              ></v-img>
            </v-card>
        </v-col>
      </v-row>
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
import { imagesUploadEmulation } from "@/plugins/server-emulation.js";

export default {
  name: "ImageDialog",
  data() {
    return {
      dialog: false,
      loadingStatus: false,
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
          fileUrl: "https://www.exemplar.com/wp-content/uploads/2020/09/logo-transp.png",
          fileName: "item1"
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
    },
    async saveFile(files){
      if(this.loadingStatus) { return }
      this.loadingStatus = true
      if(files && files.length > 0) {
        const data = await imagesUploadEmulation(files)
        if(Array.isArray(data)) {
          this.items.unshift(...data)
        }
      }
      this.loadingStatus = false
    }
  },
};
</script>
