<template>
  <div class="pa-5">
    <h3>Явите номенклатор господа...</h3>
    <ul>
      <li v-for="post of posts" :key="post.id">
        <a :href="post.guid_picture">{{ post.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  async asyncData({ app, params }) {
    // let url = `/api/db/${params.id}`
    const url = '/api/db'
    const row = await app.$axios.$get(url)

    return { posts: row }
  },
  data() {
    return { posts: [] }
  },
}
</script>

<!-- <template>
  <div>
    <v-treeview
      :items="items"
      :dense="dense"
      :selectable="selectable"
      :activatable="activatable"
      :hoverable="hoverable"
      :open-on-click="openOnClick"
      :selected-color="selectedColor"
      :color="color"
      :shaped="shaped"
      :rounded="rounded"
    ></v-treeview>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    // let url = `/api/db/${params.id}`
    const url = '/api/db'
    const row = await app.$axios.$get(url)

    return { items: row }
  },
  data: () => ({
    items: [
      {
        id: 1,
        name: 'Applications :',
      },
    ],
    dense: true,
    selectable: true,
    activatable: false,
    hoverable: true,
    openOnClick: true,
    shaped: false,
    rounded: true,
    color: 'primary',
    selectedColor: 'accent',
    selectedColors: ['accent', 'teal', 'red', 'success', 'warning lighten-2'],
  }),
}
</script> -->
