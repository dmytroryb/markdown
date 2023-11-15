<template>
  <v-dialog v-model="dialog" width="720">
    <template v-slot:activator="{ on, attrs }">
      <button class="toolbar-button" v-bind="attrs" v-on="on">File</button>
    </template>

    <v-card>
      <v-card-title class="text-h6">
        Select video
      </v-card-title>

      <v-container fluid>
        <v-file-input
          accept=".pdf, .txt, .doc"
          multiple
          :loading="loadingStatus"
          label="Upload files"
          @change="onFilesAdded"
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
              <p>{{item.fileName}}</p>
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
import { filesUploadEmulation } from "@/plugins/server-emulation.js";

export default {
  name: "FileDialog",
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
          fileUrl: "/example/file-example-1.txt",
          fileName: "file-example-1",
          fileType: "txt",
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
    async onFilesAdded(files) {
      if(this.loadingStatus) { return }
      this.loadingStatus = true
      if(files && files.length > 0) {
        const data = await filesUploadEmulation(files)
        if(Array.isArray(data)) {
          this.items.unshift(...data)
        }
      }
      this.loadingStatus = false
    }
  },
};
</script>
