import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.status(200).json({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hours = daily_exercises as any[];

  if (
    Number.isNaN(Number(target)) ||
    hours.some((h) => Number.isNaN(Number(h)))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.status(200).json(
    calculateExercises(
      Number(target),
      hours.map((h) => Number(h)),
    ),
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
