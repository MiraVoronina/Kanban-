Vue.component('card', {
    template: `
      <div class="card">
        <h3>{{ card.title }}</h3>
        <p><strong>Описание:</strong> {{ card.description }}</p>
        <p><strong>Дэдлайн:</strong> {{ formatDate(card.deadline) }}</p>
        <p><strong>Создано:</strong> {{ formatDate(card.createdAt) }}</p>
        <p><strong>Последнее изменение:</strong> {{ formatDate(card.lastEdited) }}</p>
        <button class="edit" @click="editCard">Редактировать</button>
        <button class="delete" @click="deleteCard">Удалить</button>
        <button v-if="canMoveForward" class="move" @click="moveCard">Переместить</button>
      </div>
    `,
    props: ['card', 'columnIndex', 'cardIndex'],
    computed: {
        canMoveForward() {
            return (this.columnIndex < 4);
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleString();
        },
        editCard() {
            const updatedCard = prompt("Введите новое описание:", this.card.description);
            if (updatedCard) {
                this.$emit('edit', this.cardIndex, { description: updatedCard });
            }
        },
        deleteCard() {
            if (confirm("Вы уверены, что хотите удалить эту карточку?")) {
                this.$emit('delete', this.cardIndex);
            }
        },
        moveCard() {
            this.$emit('move', this.cardIndex);
        }
    }
});