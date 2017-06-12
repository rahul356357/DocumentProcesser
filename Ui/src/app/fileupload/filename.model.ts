export class Filename {
    constructor(
        public filename: string, 
        public filepath: string, 
        public success:boolean,
        public files:Array<String>
        ){}
}