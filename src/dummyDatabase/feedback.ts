import { FeedbackItem } from "../utils";

export const DummyFeedBackItems: FeedbackItem[] = [
    {
          id: '1',
          category: 'Academics',
          message: "The physics lab equipment needs maintenance. Many instruments aren't working properly.",
          date: '2023-11-01T14:30:00',
          status: 'pending'
    },
    {
          id: '2',
          category: 'Hostel',
          message: 'There have been frequent water shortages in Block C for the past week.',
          date: '2023-11-03T09:15:00',
          status: 'resolved'
    },
    {
          id: '3',
          category: 'Facilities',
          message: "The library's air conditioning system is too cold and makes it uncomfortable to study for long periods.",
          date: '2023-11-04T16:45:00',
          status: 'pending'
    }
];