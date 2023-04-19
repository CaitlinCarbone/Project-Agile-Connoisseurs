const validation = require("../utils/validation");

//task isn't stored in database, it's just a subdocument in the project document
const exportedMethods = {
  createTask(
    taskName,
    taskDescription,
    taskType,
    taskStatus,
    taskBudget,
    taskStartDate,
    taskEndDate
  ) {
    taskName = validation.checkString(taskName, "Task Name");
    taskDescription = validation.checkString(
      taskDescription,
      "Task Description"
    );
    taskType = validation.checkString(taskType, "Task Type");
    taskStatus = validation.checkString(taskStatus, "Task Status");
    taskBudget = validation.checkNumber(taskBudget, "Task Budget");
    taskStartDate = validation.checkString(taskStartDate, "Task Start Date");
    taskEndDate = validation.checkString(taskEndDate, "Task End Date");

    let task = {
      taskName: taskName,
      taskDescription: taskDescription,
      taskType: taskType,
      taskStatus: taskStatus,
      taskBudget: taskBudget,
      taskStartDate: taskStartDate,
      taskEndDate: taskEndDate,
    };

    return task;
  },

  //need to create more methods for tasks
  //edit, delete, etc.
};

module.exports = exportedMethods;
