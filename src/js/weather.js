export default async () => {
    let res = await fetch("https://localhost:7777/weather");
    return res.json();
}