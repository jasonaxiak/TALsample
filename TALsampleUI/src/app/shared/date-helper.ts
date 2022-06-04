

//Calculate age from a given DOB, for the current date
  export function CalculateAge(dob: Date) {
  var now = new Date();
  now = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  var timeDiff = Math.abs(now.getTime() - dob.getTime());
  return Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
}


//Calculate DOB, for the current date, from any given age
export function GetDobByAge(age: number) {
  var date = new Date();
  return new Date(date.getFullYear() - age, date.getMonth(), date.getDate());
}
