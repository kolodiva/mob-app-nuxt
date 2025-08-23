<template>
  <v-card class="mx-auto mt-4" max-width="800px" v-if="posparams && posparams.length > 0">
    <div style="font-size: 1.1rem; ">
      <v-toolbar-title style="font-weight: 400; letter-spacing: 0.00714286em;">
        {{ posparams[0].artikul }}, {{ posparams[0].artikul_new }} <br /> 
        <span class='text-wrap mt-2 d-block'>{{ posparams[0].name }}</span>
      </v-toolbar-title>
    </div>

    <v-row>
      <v-col>
        <v-tabs vertical grow style="min-height: 250px;">
          <v-tab>
            <img :src="`${'https://www.newfurnitura.ru/upload/' + posparams[0].guid + '_250x250.jpg'}`"
              :alt="`${posparams[0].name}`" style="max-width: 60px; object-fit: contain;">
          </v-tab>
          <v-tab>
            <img src="\qr_box_clown.jpg"
              :alt="`${posparams[0].name}`" style="max-width: 60px; object-fit: contain;">
          </v-tab>
          <v-tab>
            <img :src="`${'https://www.newfurnitura.ru/upload/' + posparams[0].guid + '_250x250.jpg'}`"
              :alt="`${posparams[0].name}`" style="max-width: 60px; object-fit: contain;">
          </v-tab>
        <v-tab-item>
          <v-card flat v-if="posparams && posparams.length > 0" >
            <img :src="`${'https://www.newfurnitura.ru/upload/' + posparams[0].guid + '.jpg'}`"
              :alt="`${posparams[0].name}`" style="min-height: 250px; max-width: 250px; cursor: pointer;" class="d-block mx-auto"> </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <img src="\qr_box_clown.jpg"
              :alt="`${posparams[0].name}`" style="min-height: 250px; max-width: 250px; cursor: pointer;"   class="d-block mx-auto">
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat  class="d-block mx-auto">
            <img :src="`${'https://www.newfurnitura.ru/upload/' + posparams[0].guid + '.jpg'}`"
              :alt="`${posparams[0].name}`" style="min-height: 250px; max-width: 250px; cursor: pointer;"   class="d-block mx-auto">
          </v-card>
        </v-tab-item>
      </v-col>

      <v-col v-if="posparams && posparams.length > 0" class="ma-3">
        <v-simple-table dense class="">
          <template v-slot:default>
            <tbody>
              <tr v-for="item in characts" :key="item.field">
                <td style="border-bottom: 1px dotted #cccccc; font-size: 1.1rem; ">
                  {{ item.field }}
                </td>
                <td style="border-bottom: 0px; font-size: 1.1rem; ">
                  {{ posparams[0][item.val] }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    </v-tabs>

    <v-row v-if="posparams && posparams.length > 0" class="my-3 mx-3">

    </v-row>



  </v-card>
</template>

<script>

export default {

  data() {
    return {
      posparams: [],
      characts: [
        { field: "Наименование упак.", val: "packing_name" },
        { field: "Кол-во в упак.", val: "qty_pack" },
        { field: "Кол-во на палете.", val: "qty_palette" },
        { field: "Вес (нетто) кг.", val: "weight_netto_pack" },
        { field: "Вес (брутто) кг.", val: "weight_brutto_pack" },
        { field: "Ширина упак.см", val: "width_pack" },
        { field: "Глубина упак.см", val: "depth_pack" },
        { field: "Высота упак.см", val: "height_pack" },
      ],
      characts1: [
        { field: "Ширина упак.см", val: "width_pack" },
        { field: "Глубина упак.см", val: "depth_pack" },
        { field: "Высота упак.см", val: "height_pack" },
      ],
    }
  },

  async mounted() {
    //this.userId = this.$route.params.id;
    // For example, if the URL is /users/123, then this.userId will be '123'
    console.log('Route parameter ID:', this.$route);

    if (this.posparams.length === 0) {
      if (this.$route.params.id && this.$route.query.p) {
        await this.refreshQRParams();
      }
    }
  },

  methods: {

    async refreshQRParams() {

      const rows = await this.$api("services", "getQRPrint", { id: this.$route.params.id, pack: this.$route.query.p });

      this.posparams = [];

      console.log(rows);

      this.$nextTick(() => {
        this.posparams.push(...rows);
      });
    },
  },

};
</script>
