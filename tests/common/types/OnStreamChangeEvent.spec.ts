import { expect } from 'chai';
import { OnStreamChangeEvent } from '../../../src/common/types';
import { activeStream } from '../../mocks';

describe('Types: OnStreamChangeEvent', () => {
    it('should set values in constructor', () => {
        const str = activeStream()
        const model = new OnStreamChangeEvent(str);
        expect(model.stream).to.not.be.undefined;
        expect(model.stream).to.be.equal(str);
    })
})