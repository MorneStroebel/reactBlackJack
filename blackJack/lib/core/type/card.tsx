export type Card = {
    success:   boolean;
    deck_id:   string;
    cards:     CardElement[];
    remaining: number;
}

export type CardElement = {
    code:   string;
    image:  string;
    images: Images;
    value:  string;
    suit:   string;
}

export type Images = {
    svg: string;
    png: string;
}
