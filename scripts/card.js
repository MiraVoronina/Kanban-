Vue.component('card', {
    template: `
      <div class="card">
        <h3>{{ card.title }}</h3>
        <p><strong>Описание:</strong> {{ card.description }}</p>
        <p><strong>Дэдлайн:</strong> {{ formatDate(card.deadline) }}</p>
        <p><strong>Создано:</strong> {{ formatDate(card.createdAt) }}</p>
        <p><strong>Последнее изменение:</strong> {{ formatDate(card.lastEdited) }}</p>
      </div>
    `,
    props: ['card'],
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleString();
        }
    }
});