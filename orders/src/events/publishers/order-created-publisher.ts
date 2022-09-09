import {Publisher, OrderCreatedEvent, Subjects} from '@pradeep87/common';
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}