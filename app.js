import express from "express";
import { ChatGPTAPIBrowser } from "chatgptx-browser";
import dotenv from "dotenv";




dotenv.config();




const email = process.env.OPENAI_EMAIL;
const password = process.env.OPENAI_PASSWORD;


const api = new ChatGPTAPIBrowser({
    email,
    password,
    debug: false,
    minimize: true
});

await api.initSession();




const app = express();
const port = process.env.PORT;




app.post('/', express.json(), async (req, res) => 
    {
        console.log(req.body);
        try {
            let gptResponse = await api.sendMessage(req.body.message);

            
            res.status(200).send(gptResponse.response);
        }
        catch(err) {
            res.status(500).send(err.message);
        }
    }
)




app.listen(port || 8080, () => console.log(`App listening on port ${port}!`));



