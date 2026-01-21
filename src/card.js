export class Card {
    constructor(src) {
        this.id = crypto.randomUUID();
        this.selected = false;
        this.src = src;
    }
}
