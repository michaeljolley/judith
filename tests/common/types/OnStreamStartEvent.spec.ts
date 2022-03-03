import { expect } from 'chai';
import { OnStreamStartEvent } from '../../../src/common/types';
import { activeStream } from '../../mocks';

describe('Types: OnStreamStartEvent', () => {
    it('should set values in constructor', () => {
        const str = activeStream()
        const model = new OnStreamStartEvent(str);
        expect(model.stream).to.not.be.undefined;
        expect(model.stream).to.be.equal(str);
    })
})