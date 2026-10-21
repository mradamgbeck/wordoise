import cn from "clsx";

type GuessRowProps = { word: String, guess: String }
type WordLetter = {
    occurrences: number,
    correctGuesses: number,
    misplacedGuesses: number
}
type GuessLetter = {
    letter: string,
    shouldBeGreen: boolean,
    shouldBeYellow: boolean
}

export default function GuessRow(props: GuessRowProps) {
    const wordArray = [...props.word.toUpperCase()];
    const guessArray = [...props.guess.toUpperCase()];
    var wordLetterSet = new Map<string, WordLetter>();
    var guessLetterMap = new Map<number, GuessLetter>();
    createWordLetterSet()

    return props.guess ? rowWithGuess(guessLetterMap, wordArray, guessArray) : blankRow(wordArray)

    function createWordLetterSet() {
        wordArray.forEach((wordLetter) => {
            const existingEntry = wordLetterSet.get(wordLetter);
            wordLetterSet.set(wordLetter, {
                occurrences: (existingEntry?.occurrences ?? 0) + 1,
                correctGuesses: 0,
                misplacedGuesses: 0
            });
        });

        guessArray.forEach((guessLetter, index) => {
            guessLetterMap.set(index, {
                letter: guessLetter,
                shouldBeGreen: false,
                shouldBeYellow: false
            });
        });

        guessArray.forEach((guessLetter, index) => {
            const wordStats = wordLetterSet.get(guessLetter);
            const guessStats = guessLetterMap.get(index);

            if (guessLetter === wordArray[index]) {
                if (wordStats) wordStats.correctGuesses += 1;
                if (guessStats) guessStats.shouldBeGreen = true;

            } else if (wordArray.includes(guessLetter) && occurrencesRemain(guessLetter)) {
                if (wordStats) wordStats.misplacedGuesses += 1;
                if (guessStats) guessStats.shouldBeYellow = true;
            }
        });
    }

    function occurrencesRemain(guessLetter: string) {
        const letterStats = wordLetterSet.get(guessLetter);
        if (!letterStats) return false;
        return letterStats.occurrences > letterStats.correctGuesses + letterStats.misplacedGuesses;
    }
}

function rowWithGuess(guessLetterSet: Map<number, GuessLetter>, wordArray: string[], guessArray: string[]) {
    return guessArray.map((letter, index) => {
        return <div key={letter + index} className={cn("flex-row", "rounded-lg", "p-5", "w-20", "h-20",
            getLetterBoxColor(guessLetterSet, index)
        )}>
            <p className="text-center text-3xl font-bold text-white">
                {letter}
            </p>
        </div>;
    });
}

function blankRow(wordArray: string[]) {
    return wordArray.map((letter, index) => {
        return <div key={letter + index} className="flex-row p-5 rounded-lg bg-slate-700 w-20 h-20">
        </div>;
    });
}

function getLetterBoxColor(guessLetterSet: Map<number, GuessLetter>,index: number): import("clsx").ClassValue {
    return guessLetterSet.get(index)?.shouldBeGreen
        ? "bg-green-700"
        : guessLetterSet.get(index)?.shouldBeYellow
            ? "bg-yellow-500"
            : "bg-slate-700";
}