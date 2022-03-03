import { expect } from 'chai';
import { OnCheerExtra, OnCheerFlags } from 'comfy.js';
import { OnCheerEvent, User } from '../../../src/common/types';
import { cheerSubFlags, onCheerExtra, user } from '../../mocks';

describe('Types: OnCheerEvent', () => {
    it('should set values in constructor', () => {
        const props = ["user","message","bits","flags","extra"];
        const propVals = [user(),"2",3,cheerSubFlags(),onCheerExtra()];
        const model = new OnCheerEvent(
            propVals[0] as User,
            propVals[1] as string,
            propVals[2] as number,
            propVals[3] as OnCheerFlags,
            propVals[4] as OnCheerExtra
        );

        const letModelAny = (model as any);
        for(const idx in props) {
            const prop = props[idx];
            expect(letModelAny[prop]).to.not.be.undefined;
            expect(letModelAny[prop]).to.be.equal(propVals[idx]);
        }
    })
})