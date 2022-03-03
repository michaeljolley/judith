import { expect } from 'chai';
import { OnJoinEvent } from '../../../src/common/types';
import { user } from '../../mocks';

describe('Types: OnJoinEvent', () => {
    it('should set values in constructor', () => {
        const usr = user();
        const model = new OnJoinEvent(usr, false);
        expect(model.user).to.not.be.empty;
        expect(model.user).to.be.equal(usr);
        expect(model.self).to.be.false;
    })
})