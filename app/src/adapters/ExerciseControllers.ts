import { ExerciceUseCasesInterface } from "../application/use-cases/exercise-use-cases";
import TypeHttp from "../framework/http.type"
import assertRole from "./helpers/assertRole.js";
import ErrorTypes from "../utils/errors/ErrorTypes.js";
class ExerciseControllers<Req extends TypeHttp["Request"], Res extends TypeHttp["Response"]>{
    private exerciseUseCases: ExerciceUseCasesInterface

    constructor(exerciseUseCases: ExerciceUseCasesInterface) {
        this.exerciseUseCases = exerciseUseCases;
    }

    async createExercise(req:Req, res:Res) {
        
        const id_comp = Number(req.params.user_id)
        if (!id_comp) throw ErrorTypes.UnauthorizedAccess("user_id is required");
        if (!req.body.data) throw ErrorTypes.UnauthorizedAccess("data is required");

        
        const data = {
            name : req.body.data.name,
            desc : req.body.data.desc,
            obs: req.body.data.obs,
            video_dir : req.body.data.video_dir, // pass to video_upload service
            id_category : Number(req.body.data.id_category),
            id_company : id_comp, 
            id_created_by : Number(req.body.data.physio_id),
            date_updated : new Date(),
        }


        const response = await this.exerciseUseCases.createExercise(data);

        // se ok, faz upload do video

        return res.status(201).json({
            success: response,
            message : response ? "New exercise created" : "Error creating exercise"
        });
    }
    async getExercisesByCompanyId(req:Req, res:Res) {
         /*
        user.role
        user.id_comp
        */
        const id_comp = Number(req.params.user_id)
        if (!id_comp) throw ErrorTypes.UnauthorizedAccess("user_id is required");
        


        const response = await this.exerciseUseCases.getExercisesByCompanyId(id_comp);

        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error getting exercises"
        });
    }
    async getExerciseById(req:Req, res:Res) {
        /*
       user.role
       user.id_comp
       data.id_exercise
       */
       if (!req.body.user) throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
       if (!req.body.data) throw ErrorTypes.UnauthorizedAccess("data is required");

       const user = req.body.user;
       const id_comp = Number(user.id_comp)
       const id_exercise = Number(req.body.data.id_exercise)
      
       

       assertRole(user.role).isTherapistOrCompany()
       const response = await this.exerciseUseCases.getExerciseById(id_comp, id_exercise);

       return res.status(200).json({
           success: Boolean(response),
           message: response ? response : "Error getting exercise"
       });
   }
   async updateExercise(req:Req, res:Res) {
    /*
    user.role
    user.id_comp
    data (everything that updates + category_id)
    */
    const id_exercise = Number(req.body.data?.id_exercise) || Number(req.params.id_exercise);
    if (!req.body.data) throw ErrorTypes.UnauthorizedAccess("data.id_exercise is required");

    if (!req.body.user) throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
    const user = req.body.user;
   
    const data = {
        id_exercise : id_exercise,
        name : req.body.data.name,
        desc : req.body.data.desc,
        obs: req.body.data.obs,
        video_dir : req.body.data.video_dir,
        id_category : Number(req.body.data.id_category),
        id_company : Number(user.id_comp),
        date_updated : new Date(),
    }

    assertRole(user.role).isTherapistAdminOrCompany()
    const response = await this.exerciseUseCases.updateExercise(data);

    return res.status(200).json({
        success: Boolean(response),
        message: response ? response : "Error updating exercise"
    });
}
async deleteExercise(req:Req, res:Res) {
    /*
    user.role
    user.id_comp
    data (is_delete:true, id_exercise)
    */
    const id_exercise = Number(req.body.data?.id_exercise) || Number(req.params.id_exercise);
    if (!req.body.data) throw ErrorTypes.UnauthorizedAccess("data.id_exercise is required");

    if (!req.body.user) throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
    const user = req.body.user;
   

    assertRole(user.role).isTherapistAdminOrCompany()
    console.log(id_exercise, user.id_comp)
    const response = await this.exerciseUseCases.deleteExercise(user.id_comp, id_exercise);

    return res.status(200).json({
        success: Boolean(response),
        message: response ? "Exercise deleted" : "Error deleting exercise"
    });
}
}

export default ExerciseControllers