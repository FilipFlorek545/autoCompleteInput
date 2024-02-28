

export const filterBy = (targetArr, value) => {
    targetArr.sort(function(a,b){

        const startsWithInput = (str) => str.toLowerCase().startsWith(value.toLowerCase());

        const aStartsWithInput = startsWithInput(a);
        const bStartsWithInput = startsWithInput(b);

        if(aStartsWithInput === bStartsWithInput) {
            return a.localeCompare(b);
        }
        else{
            return aStartsWithInput ? -1 : 1;
        }
    })
    return targetArr.filter(t => t.toLowerCase().includes(value.toLowerCase()));
}