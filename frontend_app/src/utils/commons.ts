// [[1,2], [1, 3, 4, 3], [3, 4]];
// [[[1,2], [1, 3, 4, 3], [3, 4]]]
export const flattenArray = (testInputArray: any) => {
    return testInputArray.reduce((init: string[], value: number[] | number) => {
        return init.concat(Array.isArray(value) ? flattenArray(value) : value);
    }, []);
};