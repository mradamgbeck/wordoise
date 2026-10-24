import getWordOfSize from "./components/dictionary";
import WordoisePuzzleComponent from "./components/wordoisePuzzle";

type PageProps = {
    searchParams: Promise<{
        puzzleSize?: string;
        maxGuesses?: string;
    }>;
};
const MAX_PUZZLE_SIZE = 25;
const MAX_MAX_GUESS_AMOUNT = 25;
const DEFAULT_PUZZLE_SIZE = "5";
const DEFAULT_MAX_GUESSES = "6";

export default async function Wordoise({ searchParams }: PageProps) {
    const params = await searchParams;
    const size = Number(params.puzzleSize);
    const maxGuesses = Number(params.maxGuesses);

    const validSettings =
        params.puzzleSize !== undefined &&
        params.maxGuesses !== undefined &&
        Number.isInteger(size) &&
        Number.isInteger(maxGuesses) &&
        size >= 1 &&
        size <= MAX_PUZZLE_SIZE &&
        maxGuesses >= 1 &&
        maxGuesses <= MAX_MAX_GUESS_AMOUNT;

    const word = validSettings ? getWordOfSize(size) : undefined;
    console.log("THE WORD IS: ", word);

    return (
        <main>
            <div className="flex-col space-y-1">
                <form method="get">
                    <div className="items-center">
                        <div className="p-1 flex-row justify-evenly items-center space-x-1">
                            <label className="text-green-500 p-3" htmlFor="puzzleSize">
                                Puzzle Size
                            </label>
                            <input
                                id="puzzleSize"
                                className="w-16 p-3"
                                type="number"
                                name="puzzleSize"
                                min="1"
                                max={MAX_PUZZLE_SIZE}
                                defaultValue={params.puzzleSize ?? DEFAULT_PUZZLE_SIZE}
                                required
                            />
                            <label className="text-green-500 p-3" htmlFor="maxGuesses">
                                Max Guesses
                            </label>
                            <input
                                id="maxGuesses"
                                className="w-16 p-3"
                                type="number"
                                name="maxGuesses"
                                min="1"
                                max={MAX_MAX_GUESS_AMOUNT}
                                defaultValue={params.maxGuesses ?? DEFAULT_MAX_GUESSES}
                                required
                            />
                            <button className="bg-green-700 rounded-md p-1" type="submit">
                                Create
                            </button>
                        </div>
                    </div>
                </form>

                {word && (
                    <WordoisePuzzleComponent
                        size={size}
                        maxGuesses={maxGuesses}
                        word={word}
                    />
                )}
            </div>
        </main>
    );
}