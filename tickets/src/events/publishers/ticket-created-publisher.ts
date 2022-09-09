import { Publisher, Subjects, TicketCreatedEvent } from "@pradeep87/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject= Subjects.TicketCreated;
}