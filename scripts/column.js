Vue.component('column', {
    template: `
      <div class="column">
        <h2>{{ title }}</h2>
        <new-card-form v-if="index === 0" @submit="handleAddCard"></new-card-form>
        <card
            v-for="(card, cardIndex) in cards"
            :key="cardIndex"
            :card="card"
            :column-index="index"
            :card-index="cardIndex"
        ></card>
      </div>
    `,
    props: ['title', 'cards', 'index'],
    methods: {
        handleAddCard(card) {
            this.$emit('add-card', card);
        }
    }
});