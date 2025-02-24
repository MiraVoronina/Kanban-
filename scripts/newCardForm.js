Vue.component('new-card-form', {
    template: `
      <form @submit.prevent="handleSubmit" class="new-card-form">
        <input type="text" v-model="title" placeholder="Заголовок" required maxlength="50"/>
        <textarea
            v-model="description"
            placeholder="Описание"
            required
            maxlength="200"
        ></textarea>
        <input type="date" v-model="deadline" required />
        <button type="submit">Добавить задачу</button>
      </form>
    `,
    data() {
        return {
            title: "",
            description: "",
            deadline: ""
        };
    },
    methods: {
        handleSubmit() {
            if (this.title && this.description && this.deadline) {
                this.$emit('submit', { title: this.title, description: this.description, deadline: this.deadline });
                this.title = "";
                this.description = "";
                this.deadline = "";
            }
        }
    }
});