export enum Suits {
    Clubs = 'Clubs',
    Diamonds = 'Diamonds',
    Clover = 'Clover',
    Hearts = 'Hearts'
}

export enum faceValue {
    One = 'A',
    Two = '2',
    Three = '3',
    Four = '4',
    Five = '5',
    Six = '6',
    Seven = '7',
    Eight = '8',
    Nine = '9',
    Ten = '10',
    Jack = 'J',
    Queen = 'Q',
    King = 'K',
}

export type Card = {
    numericValue: number,
    suitValue: Suits,
    faceValue: string
}
