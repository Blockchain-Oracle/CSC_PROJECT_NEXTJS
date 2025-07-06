export type FeedbackItem = {
    id: string;
    category: string;
    message: string;
    date: string;
    status: 'pending' | 'resolved';
};