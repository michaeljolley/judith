import { expect } from 'chai';
import { BotEvents } from '../../../src/common';
import { Listener } from '../../../src/events';

describe('Model: Listener', () => {
    it('should set values in constructor', () => {
        const listener = new Listener(BotEvents.OnSay, () => {});

        expect((listener as any).type).to.equal(BotEvents.OnSay);
        expect(typeof (listener as any).listener).to.equal("function");
    })
})