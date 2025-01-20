import ErrorTypes from "../utils/errors/ErrorTypes.js";
import assertRole from "./helpers/assertRole.js";
class CategoryControllers {
    constructor(categoryUseCases) {
        this.categoryUseCases = categoryUseCases;
    }
    async createCategory(req, res) {
        const prepareCategoryData = req.body.data;
        if (!prepareCategoryData)
            throw ErrorTypes.UnauthorizedAccess("data is required");
        const id_comp = Number(req.params.user_id);
        if (!id_comp)
            throw ErrorTypes.UnauthorizedAccess("user.id is required");
        const data = {
            name: prepareCategoryData.name,
            desc: prepareCategoryData.desc,
            id_comp: id_comp,
            date_updated: new Date(),
        };
        const response = await this.categoryUseCases.createCategory(data);
        return res.status(201).json({
            success: response,
            message: response ? "Category created" : "Error creating category"
        });
    }
    async getCategoryById(req, res) {
        /*
        user.role
        user.id_comp
        data.category_id
        */
        //if (!req.body.data) throw ErrorTypes.UnauthorizedAccess("data.category_id is required");
        console.log("HERE");
        const category_id = Number(req.body.data?.category_id) || Number(req.params.company_id);
        if (!req.body.user)
            throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
        const user = req.body.user;
        const id_comp = Number(user.id_comp); // || Number(req.params.company_id);
        assertRole(user.role).isTherapistOrCompany();
        const response = await this.categoryUseCases.getCategoryById(id_comp, category_id);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error getting category"
        });
    }
    async updateCategory(req, res) {
        /*
        user.role
        user.id_comp
        data (everything that updates + category_id)
        */
        const category_id = Number(req.body.data?.category_id) || Number(req.params.category_id);
        if (!req.body.data)
            throw ErrorTypes.UnauthorizedAccess("data.category_id is required");
        if (!req.body.user)
            throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
        const user = req.body.user;
        const data = {
            name: req.body.data.name,
            desc: req.body.data.desc,
            id_comp: Number(user.id_comp),
            date_updated: new Date(),
            id_category: category_id
        };
        assertRole(user.role).isTherapistAdminOrCompany();
        const response = await this.categoryUseCases.updateCategory(data);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error updating category"
        });
    }
    async getCategoriesByCompanyId(req, res) {
        const id_comp = Number(req.params.user_id);
        const response = await this.categoryUseCases.getCategoriesByCompanyId(id_comp);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error getting categories"
        });
    }
    async deleteCategory(req, res) {
        /*
        user.role
        user.id_comp
        */
        if (!req.body.user)
            throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
        const user = req.body.user;
        const id_comp = Number(user.id_comp); // || Number(req.params.company_id);
        const category_id = Number(req.body.data?.category_id) || Number(req.params.company_id);
        if (!category_id)
            throw ErrorTypes.UnauthorizedAccess("category_id is required");
        assertRole(user.role).isTherapistAdminOrCompany();
        const response = await this.categoryUseCases.deleteCategory(id_comp, category_id);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? "Category " + category_id + " deleted" : "Error getting categories"
        });
    }
}
export default CategoryControllers;
