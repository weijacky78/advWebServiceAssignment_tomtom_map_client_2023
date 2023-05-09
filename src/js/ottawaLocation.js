
export default async () => {
    let res = await fetch("https://localhost:7777/geo/ottawa");
    return res.json();
}