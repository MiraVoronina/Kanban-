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
            :has-critical-deadlines-in-middle-columns="$parent.hasCriticalDeadlinesInMiddleColumns"
            @edit="handleEditCard"
            @delete="handleDeleteCard"
            @move="handleMoveCard"
            @return-card="handleReturnCard"
        ></card>
      </div>
    `,
    props: ['title', 'cards', 'index'],
    methods: {
        handleAddCard(card) {
            this.$emit('add-card', card);
        },
        handleEditCard(cardIndex, updatedCard) {
            this.$emit('edit-card', this.index, cardIndex, updatedCard);
        },
        handleDeleteCard(cardIndex) {
            this.$emit('delete-card', this.index, cardIndex);
        },
        handleMoveCard(cardIndex, toIndex) {
            this.$emit('move-card', this.index, toIndex, cardIndex);
        },
        handleReturnCard(cardIndex, reason) {
            this.$emit('return-card', this.index, cardIndex, reason);
        }
    }
});