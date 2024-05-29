const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());



app.get("/train/:id/:tmp", async (req, res) => {
    try{
        const {id, tmp}  = req.params;
        
        const allSheet1 = await pool.query(
            "SELECT goal, time FROM train where start = $1 and time <= $2 ;", 
            [id, tmp]
        );
        res.json(allSheet1.rows);
    } catch(err){
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
});