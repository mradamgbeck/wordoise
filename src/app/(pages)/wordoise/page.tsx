import WordoisePuzzleComponent from "./components/wordoisePuzzle";
import Form from 'next/form'

export default async function Wordoise() {
    var size = 5;
    var maxGuesses = 6;

    function updateValues(userSize: number, userMaxGuesses: number) {
        size = userSize;
        maxGuesses = userMaxGuesses;
    }

    return (
        <main>
            <div className="flex-col space-y-1">
                <Form action={""}>
                    <div className="items-center">
                        <div className="p-1">
                            <label className="text-green-500 p-3" >Puzzle Size</label>
                            <input className="w-16  p-3" type="number" name="puzzleSize" max="25" defaultValue="5" />
                            <label className="text-green-500  p-3">Max Guesses</label>
                            <input className="w-16  p-3" type="number" name="maxGuesses" max="25" defaultValue="5" />
                        </div>
                        <button className="bg-green-700 rounded-md p-1" type="submit">
                            Create
                        </button>
                    </div>
                </Form>
                <WordoisePuzzleComponent size={size} maxGuesses={maxGuesses} />

            </div>
        </main >
    );
}
