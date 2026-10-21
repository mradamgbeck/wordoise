import fs from 'fs';

export default function getWordOfSize(size: number) {
    var words = fs.readFileSync("./every-english-word.txt", "utf-8").split(/\n|\r/g);
    var list = words.filter((word) => word.length === size);
    return list[Math.floor(Math.random() * list.length)]
}