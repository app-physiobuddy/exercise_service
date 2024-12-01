//getPlanByIdAndPatientId
export default function getPlanByIdAndPatientId(Repository) {
    return async (id_pac, id_plan) => {
        return await Repository.getPlanByIdAndPatientId(id_pac, id_plan);
    };
}
