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
            if (fromIndex === 4) return; // Из последней колонки нельзя перемещать автоматически

            let toIndex = fromIndex + 1;

            // Проверяем, что индекс находится в допустимых пределах
            if (toIndex >= this.columns.length) {
                alert("Карточка уже находится в последней колонке!");
                return;
            }

            const card = this.columns[fromIndex].cards.splice(cardIndex, 1)[0];
            this.columns[toIndex].cards.push(card);

            // Обновляем статус и цвет карточки при перемещении в пятую колонку
            if (toIndex === 4) {
                const deadline = new Date(card.deadline);
                const now = new Date();
                if (deadline >= now) {
                    card.status = "Выполнено в срок";
                    card.color = "#e8f5e9"; // Нежно-зеленый цвет
                } else {
                    card.status = "Просрочено";
                    card.color = "#ffebee"; // Нежно-розовый цвет
                }
            }
        },
        returnCard(columnIndex, cardIndex, reason) {
            if (columnIndex !== 4) return; // Возврат возможен только из пятой колонки

            const card = this.columns[columnIndex].cards.splice(cardIndex, 1)[0];
            card.returnReason = reason;

            // Сбрасываем цвет и статус карточки при возврате
            card.color = ""; // Возвращаем белый цвет
            card.status = ""; // Очищаем статус

            this.columns[2].cards.push(card); // Возвращаем карточку в третью колонку
        }
    }
});