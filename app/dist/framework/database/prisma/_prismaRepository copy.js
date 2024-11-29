"use strict";
/*
import { PrismaClient, Prisma, Exercise } from '@prisma/client'
import ErrorTypes from '../../../utils/errors/ErrorTypes.js'
import { Category } from '../../../application/entities/Category.js'
import { DbGatewayContract } from '../../../adapters/DbGatewayContract.type.js'

export class PrismaRepository implements DbGatewayContract<Category, Exercise> {
  private prisma: PrismaClient
 

  constructor() {
    this.prisma = new PrismaClient()
  }

  // Category Methods
  

  // Exercise Methods
  async createExercise(data: Exercise) {
    try {
      const result = await this.prisma.exercise.create({ data })
      if (!result) throw ErrorTypes.DatabaseError('Error creating exercise')
      return true
    } catch (error) {
      throw ErrorTypes.DatabaseError('Error deleting exercise');
    }
  }
/*
  async getExerciseById(id: number) {
    try {
      return await this.prisma.exercise.findUnique({
        where: { id_exercise: id },
        include: { category: true }
      })
    } catch (error) {
      this.handleError(error, 'getExerciseById')
    }
  }

  async updateExercise(
    id: number,
    data: Prisma.ExerciseUpdateInput
  ) {
    try {
      return await this.prisma.exercise.update({
        where: { id_exercise: id },
        data
      })
    } catch (error) {
      this.handleError(error, 'updateExercise')
    }
  }

  async deleteExercise(id: number) {
    try {
      return await this.prisma.exercise.update({
        where: { id_exercise: id },
        data: {
          is_deleted: true,
          date_deleted: new Date()
        }
      })
    } catch (error) {
      this.handleError(error, 'deleteExercise')
    }
  }

  // Plan Methods
  async createPlan(data: Prisma.PlanCreateInput) {
    try {
      return await this.prisma.plan.create({ data })
    } catch (error) {
      this.handleError(error, 'createPlan')
    }
  }

  async getPlanById(id: number) {
    try {
      return await this.prisma.plan.findUnique({
        where: { id_plan: id },
        include: { plan_exercises: true }
      })
    } catch (error) {
      this.handleError(error, 'getPlanById')
    }
  }

  async updatePlan(
    id: number,
    data: Prisma.PlanUpdateInput
  ) {
    try {
      return await this.prisma.plan.update({
        where: { id_plan: id },
        data
      })
    } catch (error) {
      this.handleError(error, 'updatePlan')
    }
  }

  // Plan Exercise Methods
  async createPlanExercise(data: Prisma.PlanExerciseCreateInput) {
    try {
      return await this.prisma.planExercise.create({ data })
    } catch (error) {
      this.handleError(error, 'createPlanExercise')
    }
  }

  async getPlanExercisesByPlanId(planId: number) {
    try {
      return await this.prisma.planExercise.findMany({
        where: { id_plan: planId },
        include: {
          exercise: true,
          plan: true
        }
      })
    } catch (error) {
      this.handleError(error, 'getPlanExercisesByPlanId')
    }
       
  }
      */
