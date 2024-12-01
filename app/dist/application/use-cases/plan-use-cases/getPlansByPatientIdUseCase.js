export default function getPlansByPatientId(Repository) {
    return async (id_pac) => {
        console.log("getPlansByPatientId use case called.");
        return await Repository.getPlansByPatientId(id_pac);
    };
}
