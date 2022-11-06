import { Stream } from "./peekable";

export const EOF = Symbol("EOF");
export type EOF = typeof EOF;


export interface Reader extends Stream<string | EOF> { }

export class InMemoryReader implements Reader {
    constructor(public source: string) {}
    index = 0;
    done = false;

    consume(k: number = 0) {
        const { length } = this.source;

        this.index += k;
        if (this.index >= length) {
            this.done = true;
            this.index = length;
        }
        
        return this.source[this.index] ?? EOF;
    }
}
