import { Time } from '@angular/common';

export interface JournalModel {
    userId: string,
    title: string,
    content: string,
    imageUrl: string,
    mood: string,
    quote: string,
    tag: string[],
    createdAt: Date,
}