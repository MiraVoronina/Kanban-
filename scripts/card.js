Vue.component('card', {
    template: `
      <div
          class="card"
          :style="{ backgroundColor: card.color }"
          :class="{ 'critical-deadline': isCriticalDeadline }"
      >
        <h3>{{ card.title }}</h3>
        <p><strong>Описание:</strong> {{ card.description }}</p>
        <p><strong>Дэдлайн:</strong> {{ formatDate(card.deadline) }}</p>
        <p><strong>Создано:</strong> {{ formatDate(card.createdAt) }}</p>
        <p><strong>Последнее изменение:</strong> {{ formatDate(card.lastEdited) }}</p>
        <p v-if="card.status"><strong>Статус:</strong> {{ card.status }}</p>
        <!-- Кнопки -->
        <button
            class="edit"
            @click="editCard"
            :disabled="isInteractionDisabledWithNormalDeadline"
        >
          Редактировать
        </button>
        <button
            class="delete"
            @click="deleteCard"
            :disabled="isInteractionDisabledWithNormalDeadline"
        >
          Удалить
        </button>
        <button
            v-if="canMoveForward"
            class="move"
            @click="moveCard"
            :disabled="isInteractionDisabledWithNormalDeadline"
        >
          Переместить
        </button>
        <button
            v-if="columnIndex === 4"
            class="return"
            @click="returnCard"
            :disabled="isInteractionDisabledWithNormalDeadline"
        >
          Возврат
        </button>
      </div>
    `,
    props: ['card', 'columnIndex', 'cardIndex', 'hasCriticalDeadlinesInMiddleColumns'],
    computed: {
        canMoveForward() {
            return (this.columnIndex < 4); // Разрешаем перемещение до пятой колонки
        },
        isCriticalDeadline() {
            const deadline = new Date(this.card.deadline);
            const now = new Date();
            const diffTime = deadline - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 2; // Если осталось 2 или менее дня
        },
        isInteractionDisabledWithNormalDeadline() {
            // Ограничение действует только в колонках 2-4 и только для карточек с нормальным дедлайном
            return (
                this.hasCriticalDeadlinesInMiddleColumns &&
                this.columnIndex >= 1 &&
                this.columnIndex <= 3 &&
                !this.isCriticalDeadline
            );
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleString();
        },
        editCard() {
            if (this.isInteractionDisabledWithNormalDeadline) {
                alert("Все взаимодействия заблокированы из-за наличия карточек с критическим дедлайном!");
                return;
            }
            const updatedCard = prompt("Введите новое описание:", this.card.description);
            if (updatedCard) {
                this.$emit('edit', this.cardIndex, { description: updatedCard });
            }
        },
        deleteCard() {
            if (this.isInteractionDisabledWithNormalDeadline) {
                alert("Все взаимодействия заблокированы из-за наличия карточек с критическим дедлайном!");
                return;
            }
            if (confirm("Вы уверены, что хотите удалить эту карточку?")) {
                this.$emit('delete', this.cardIndex);
            }
        },
        moveCard() {
            if (this.isInteractionDisabledWithNormalDeadline) {
                alert("Все взаимодействия заблокированы из-за наличия карточек с критическим дедлайном!");
                return;
            }
            this.$emit('move', this.cardIndex);
        },
        returnCard() {
            if (this.isInteractionDisabledWithNormalDeadline) {
                alert("Все взаимодействия заблокированы из-за наличия карточек с критическим дедлайном!");
                return;
            }
            const reason = prompt("Введите причину возврата:");
            if (reason) {
                this.$emit('return-card', this.cardIndex, reason);
            }
        }
    }
});