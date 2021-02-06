import logo from './logo.svg';
import { useState } from 'react';
import _ from 'lodash';
import './App.css';

function App() {
	let rando = _.random(1000,9999).toString();
	let randoS = rando.split("");
	const [secret,setSecret] = useState(randoS);
	const [guesses, setGuesses] = useState([]);
	const [curGuess, setCurGuess] = useState("");
	const [cows, setCows] = useState([]);
	const [bulls, setBulls] = useState([]);
	const [numsUsed, setNumsUsed] = useState([]);
	console.log(secret);

	//https://daveceddia.com/display-a-list-in-react/
	function guessesView(guesses, cows, bulls) {
		let array = [];
		for (let i = 0; i < guesses.length; i++) {
			array.push(
				<p>Guess {i}: {guesses[i]} - {bulls[i]}Bulls,{cows[i]}Cows </p>
			);
		}
		
		return (
			<div>
				{array}
			</div>
		)
	}

	let guessesV = guessesView(guesses,cows,bulls);
	function resetGame() {
		setGuesses([]);
		setCows([]);
		setBulls([]);
		let rand = _.random(1000,9999).toString();
		let randS = rand.split("")
		setSecret(randS);
		setCurGuess("");
	}

	function reset() {
		setCurGuess("");
		setNumsUsed([]);
	}

	function tryGuess() {
		console.log(curGuess);
		let guessesCur = guesses;
		if (curGuess.length != 4) {
			console.log(curGuess);
			return;
		} else {
		var guessParts = curGuess.split("");
		var b = 0;
		var c = 0;
		var i;
		for (i = 0; i < guessParts.length; i++) {
			if (guessParts[i] === secret[i]) {
				console.log(guessParts[i]);
				console.log(secret[i]);
				b++;
			} else if (secret.includes[guessParts[i]]) {
				c++;
			}
		}
		guessesCur.push(curGuess);
		setNumsUsed([]);
		setBulls(bulls.concat(b));
		setCows(cows.concat(c));
		setGuesses(guessesCur);
		console.log(guesses);
		setCurGuess("");
	}
	}

	if (bulls[bulls.length - 1] == 4) {
		return (
			<div className="App">
				<h1>You Won!</h1>
				<p>
					<button onClick={() => resetGame()}>New Game</button>
				</p>
			</div>
		);
	}

	if (guesses.length == 8) {
		return (
			<div className="App">
				<h1>You lost!</h1>
				<p>
					<button onClick={() => resetGame()}>New Game</button>
				</p>
			</div>
		);
	}

	function incrementGuess(value) {
	//	if (!numsUsed.includes(value)) {
		setNumsUsed(numsUsed.concat(value));
	//	}
		console.log(numsUsed);
	}

	function keyPress(ev) {
		let key = ev.key;
		if (key === "Enter") {
			setGuesses(guesses.concat(curGuess));
		} 
	}
	function handleCurGuess(ev) {
		let value = ev.target.value;
		console.log('val' + value);
		console.log("curGuess " + curGuess);
		let nv;
		if (value.length == 1) {
			nv = value;
		} else {
			nv = value.substring(value.length-2,value.length-1);
		}
		if (curGuess.length < 4) {
			switch(nv) {
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					console.log("Pressed");
					setCurGuess(value);
					console.log(numsUsed);
					break;
				case "Enter":
				default:
					break;
			}
		}
	}
// input in html is from lecture 4 notes
	return (
    		<div className="App">
     			<h1>{numsUsed}</h1>	
			<input type="text" onChange={handleCurGuess} onKeyEvent={keyPress} />
			<p>
				<button onClick={() => tryGuess()}>Guess</button>
				<button onClick={() => reset()}>Reset</button>
				<button onClick={() => resetGame()}>New Game</button>
			</p>
			<p id="Guesses">{guessesV}</p>	
				
    		</div>
  );
}

export default App;
