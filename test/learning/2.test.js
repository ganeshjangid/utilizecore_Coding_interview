describe('Truthy Operation', () => {
    test('should check True or false', () => {
        let name = "ganesh suthar";
        let n = null;

        expect(n).toBeNull();
        expect(name).not.toBeNull();

        // name has a valid value
        expect(name).toBeTruthy();

        // fail - as null is non success
        // expect(n).toBeTruthy();
    })

    test('should check Numerical Values', () => {
        let num1 = 100;
        let num2 = -20;

        // greater than
        expect(num1).toBeGreaterThan(80);

        // less than or equal
        expect(num2).toBeLessThan(-10);

    })

    test('should Match String', () => {

        let name = "Ganesh suthar";

        expect(name).toMatch(/Ganesh/);


    })

})
