import { expect } from 'chai';
import { OnMessageExtra, OnMessageFlags } from 'comfy.js';
import { OnPointRedemptionEvent, User } from '../../../src/common/types';
import { emoteOnlyExtra, user, viewerFlags } from '../../mocks';

describe('Types: OnPointRedemptionEvent', () => {
    it('should set values in constructor', () => {
        const props = ["user","message","flags","self","extra"];
        const propVals = [user(),"2",viewerFlags(),false, emoteOnlyExtra()];
        const model = new OnPointRedemptionEvent(
            propVals[0] as User,
            propVals[1] as string,
            propVals[2] as OnMessageFlags,
            propVals[3] as boolean,
            propVals[4] as OnMessageExtra
        );

        const letModelAny = (model as any);
        for(const idx in props) {
            const prop = props[idx];
            expect(letModelAny[prop]).to.not.be.undefined;
            expect(letModelAny[prop]).to.be.equal(propVals[idx]);
        }
    })
})