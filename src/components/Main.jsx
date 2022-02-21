import React from "react";

export default function Meme() {
	let [formData, setFormData] = React.useState({
		topText: "",
		bottomText: "",
		randomImg: "http://i.imgflip.com/1bij.jpg",
		altImg: "One Does Not Simply"
	});

	let [allMemes, setAllMemes] = React.useState([]);

	React.useEffect(() => {
		fetch("https://api.imgflip.com/get_memes")
			.then(res => res.json())
			.then(dataAPI => setAllMemes(dataAPI.data.memes));
	}, [])

	function handleChange(event) {
		let {name, value} = event.target;
		if (name === "topText" || name === "bottomText") {
			setFormData(prevFormData => ({
				...prevFormData,
				[name]: value
			}));
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		const randIndex = Math.floor(Math.random() * allMemes.length);
		setFormData(prevFormData => (
			{
				...prevFormData,
				randomImg: allMemes[randIndex].url,
				altImg: allMemes[randIndex].name
			}
		));
	}
	
	return (
		<main>
			<form onSubmit={handleSubmit}>
				<div className="input-fields">
					<input
						type="text"
						name="topText"
						placeholder="Top text"
						value={formData.topText}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="bottomText"
						placeholder="Bottom text"
						value={formData.bottomText}
						onChange={handleChange}
					/>
				</div>
				<button className="submit">
					Get a new meme image
				</button>
			</form>
			<div className="meme">
				<img src={formData.randomImg} alt={formData.altImg} />
				{formData.topText && <span className="text top">{formData.topText}</span>}
                {formData.bottomText && <span className="text bottom">{formData.bottomText}</span>}
			</div>
		</main>
	);
}