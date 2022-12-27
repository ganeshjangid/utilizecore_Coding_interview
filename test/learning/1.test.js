describe('Learn Jest first', () => {
    test('First Matching test', () => {
        expect(2 * 2).toBe(4);
    })

    test('should not match', () => {
        expect(4).not.toBe(5)
    })

})
