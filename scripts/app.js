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