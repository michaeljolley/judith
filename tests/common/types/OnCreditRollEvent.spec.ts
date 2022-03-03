import { expect } from 'chai';
import { OnCreditRollEvent } from '../../../src/common/types';
import { credit } from '../../mocks';

describe('Types: OnCreditRollEvent', () => {
    it('should set values in constructor', () => {
        const model = new OnCreditRollEvent([credit()]);
        expect(model.credits).to.not.be.empty;
    })
})