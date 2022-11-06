
export type MaybePromise<T> = T | Promise<T>;

export interface Stream<T> {
    consume(k?: number): MaybePromise<T>;
    done: boolean;
}

export class Peekable<T> implements Stream<T> {
    constructor(private stream: Stream<T>) {}
    private buffer: Array<MaybePromise<T>> = [];

    get done(): boolean { return this.stream.done };
    consume(k = 0): MaybePromise<T> {
        const { buffer, stream } = this;

        while (k > 0 && buffer.length > 0) {
            buffer.shift();
            k -= 1;
        }

        if (k === 0 && buffer.length > 0) return buffer.shift()!;

        return stream.consume(k);
    }

    peek (k = 0): MaybePromise<T> {
        const { buffer, stream } = this;
        while (k >= buffer.length) {
            buffer.push(stream.consume());
        }
        return buffer[k];
    }
}
