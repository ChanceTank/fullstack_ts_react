export default class ToDo {
    id: number;
    content: string;
    isCompleted: boolean;

    constructor(id: number | string, content: string, isCompleted: boolean | string) {
        if (typeof id === 'string') {
            this.id = Number(id);
        } else {
            this.id = id;
        }
        this.content = content;

        if (typeof isCompleted === 'string') {
            switch (isCompleted.toLowerCase()) {
                case 'true':
                    this.isCompleted = true;
                    break;
                case 'false':
                    this.isCompleted = false;
                    break;
                default:
                    this.isCompleted = false;
                    break;
            }
        } else {
            this.isCompleted = isCompleted;
        }
    }

}