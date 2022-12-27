const mathOperations = require('../../src/api/resources/learning/calculator');

describe('Calculator Test', () => {
    test('should Add 2 Number', () => {
        let result = mathOperations.sum(1, 2);

        // assert
        expect(result).toBe(3);

    })
})
