export default async function fetchTime(): Promise<any> {
    try{
        return await (await fetch("http://localhost:3000/tmp")).json();
    }   
    catch (e){
        console.error(e);
        return null;
    } 
}