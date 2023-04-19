const constDataFunctions = require("./construction");
const custDataFunctions = require("./customer");
const manDataFunctions = require("./manager");
const salesDataFunctions = require("./sales");
const projectFunctions = require("./project");

module.exports = {
    constructorData: constDataFunctions,
    customerData: custDataFunctions,
    managerData: manDataFunctions,
    salesData: salesDataFunctions,
    projectData: projectFunctions
};