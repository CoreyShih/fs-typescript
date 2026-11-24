interface BmiArguments {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!Number.isNaN(Number(args[2])) && !Number.isNaN(Number(args[3]))) {
    return { height: Number(args[2]), weight: Number(args[3]) };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  if (height < 0 || weight < 0) {
    throw new Error("Height and weight must be nonnegative");
  }

  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "normal weight";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
