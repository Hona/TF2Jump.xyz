import { Message } from './message';

export interface Chat {
    userId: number;
    name: string;
    photoUrl?: string;
    messages: Message[];
    status: string;
}