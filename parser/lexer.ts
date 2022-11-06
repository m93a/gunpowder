
interface Token {
    type: "identifier" | "EOF"
    content: string;
    leadingTrivia: Trivia[];
    trailingTrivia: Trivia[];
}

interface Trivia {
    type: "comment" | "whitespace",
    content: string;
}

class Lexer {
        
}
