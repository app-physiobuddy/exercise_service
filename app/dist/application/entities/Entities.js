export {};
/*
async function getPlanWithExercises(planId: number): Promise<Plan> {
const plan = await prisma.plan.findUnique({
  where: { id_plan: planId },
  include: {
    plan_exercises: {
      include: {
        exercise: true,
      },
    },
  },
});
return plan as Plan;
}

*/ 
