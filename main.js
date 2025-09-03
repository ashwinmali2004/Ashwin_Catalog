const fs = require("fs");

function parseRootValue(numberStr, base) {
  return parseInt(numberStr, base);
}

function buildPolynomialCoefficients(roots) {
  let coefficients = [1]; 

  for (let root of roots) {
    const updatedCoefficients = Array(coefficients.length + 1).fill(0);

    for (let i = 0; i < coefficients.length; i++) {
      updatedCoefficients[i] += coefficients[i];
      updatedCoefficients[i + 1] -= coefficients[i] * root;
    }

    coefficients = updatedCoefficients;
  }

  return coefficients.reverse(); 
}

function processTestCase(testData) {
  const requiredRoots = testData.keys.k;
  const allRoots = [];

  for (let entry of Object.keys(testData)) {
    if (entry === "keys") continue;

    const base = parseInt(testData[entry].base, 10);
    const valueStr = testData[entry].value;
    const decimalValue = parseRootValue(valueStr, base);

    allRoots.push(decimalValue);
  }

  const selectedRoots = allRoots.slice(0, requiredRoots - 1);
  return buildPolynomialCoefficients(selectedRoots);
}

function runSolver() {
  const fileContent = fs.readFileSync("testcases.json", "utf8");
  const testCases = JSON.parse(fileContent);

  for (let caseId of Object.keys(testCases)) {
    const coefficients = processTestCase(testCases[caseId]);
    console.log(`Test Case ${caseId}: [ ${coefficients.join(" ")} ]`);
  }
}

runSolver();