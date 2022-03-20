import React from "react";

import Text from "./Text.jsx";

const random = max => Math.floor(Math.random() * max);

export default function Meme() {
	let [formData, setFormData] = React.useState({
		value: "",
		randomImg: "",
		altImg: ""
	});
	let [allMemes, setAllMemes] = React.useState([]);
	let [allTexts, setAllTexts] = React.useState([]);

	React.useEffect(() => {
		fetch("https://api.imgflip.com/get_memes")
			.then(resAPI => resAPI.json())
			.then(res => {
				const memesAPI = res.data.memes;
				setAllMemes(memesAPI)
				setFormData(prevFormData => ({
					...prevFormData,
					randomImg: memesAPI[random(memesAPI.length)].url,
					altImg: memesAPI[random(memesAPI.length)].name
				}));
			});
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
		setAllTexts([]);
		const newMeme = allMemes[random(allMemes.length)];
		setFormData(prevFormData => ({
			...prevFormData,
			randomImg: newMeme.url,
			altImg: newMeme.name
		}));
	}

	const textsElements = allTexts.map((content, id) => <Text key={id} text={content} />);
	
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
					<button className="plus">+</button>
				</form>
				<button className="submit" onClick={handleNewMeme}>Get a new meme</button>
			</div>
			<div className="meme">
				<img src={formData.randomImg} alt={formData.altImg} />
				{textsElements}
			</div>
		</main>
	);
}