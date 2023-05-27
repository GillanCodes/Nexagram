export const isEmpty = (value:any) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};

export const convertDatetoTime = (date:string) => {
    var timesptamp = new Date(date).getTime();
    return timesptamp;
}