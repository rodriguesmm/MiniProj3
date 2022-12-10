<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Sponsors" />
      <!--TABLE-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NOME
                  <i
                    class="fas fa-arrow-up"
                    v-if="sortType === 1"
                    @click="sort()"
                  ></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>
                <th scope="col">GRUPO</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="animal of animals" :key="animal._id">
                <td class="pt-4">{{ animal.name }}</td>
                <td class="pt-4">{{ animal.group }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-certificate"></i> PATROCINAR
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageAnimals",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      animals: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("animal", ["getAnimals", "getMessage"])
  },
  methods: {
    fetchAnimals() {
      this.$store.dispatch(`animal/${FETCH_ANIMALS}`).then(
        () => {
          this.animals = this.getAnimals;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.animals.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },

    viewAnimal(id) {
      const animal = this.animals.find(animal => animal._id === id);

      this.$fire({
        title: animal.name,
        html: this.generateTemplate(animal),
        imageUrl: animal.links[0].url,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Imagem desconhecida"
      });
    },

    generateTemplate(animal) {
      let response = `
          <h4>Grupo:</b> ${animal.group}</h4>
          <h5>(nível:</b> ${animal.level})</h5>
          <p>${animal.description}</p> 
          <p>Elementos multimédia:
        `;
      for (const link of animal.links) {
        response += ` <a href='${link.url}' target='_blank'>${link.types}</a>`;
      }
      response += `</p><p>Comentários: ${animal.comments.length} Avaliações: ${animal.evaluation.length}</p> `;
      return response;
    }
  },
  created() {
    this.fetchAnimals();
  }
};
</script>
