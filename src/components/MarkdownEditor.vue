<template>
  <v-container>
    <div>
      <div class="markdown-container">
        <div class="markdown-toolbar">
          <div class="toolbar-content">
            <template v-for="item in toolbarData">
              <ImageDialog v-if="item.id === 'image'" :key="item.id" @save="onImagesSelect" />
              <button
                v-else
                :key="item.id"
                type="button"
                class="toolbar-button"
                @click="item.onClickMethod"
              >
                {{ item.title }}
              </button>
            </template>
          </div>
        </div>
        <textarea
          class="markdown-editor"
          :value="markdownValue"
          @input="onUpdate"
        ></textarea>
        <div class="markdown-hint">
          **Bold** *Italic* _Underline_ - List with bullets # H1 ## H2 ### H3
          #### H4 ##### H5 ###### H6
        </div>
      </div>
      <div class="markdown-preview" v-html="compiledMarkdown"></div>
    </div>
  </v-container>
</template>

<script>
import { marked } from "marked";
import ImageDialog from "@/components/toolbar/ImageDialog.vue";

export default {
  name: "MarkdownEditor",
  components: {
    ImageDialog,
  },
  data: () => ({
    markdownValue: `# Header 1\n\n## Header 2\n\n### Header 3\n\nLorem ipsum sit amet.\n\n**bold** *italic* _underline_\n\n[col-left]Content in the left column[/col-left][col-right]Content in the right column[/col-right]\n\nThis is a [link](https://exemplar.com)\n\n[img=”https://exemplar.com/image.jpg”]\n\n[col-left][img=”https://exemplar.com/image.jpg”][/col-left][col-right][img=”https://exemplar.com/image.jpg”][/col-right]\n\n[table]\n[row][col-left]**Make it bold**[/col-left][col-right]**Make it bold**[/col-right][/row]\n[row][col-left]Content in the left column[/col-left][col-right]Content in the right column[/col-right][/row]\n[row][col-left]Content in the left column[/col-left][col-right]Content in the right column[/col-right][/row]\n[/table]`,
  }),
  computed: {
    compiledMarkdown() {
      return marked(this.markdownValue, { sanitize: true });
    },
    toolbarData() {
      return [
        {
          id: "image",
          title: "Image",
          onClickMethod: () => {},
        },
        {
          id: "video",
          title: "Video",
          onClickMethod: () => {},
        },
        {
          id: "description",
          title: "Description",
          onClickMethod: () => {},
        },
        {
          id: "quote",
          title: "Quote",
          onClickMethod: () => {},
        },
        {
          id: "footnote",
          title: "Footnote",
          onClickMethod: () => {},
        },
        {
          id: "link",
          title: "Button",
          onClickMethod: () => {},
        },
        {
          id: "file",
          title: "File",
          onClickMethod: () => {},
        },
        {
          id: "2col",
          title: "2 columns",
          onClickMethod: () => {},
        },
        {
          id: "table",
          title: "Table",
          onClickMethod: () => {},
        },
        {
          id: "table-row",
          title: "Table row",
          onClickMethod: () => {},
        },
      ];
    },
  },
  methods: {
    onUpdate(e) {
      this.markdownValue = e.target.value;
    },
    onImagesSelect(data) {
      if(Array.isArray(data) && data.length > 0) {
        this.markdownValue += data.map(item => `\n\n![${item.fileName}](${item.fileUrl})`)
      }
    },
  },
};
</script>

<style>
.markdown-container {
  padding-top: 50px;
}
.markdown-toolbar {
  border-left: 1px solid #e0e2e3;
  border-right: 1px solid #e0e2e3;
  border-top: 1px solid #e0e2e3;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0 20px;
}
.toolbar-content {
  border-bottom: 1px solid #e0e2e3;
  display: flex;
}
.toolbar-button {
  color: #999ea2;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
}
.toolbar-button:first-child {
  padding-left: 0;
}
.toolbar-button:last-child {
  padding-right: 0;
}
.markdown-editor {
  width: 100%;
  min-height: 600px;
  padding: 10px 20px 20px 20px;
  outline: none;
  border-left: 1px solid #e0e2e3;
  border-right: 1px solid #e0e2e3;
  border-bottom: 1px solid #e0e2e3;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.markdown-hint {
  font-family: "Helvetica Neue", sans-serif;
  color: #333d4580;
  font-size: 13px;
  font-weight: 400;
  margin-top: 10px;
}
.markdown-preview {
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid #e0e2e3;
}
</style>
