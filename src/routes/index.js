const {Router} = require('express')
const router = Router()
const fs = require('fs')
const uuid = require('uuid')

const booksArray = fs.readFileSync('src/books.json','utf-8');
let books = JSON.parse(booksArray);

router.get('/',(req,res)=>{
    // res.send("hola api book desde index routes")
    
    res.render('index',{
        books
    })
})
router.get('/new-entry',(req,res)=>{
    res.render('new-entry')
})
router.post('/new-entry',(req,res)=>{
    const id = uuid.v4()
    newbook = {...req.body,id}
    // console.log(newbook);
    books.push(newbook)
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json',json_books,'utf-8')
    res.redirect('/')
    // res.send('new-entry ok')
})
//min 49.0
router.get('/delete/:id', (req, res) => {
    books = books.filter(book => book.id != req.params.id);

    // saving data
    const json_books = JSON.stringify(books);
    fs.writeFileSync('src/books.json', json_books, 'utf-8');

    res.redirect('/')
})
/* router.put('/new-entry',(req,res)=>{
    res.redirect('/')
    // res.send('update ok'
}) */

module.exports = router