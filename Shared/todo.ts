export default class Todo {
    id: number;
    title: string;
    completed: boolean;

    constructor(id: number | string, title: string, completed: boolean | string) {
        if (typeof id === 'string') {
            this.id = Number(id);
        } else {
            this.id = id;
        }
        this.title = title;
        
        if (typeof completed === 'string') {
            switch (completed.toLowerCase()) {
                case 'true':
                    this.completed = true;
                    break;
                case 'false':
                    this.completed = false;
                    break;
                default:
                    this.completed = false;
                    break;
            }
        } else {

            this.completed = completed;
        }
    }
}