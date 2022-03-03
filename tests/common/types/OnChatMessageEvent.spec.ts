import { expect } from 'chai';
import { OnMessageExtra, OnMessageFlags } from 'comfy.js';
import { OnChatMessageEvent, User } from '../../../src/common/types';
import { onCommandExtra, user, viewerFlags } from '../../mocks';

describe('Types: OnChatMessageEvent', () => {
    it('should set values in constructor', () => {
        const props = ["user","message","sanitizedMessage","flags","self","extra","id","emotes"];
        const propVals = [user(),"2","3",viewerFlags(),onCommandExtra(),"6",false,["8"]];
        const model = new OnChatMessageEvent(
            propVals[0] as User,
            propVals[1] as string,
            propVals[2] as string,
            propVals[3] as OnMessageFlags,
            propVals[4] as boolean,
            propVals[5] as OnMessageExtra,
            propVals[6] as string,
            propVals[7] as string[]
        );

        const letModelAny = (model as any);
        for(const idx in props) {
            const prop = props[idx];
            expect(letModelAny[prop]).to.not.be.undefined;
            expect(letModelAny[prop]).to.be.equal(propVals[idx]);
        }
    })
})