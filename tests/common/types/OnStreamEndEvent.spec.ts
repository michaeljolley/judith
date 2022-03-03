import { expect } from 'chai';
import { OnStreamEndEvent } from '../../../src/common/types';
import { activeStream } from '../../mocks';

describe('Types: OnStreamEndEvent', () => {
    it('should set values in constructor', () => {
        const str = activeStream()
        const model = new OnStreamEndEvent(str);
        expect(model.stream).to.not.be.undefined;
        expect(model.stream).to.be.equal(str);
    })
})