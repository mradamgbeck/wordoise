import getWordOfSize from "./dictionary";
import GuessRow from "./guessRow";

type WordoisePuzzleProps = { size: number, maxGuesses: number }

export default function WordoisePuzzleComponent(props: WordoisePuzzleProps) {
    var word: string = getWordOfSize(props.size);
    var guesses: string[] = [];
    const puzzleRows = Array.from({ length: props.maxGuesses }, (_, index) => {
        return <div key={index} className="flex p-0.5 space-x-1">
            <GuessRow word={"aabbcc"} guess={"aabdbb"} />
        </div>;
    });
    return puzzleRows;
}