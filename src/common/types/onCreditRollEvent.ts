import { Credit } from "./credit";

export class OnCreditRollEvent {
  constructor(
    public credits: Credit[]
  ) { }
}