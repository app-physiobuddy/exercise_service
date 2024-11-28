import { CategoryUseCasesInterface } from "../application/use-cases/category-use-cases";
import TypeHttp from "../framework/http.type";
import ErrorTypes from "../utils/errors/ErrorTypes.js";
import assertRole from "./helpers/assertRole.js";

class CategoryControllers<Req extends TypeHttp["Request"], Res extends TypeHttp["Response"]>  {
    private gatewayUseCases: CategoryUseCasesInterface;

    constructor(gatewayUseCases: CategoryUseCasesInterface) {
        this.gatewayUseCases = gatewayUseCases;
    }

    async createCategory(req:Req, res:Res) {
        /*
        user.role
        user.id_comp
        data.name
        data.desc
        */
        const prepareCategoryData = req.body.data;
        if (!prepareCategoryData) throw ErrorTypes.UnauthorizedAccess("data is required");

        const user = req.body.user;
        if (!user.role || !user.id_comp) throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
        
        const data = {
            name : prepareCategoryData.name,
            desc : prepareCategoryData.desc,
            id_comp : user.id_comp,
            date_updated : new Date(),
        }

        assertRole(user.role).isTherapistOrTherapistAdmin()
        const response = await this.gatewayUseCases.createCategory(data);

        return res.status(201).json({
            success: response,
            message : response ? "Category created" : "Error creating category"
        });
    }

    async getCategoryById(req:Req, res:Res) {
        /*
        user.role
        user.id_comp
        data.category_id
        */
        //if (!req.body.data) throw ErrorTypes.UnauthorizedAccess("data.category_id is required");
        const category_id = Number(req.body.data?.category_id) || Number(req.params.company_id);

        if (!req.body.user) throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
        const user = req.body.user;
       
        const id_comp = Number(user.id_comp) // || Number(req.params.company_id);

        assertRole(user.role).isTherapistOrCompany()
        const response = await this.gatewayUseCases.getCategoryById(id_comp, category_id);

        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error getting category"
        });
    }
    async updateCategory(req:Req, res:Res) {
        /*
        user.role
        user.id_comp
        data (everything that updates + category_id)
        */
        const category_id = Number(req.body.data?.category_id) || Number(req.params.company_id);
        if (!req.body.data) throw ErrorTypes.UnauthorizedAccess("data.category_id is required");

        if (!req.body.user) throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
        const user = req.body.user;
       
        const data = {
            name : req.body.data.name,
            desc : req.body.data.desc,
            id_comp : Number(user.id_comp),
            date_updated : new Date(),
            id_category : category_id
        }

        assertRole(user.role).isTherapistAdminOrCompany()
        const response = await this.gatewayUseCases.updateCategory(data);

        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error updating category"
        });
    }
    async getCategoriesByCompanyId(req:Req, res:Res) {
        /*
        user.role
        user.id_comp
        */
        if (!req.body.user) throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
        const user = req.body.user;
       
        const id_comp = Number(user.id_comp) // || Number(req.params.company_id);
        

        assertRole(user.role).isTherapistOrCompany()
        const response = await this.gatewayUseCases.getCategoriesByCompanyId(id_comp);

        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error getting categories"
        });
    }

    async deleteCategory(req:Req, res:Res) {
        /*
        user.role
        user.id_comp
        */
        if (!req.body.user) throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
        const user = req.body.user;
       
        const id_comp = Number(user.id_comp) // || Number(req.params.company_id);

        const category_id = Number(req.body.data?.category_id) || Number(req.params.company_id);
        if (!category_id) throw ErrorTypes.UnauthorizedAccess("category_id is required");

        assertRole(user.role).isTherapistAdminOrCompany()
        const response = await this.gatewayUseCases.deleteCategory(id_comp, category_id);

        return res.status(200).json({
            success: Boolean(response),
            message: response ? "Category " + category_id + " deleted" : "Error getting categories"
        });
    }

}

export default CategoryControllers