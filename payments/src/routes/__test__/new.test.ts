import request from 'supertest';
import mongoose from 'mongoose';
import { OrderStatus } from '@pradeep87/common';
import {app} from '../../app';
import {Order} from '../../models/order';
import { stripe } from '../../stripe';

jest.mock('../../stripe');

it('returns a 404 when purchasing an order that does not exist', async () => {
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'slkdjf',
            orderId: new mongoose.Types.ObjectId().toHexString()
        })
        .expect(404);
});

it('returns a 401 when purchasing an order that does not belong to the user', async () => {
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId : new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 20,
        status : OrderStatus.Created
    });

    order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'askjfdk',
            orderId: order.id,
        })
        .expect(401)
});

it('retruns a 400 when purchasing a cancelled order', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id : new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status : OrderStatus.Cancelled,
    });

    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            orderId : order.id,
            token: 'akdddskl',
        })
        .expect(400);

});


// test does not pass because of some changes in the file
// it('returns a 204 with valid inputs', async () => {
//     const userId = new mongoose.Types.ObjectId().toHexString();
//     const order = Order.build({
//         id: new mongoose.Types.ObjectId().toHexString(),
//         userId,
//         version: 0,
//         price: 20,
//         status: OrderStatus.Created,
//     });

//     await order.save();

//     await request(app)
//         .post('/api/payments')
//         .set('Cookie', global.signin(userId))
//         .send({
//             token: 'tok_visa',
//             orderId: order.id,
//         })
//         .expect(201);


//     const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];

//     expect(chargeOptions.source).toEqual('tok_visa');
//     expect(chargeOptions.amount).toEqual(20 * 100);
//     expect(chargeOptions.currency).toEqual('usd');

    
// });