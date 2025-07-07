<template>
  
  <v-container class="pa-0" style="">

    <v-col cols="12">
      
      <h1 class="v-card__title pa-0 pb-2">
        БАЗИС-Мебельщик, 3D Модели
      </h1>

  <v-card shaped raised class="mb-3" max-height="210" min-height="210">
        <v-card flat shaped>
          
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-img
                class="mx-auto"
                max-width="72"
                src="/icon-zip.png"
                style="cursor: pointer"
                v-bind="attrs"
                v-on="on"
                @click="
                  downloadResource(
                    'https://www.newfurnitura.ru/news/napravl_sharik_MF_1.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Направляющие шариковые полного выдвижения H=35 мм BBS.35</span>
          </v-card-subtitle>
        
        </v-card>
  </v-card>

    </v-col>

  </v-container>


</template>
<script>
export default {
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Архивы фурнитуры для использования в системе автоматического проектирования мебели БАЗИС-Мебельщик на базе фурнитуры компании МФ-Комплект.')
  },
  methods: {
    downloadResource(path) {
      window.open(path);
    },
  },
}
</script>
