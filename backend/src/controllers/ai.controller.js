const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    console.log("Request Body:", req.body);
    
    const { code, language } = req.body;
    if (!code) {
        return res.status(400).send("Code is required");
    }
    if (!language) {
        return res.status(400).send("Language selection is required");
    }

    const response = await aiService(code, language);
    res.send(response);
};
