import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host:"focus-fitness.cr4wf0n6ltdx.us-west-2.rds.amazonaws.com",
    user:"admin",
    password:"password",
    database:"focusFitness"
})


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("HEllo this is the backend!")
})

app.get("/books",(req,res)=>{
    const q = "SELECT * FROM focusFitness.books;"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO focusFitness.books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]


    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json('Book has been added successfully')
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookID = req.params.id
    const q = "DELETE FROM focusFitness.books WHERE id = ?"
    db.query(q,[bookID],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted!")
    })
})

app.put("/books/:id",(req,res)=>{
    const bookID = req.params.id
    const q = "Update focusFitness.books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ? "

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q,[...values,bookID],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated!")
    })
})


app.listen(3000, () =>{
    console.log("Connected!")
})