import { expect } from 'chai';
import { OnFollowEvent } from '../../../src/common/types';
import { user } from '../../mocks';

describe('Types: OnFollowEvent', () => {
    it('should set values in constructor', () => {
        const usr = user();
        const model = new OnFollowEvent(usr);
        expect(model.user).to.not.be.empty;
        expect(model.user).to.be.equal(usr);
    })
})