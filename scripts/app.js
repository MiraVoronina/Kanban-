new Vue({
    el: '#app',
    data() {
        return {
            columns: [
                { title: "Создание задач", cards: [] },
                { title: "Запланированные задачи", cards: [] },
                { title: "Задачи в работе", cards: [] },
                { title: "Тестирование", cards: [] },
                { title: "Выполненные задачи", cards: [] }
            ]
        };
    },
    methods: {
        addCard(card) {
            this.columns[1].cards.push({ ...card, createdAt: new Date(), lastEdited: new Date() });
        },
        editCard(columnIndex, cardIndex, updatedCard) {
            const card = this.columns[columnIndex].cards[cardIndex];
            this.columns[columnIndex].cards[cardIndex] = { ...card, ...updatedCard, lastEdited: new Date() };
        },
        deleteCard(columnIndex, cardIndex) {
            this.columns[columnIndex].cards.splice(cardIndex, 1);
        },
        moveCard(fromIndex, cardIndex) {
            if (fromIndex === 4) return;
            let toIndex = fromIndex + 1;
            if (toIndex >= this.columns.length) {
                alert("Карточка уже находится в последней колонке!");
                return;
            }
            const card = this.columns[fromIndex].cards.splice(cardIndex, 1)[0];
            this.columns[toIndex].cards.push(card);
        }
    },
    created() {
        const savedColumns = JSON.parse(localStorage.getItem('kanban-columns'));
        if (savedColumns) {
            this.columns = savedColumns;
        }
    },
    watch: {
        columns: {
            deep: true,
            handler() {
                localStorage.setItem('kanban-columns', JSON.stringify(this.columns));
            }
        }
    }
});