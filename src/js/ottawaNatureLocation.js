
export default async () => {
    let res = await fetch("https://localhost:7777/geo/ottawa/nature");
    return res.json();
}