import React from "react";

import Text from "./Text.jsx";

export default function Meme() {
	let [formData, setFormData] = React.useState({
		value: "",
		randomImg: "http://i.imgflip.com/1bij.jpg",
		altImg: "One Does Not Simply"
	});

	let [allMemes, setAllMemes] = React.useState([]);

	let [allTexts, setAllTexts] = React.useState([]);

	React.useEffect(() => {
		fetch("https://api.imgflip.com/get_memes")
			.then(res => res.json())
			.then(dataAPI => setAllMemes(dataAPI.data.memes));
	}, [])

	function handleNewText(event) {
		event.preventDefault();
		if (formData.value) {
			setAllTexts(prevAllTexts => [...prevAllTexts, formData.value]);
			setFormData(prevFormData => ({
				...prevFormData,
				value: ""
			}));
		}
	}

	function handleChange(event) {
		let {name, value} = event.target;
		if (name === "text") {
			setFormData(prevFormData => ({
				...prevFormData,
				value: value
			}));
		}
	}

	function handleNewMeme() {
		const randIndex = Math.floor(Math.random() * allMemes.length);
		setAllTexts([]);
		setFormData(prevFormData => ({
			...prevFormData,
			randomImg: allMemes[randIndex].url,
			altImg: allMemes[randIndex].name
		}));
	}

	let cpt = 0;
	const textsElements = allTexts.map(content => <Text key={cpt++} text={content} />);
	
	return (
		<main>
			<div className="wrapper">
				<form onSubmit={handleNewText}>
					<input
						type="text"
						name="text"
						placeholder="Add a new text"
						value={formData.value}
						onChange={handleChange}
					/>
					<button className="plus">
						+
					</button>
				</form>
				<button className="submit" onClick={handleNewMeme}>
					Get a new meme image
				</button>
			</div>
			<div className="meme">
				<img src={formData.randomImg} alt={formData.altImg} />
				{textsElements}
			</div>
		</main>
	);
}