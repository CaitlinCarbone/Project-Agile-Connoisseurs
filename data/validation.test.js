const validation = require("./validation");

    describe("Validation tests", () => {
        test('checkID is valid', () => {
        expect(validation.checkId('54edb381a13ec9142b9bb353')).toBe('54edb381a13ec9142b9bb353');
        });
    })

    //checkEmail tests
    describe("Validation tests", () => {
        test('checkEmail is not valid because it is empty', () => {
        
        expect(() => {validation.checkEmail('')}).toThrow("Error: You must provide an email to search for");
        });
    })

    describe("Validation tests", () => {
        test('checkEmail is not valid because it is not a string', () => {
        
        expect(() => {validation.checkEmail(123)}).toThrow("Error: email must be a string");
        });
    })

    describe("Validation tests", () => {
        test('checkEmail is not valid because it is not proper email form', () => {
        
        expect(() => {validation.checkEmail('test@test')}).toThrow("Error: invalid email");
        });
    })

    describe("Validation tests", () => {
        test('checkEmail is valid', () => {
        expect(validation.checkEmail('test@gmail.com')).toBe('test@gmail.com');
        });
    })

    //checkPassword Tests
    describe("Validation tests", () => {
        test('checkPassword is not 6 characters long', () => {
        
        expect(() => {validation.checkPassword('weak')}).toThrow("Password must be at least 6 characters long, and not contain any whitespace characters");
        });
    })

    describe("Validation tests", () => {
        test('checkPassword is valid', () => {
        expect(validation.checkPassword('GoodPassword1')).not.toBe("Password must be at least 6 characters long, and not contain any whitespace characters");
        });
    })

