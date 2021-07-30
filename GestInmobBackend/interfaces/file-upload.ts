export interface IfileUpload {
    name:string,
    data:any,
    size:number,
    encoding:string,
    tempFilePath:string,
    truncated: boolean,
    mimetype:string,
    md5:string,
    mv:Function
}