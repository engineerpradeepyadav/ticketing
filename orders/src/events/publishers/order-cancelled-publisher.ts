import {Publisher, OrderCancelledEvent, Subjects} from '@pradeep87/common';
export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}