import { Time } from '@angular/common';

export interface JournalModel {
    id: string,
    title: string,
    content: string,
    // imageUrl: File[],
    imageUrl: string,
    mood: string,
    tag: string[],
    createdAt: number,
}