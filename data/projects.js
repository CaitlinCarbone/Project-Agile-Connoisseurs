import { projects } from "../config/mongoCollections";
import validation from "../utils/validation";


const projectsCollection = await projects();

const exportedMethods = {
    async createProject(projectName, projectDescription, projectType, projectStatus, projectBudget, projectStartDate, projectEndDate, requiredDocuments, customer) {
        projectName = validation.checkString(projectName, "Project Name");
        projectDescription = validation.checkString(projectDescription, "Project Description");
        projectType = validation.checkString(projectType, "Project Type");
        projectStatus = validation.checkString(projectStatus, "Project Status");
        projectBudget = validation.checkNumber(projectBudget, "Project Budget");
        projectStartDate = validation.checkString(projectStartDate, "Project Start Date");
        projectEndDate = validation.checkString(projectEndDate, "Project End Date");
        
        //need to add more error checking to required documents but whatever for now
        if(!Array.isArray(requiredDocuments)) throw "Required Documents must be an array";
        for(let i = 0; i < requiredDocuments.length; i++) {
            if(typeof requiredDocuments[i] !== "string") throw "Required Documents must be an array of strings";
        }

        //could add a check for customer object... figure that out later

        
        let project = {
            projectName: projectName,
            projectDescription: projectDescription,
            projectType: projectType,
            projectStatus: projectStatus,
            projectBudget: projectBudget,
            projectStartDate: projectStartDate,
            projectEndDate: projectEndDate,
            requiredDocuments: requiredDocuments,
            customer: customer,
            projectTasks: []
        };

        const newInsertInformation = await projectsCollection.insertOne(project);
        if (!newInsertInformation.insertedId) throw "Insert failed!";
        project._id = newInsertInformation.insertedId;
        return await getProjectById(newInsertInformation.insertedId.toString());
    },

    async getProjectById(id) {
        id = validation.checkId(id);
        const project = await projectsCollection.findOne({ _id: id });
        if (!project) throw "Project not found";
        return project;
    },

    //need to create task document
    async addTaskToProject(projectId, taskId) {
        projectId = validation.checkId(projectId);
        taskId = validation.checkId(taskId);

        const project = this.getProjectById(projectId);
        if (!project) throw "Project not found";

        project.projectTasks.push(taskId);
        projectsCollection.updateOne({ _id: projectId }, { $set: project });
        return await this.getProjectById(projectId);
    }
}

export default exportedMethods;