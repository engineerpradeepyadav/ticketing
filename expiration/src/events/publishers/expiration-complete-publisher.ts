import  { Subjects, Publisher, ExpirationCompleteEvent } from '@pradeep87/common';


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;   
}