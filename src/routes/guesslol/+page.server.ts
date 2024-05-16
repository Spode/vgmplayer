import { fail } from "@sveltejs/kit"

let randomChamp, randomChampData, randomSkinIndex, randomChampSkin, champArray;

let champData = await getChampData();

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function loadNewChampion() {
	console.log('loading new');

	champArray = Object.keys(champData);
	randomChamp = champArray[Math.floor(Math.random() * champArray.length)];
	randomChampData = champData[randomChamp];
	randomSkinIndex = getRandomInt(1, randomChampData.skins.length)
	console.log("skinindex", randomSkinIndex);
	randomChampSkin = randomChampData.skins[randomSkinIndex];


	console.log("new answer", randomChamp, randomChampSkin);

	return randomChampSkin
}

export const actions: Actions = {
	guessChamp: async ({ request }) => {
		const data = await request.formData();
		const guess = data.get('guess')

		return { guess }

	},
	loadNew: async (event) => {

		return {
			status: 200, randomChamp, randomChampSkin
		}
	}

}



async function getChampData() {

	const res = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
	const versions = await res.json();
	const latestVersion = versions[0];

	const allChampsRes = await fetch(`http://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`)
	let champs = await allChampsRes.json()
	let champKeys = Object.keys(champs.data)

	let champDetails = {};


	await Promise.all(
		champKeys.map(async (champ) => {
			const champRes = await fetch(`http://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion/${champ}.json`)

			let champDetailData = await champRes.json()
			champDetails[champ] = champDetailData.data[champ]


		})
	)
	return await champDetails;
}
