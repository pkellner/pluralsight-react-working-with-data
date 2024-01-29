let i = 100;
//i = "abcd";

type Speaker = {
  first: string;
  last: string;
};

const speaker: Speaker = {
  first: "John",
  last: "Doe",
};

const nameStr = `${speaker.first} ${speaker.last}`;

function myFunction<Type>(arg: Type): Type {
  return arg;
}

const str: string =
  myFunction<string>("abcd");

const num: number = myFunction<number>(101);
