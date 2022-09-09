import { Subjects, Publisher, PaymentCreatedEvent } from '@pradeep87/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}