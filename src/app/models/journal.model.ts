import { Time } from '@angular/common';

export interface JournalModel {
    title: string,
    content: string,
    imageUrl: File[],
    // imageUrl: string,
    mood: string,
    quote: string,
    tag: string[],
    createdAt: number,
}