"use client";
import { useState } from "react";
import GuessRow from "./guessRow";

type WordoisePuzzleProps = { size: number, maxGuesses: number, word?: string }

export default function WordoisePuzzleComponent(props: WordoisePuzzleProps) {
    const word = props.word?.toUpperCase();
    const [guessInput, setGuessInput] = useState("");
    const [guesses, setGuesses] = useState<string[]>([]);

    function submitGuess(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (guessInput.length !== props.size || guesses.length >= props.maxGuesses) {
            return;
        }

        if(guessInput.toUpperCase() === word) {
            window.alert("YOU DID IT!");
            return;
        }

        if (guesses.some((guess) => guess.toUpperCase() === guessInput.toUpperCase())) {
            window.alert("already guessed!");
            return;
        }

        if(guesses.length + 1 === props.maxGuesses) {
            window.alert(`YOU LOSE! The word was: ${word}`);
        }

        setGuesses((currentGuesses) => [...currentGuesses, guessInput]);
        setGuessInput("");
    }

    const puzzleRows = Array.from({ length: props.maxGuesses }, (_, index) => {
        return <div key={index} className="flex p-0.5 space-x-1">
            <GuessRow word={word ?? ""} guess={guesses[index] ?? ""} />
        </div>;
    });

    return (<div className="flex-col justify-center space-y-1">
        <form onSubmit={submitGuess} className="flex-row justify-center items-center p-0.5 space-x-1">
            <input
                type="text"
                name="guess"
                value={guessInput}
                maxLength={props.size}
                onChange={(event) => setGuessInput(event.target.value.toUpperCase())}
                className="bg-slate-800 text-white placeholder:text-slate-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your guess..."
                disabled={guesses.length >= props.maxGuesses}
            />
            <button
                className="bg-green-700 rounded-md p-1"
                type="submit"
                disabled={guesses.length >= props.maxGuesses || guessInput.length !== props.size}
            >
                Submit
            </button>
        </form>
        {puzzleRows}
    </div>);
}