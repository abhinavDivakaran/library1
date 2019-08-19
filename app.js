const Express = require('express');

var app = new Express();

app.set('view engine','ejs'); 

app.use(Express.static(__dirname+"/public"));

nav= [
        {
            link:'/books',
            title:'Books'
        },
        {
            link:'/authors',
            title:'Authors'
        }
];

book=[{
    'title':'The Wings Of Fire',
    'picture':'/images/apj.jpg',
    'author':'A P J Abdul Kalam',
    'publisher':'Universities Press',
    'price':230,
},{
    'title':'Kayar (malayalam)',
    'picture':'/images/kayar.jpg',
    'author':'Takazhi Sivasankaran',
    'publisher':'DC Books (malayalam)',
    'price':190,
},{
    'title':'Harry Potter',
    'picture':'/images/hary.jpg',
    'author':'J K Rowling',
    'publisher':'Bloomsbury (UK)',
    'price':700,
}];


app.get('/',(req,res)=>{
    res.render('index',{nav,title:'Library'});
});

app.get('/books',(req,res)=>{
    res.render('books',{book,title:'Books'});
});

app.get('/authors',(req,res)=>{
    res.render('authors',{author,title:'Authors'});
});

app.get('/authorsingle/:id',(req,res)=>{
    const x= req.params.id;
    res.render('authorsingle',{author:author[x]});
});

app.get('/booksingle/:id',(req,res)=>{

    const x= req.params.id;
    res.render('booksingle',{books:book[x]});
});


app.listen(process.env.PORT || 3456,()=>{
    console.log("Working Server...::3456...");
});


