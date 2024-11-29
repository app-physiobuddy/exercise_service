import assertRole from "./helpers/assertRole.js";
import ErrorTypes from "../utils/errors/ErrorTypes.js";
class ExerciseControllers {
    constructor(exerciseUseCases) {
        this.exerciseUseCases = exerciseUseCases;
    }
    async createExercise(req, res) {
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
        if (!req.body.data)
            throw ErrorTypes.UnauthorizedAccess("data is required");
        const user = req.body.user;
        if (!user.role || !user.id_comp || !user.physio_id)
            throw ErrorTypes.UnauthorizedAccess("user.role, user.physio_id and user.id_comp is required");
        const data = {
            name: req.body.data.name,
            desc: req.body.data.desc,
            obs: req.body.data.obs,
            video_dir: req.body.data.video_dir,
            id_category: Number(req.body.data.id_category),
            id_company: Number(user.id_comp),
            id_created_by: Number(user.physio_id),
            date_updated: new Date(),
        };
        assertRole(user.role).isTherapistOrTherapistAdmin();
        const response = await this.exerciseUseCases.createExercise(data);
        return res.status(201).json({
            success: response,
            message: response ? "New exercise created" : "Error creating exercise"
        });
    }
}
export default ExerciseControllers;
