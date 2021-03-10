const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: '4427d1e22003495cb6bf652565c79661'
});

const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('Unable fetch API.'))
}
module.exports = {
  handleApiCall: handleApiCall
};