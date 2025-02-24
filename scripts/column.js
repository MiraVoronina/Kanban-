Vue.component('column', {
    template: `
      <div class="column">
        <h2>{{ title }}</h2>
        <card
            v-for="(card, cardIndex) in cards"
            :key="cardIndex"
            :card="card"
            :column-index="index"
            :card-index="cardIndex"
        ></card>
      </div>
    `,
    props: ['title', 'cards', 'index']
});