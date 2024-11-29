import { PrismaClient, Prisma } from "@prisma/client";
import ErrorTypes from "../../../../utils/errors/ErrorTypes.js";
import { Category, Exercise } from "../../../../application/entities/Entities.js";
import { ExerciceRepositoryInterface } from "../../../../adapters/DbGatewayContract.type.js";



class ExerciseRepository implements ExerciceRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async createExercise(data: Exercise) {
    console.log(data)
    try {
      const result = await this.prisma.exercise.create({ data })
      if (!result) throw ErrorTypes.DatabaseError('Error creating exercise')
      return true
    } catch (error) {
      console.log(error)
      throw ErrorTypes.DatabaseError('Error creating exercise');
    }
  }
  async test() {
    return true
  }
 
}

export default ExerciseRepository