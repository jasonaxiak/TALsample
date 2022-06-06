
export interface IQuote {
  age: number,
  dob: Date,
  occupationId: number,
  sumInsured: number,
  premium: number;
}

export class Quote implements IQuote
{
  age: number;
  dob: Date;
  occupationId: number;
  sumInsured: number;
  premium: number;

  constructor(age: number, dob: Date, occupationId: number, sumInsured: number, premium: number = 0) {
    this.age = age;
    this.dob = dob;
    this.occupationId = occupationId;
    this.sumInsured = sumInsured;
    this.premium = premium;
  }
}
