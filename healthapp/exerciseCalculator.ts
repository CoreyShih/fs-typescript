interface ExerciseArguments {
  target: number;
  hours: number[];
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: "bad" | "okay" | "good";
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const numberArgs = args.slice(2).map(Number);

  if (numberArgs.some((num) => Number.isNaN(num))) {
    throw new Error("Provided values were not numbers");
  }

  return {
    target: numberArgs[0],
    hours: numberArgs.slice(1),
  };
};

export const calculateExercises = (
  target: number,
  hours: number[],
): ExerciseResult => {
  if (target < 0 || hours.some((h) => h < 0)) {
    throw new Error("Target and daily hours must be nonnegative");
  }

  const avgHours = hours.reduce((sum, curr) => sum + curr, 0) / hours.length;

  let rating: ExerciseResult["rating"] = 1;
  let ratingDescription: ExerciseResult["ratingDescription"] = "bad";

  if (avgHours >= target) {
    rating = 3;
    ratingDescription = "good";
  } else if (avgHours >= target / 2) {
    rating = 2;
    ratingDescription = "okay";
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h > 0).length,
    success: avgHours >= target,
    rating,
    ratingDescription,
    target,
    average: avgHours,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, hours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(target, hours));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
