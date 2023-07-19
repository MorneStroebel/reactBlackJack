export enum Suits {
    Clubs = 'Clubs',
    Diamonds = 'Diamonds',
    Clover = 'Clover',
    Hearts = 'Hearts'
}

export type Card ={
    numericValue: number,
    suitValue: Suits,
}
