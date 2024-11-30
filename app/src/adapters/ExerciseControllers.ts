import { ExerciceUseCasesInterface } from "../application/use-cases/exercise-use-cases";
import TypeHttp from "../framework/http.type"
import { DbGatewayContract } from "./DbGatewayContract.type";
import assertRole from "./helpers/assertRole.js";
import ErrorTypes from "../utils/errors/ErrorTypes.js";
class ExerciseControllers<Req extends TypeHttp["Request"], Res extends TypeHttp["Response"]>{
    private exerciseUseCases: DbGatewayContract["exerciseRepository"];

    constructor(exerciseUseCases: ExerciceUseCasesInterface) {
        this.exerciseUseCases = exerciseUseCases;
    }

    async createExercise(req:Req, res:Res) {
        /*
        user.role
        user.id_comp
        user.physio_id

        data.name
        data.desc
        data.obs
        data.video_dir
        data.id_company = user.id_comp
        data.id_category
        id_created_by = user.physio_id
        */
        if (!req.body.data) throw ErrorTypes.UnauthorizedAccess("data is required");

        const user = req.body.user;
        if (!user.role || !user.id_comp || !user.physio_id) throw ErrorTypes.UnauthorizedAccess("user.role, user.physio_id and user.id_comp is required");
        
        const data = {
            name : req.body.data.name,
            desc : req.body.data.desc,
            obs: req.body.data.obs,
            video_dir : req.body.data.video_dir,
            id_category : Number(req.body.data.id_category),
            id_company : Number(user.id_comp), 
            id_created_by : Number(user.physio_id),
            date_updated : new Date(),
        }

        assertRole(user.role).isTherapistOrTherapistAdmin()
        const response = await this.exerciseUseCases.createExercise(data);

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
        if (!req.body.user) throw ErrorTypes.UnauthorizedAccess("user.role and user.id_comp is required");
        const user = req.body.user;
       
        const id_comp = Number(user.id_comp)
        

        assertRole(user.role).isTherapistOrCompany()
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
}

export default ExerciseControllers