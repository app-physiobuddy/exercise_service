import { PrismaClient } from "@prisma/client";
import ErrorTypes from "../../../../utils/errors/ErrorTypes.js";
import { Category } from "../../../../application/entities/Entities.js";


class CategoryRepository implements CategoryRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createCategory(data:Category) {
    try {
      const result = await this.prisma.category.create({ data })
      if (!result) throw ErrorTypes.DatabaseError('Error creating category')
      return true
      
    } catch (error:any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
        console.error('Error: Entry with this name already exists.');
        throw ErrorTypes.DatabaseError('Name already exists')
      }
        throw ErrorTypes.DatabaseError('Error creating category')
    }
  }


  async getCategoryById(id_comp: number, category_id: number): Promise<Category | null> {
    try {
      const result = await this.prisma.category.findUnique({
        where: { id_category: category_id, id_comp: id_comp },
      })
      console.warn(result)
      if (!result) throw ErrorTypes.DatabaseError('Error getting category. It may not exist')
      return result
    } catch (error) {
        throw ErrorTypes.DatabaseError('Error getting category. It may not exist')
    }
  }
  
  async updateCategory(
    data: Category
  ) {
    try {
      return await this.prisma.category.update({
        where: { id_category: data.id_category, id_comp:data.id_comp},
        data
      })
    } catch (error) {
      throw ErrorTypes.DatabaseError('Error updating category.')
    }
  }
  async getCategoriesByCompanyId(id_comp: number): Promise<Category[]> {
    try {
      const result = await this.prisma.category.findMany({
        where: { id_comp },
      });
      console.warn(result);
      if (result.length === 0) {
        throw ErrorTypes.DatabaseError('No categories found for the given company ID');
      }
      return result;
    } catch (error) {
      throw ErrorTypes.DatabaseError('Error fetching categories');
    }
  }
  

  async deleteCategory(id_comp: number, id_category: number) {
    console.log("RUNS")
    try {
      const result = await this.prisma.category.update({
        where: { id_category: id_category, id_comp: id_comp },
        data: { 
          is_deleted: true, 
          date_deleted: new Date() 
        }
        
      })
      if (!result) throw ErrorTypes.DatabaseError('Error deleting category')
      return true
    } catch (error) {
      throw ErrorTypes.DatabaseError('Error deleting category');
    }
  }
}

export default CategoryRepository