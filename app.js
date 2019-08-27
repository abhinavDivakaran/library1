const Express = require('express');

const Mongoose=require('mongoose');

var request=require('request');

var bodyparser=require('body-parser');

var app = new Express();

app.set('view engine','ejs');

app.use(Express.static(__dirname+"/public"));

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:true}));

const add=Mongoose.model("bookdetails",
    {
        title:String,
        picture:String,
        auther:String,
        publisher:String,
        price:String

    }


);

Mongoose.connect("mongodb://localhost:27017/librarydb");

app.get('/addbook',(req,res)=>{
    res.render("addbook");
});

app.post('/addbookapi',(req,res)=>{

    console.log(req.body);

    var libraryobj=new add(req.body);
    var value=libraryobj.save((error,data)=>{
    });
});

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

// book=[{
//     'title':'The Wings Of Fire',
//     'picture':'/images/apj.jpg',
//     'author':'A P J Abdul Kalam',
//     'publisher':'Universities Press',
//     'price':230,
// },{
//     'title':'Kayar (malayalam)',
//     'picture':'/images/kayar.jpg',
//     'author':'Takazhi Sivasankaran',
//     'publisher':'DC Books (malayalam)',
//     'price':190,
// },{
//     'title':'Harry Potter',
//     'picture':'/images/hary.jpg',
//     'author':'J K Rowling',
//     'publisher':'Bloomsbury (UK)',
//     'price':700,
// }];


app.get('/',(req,res)=>{
    res.render('index',{nav,title:'Library'});
});

app.get('/books',(req,res)=>{
    request(getdataapi,(error,response,body)=>{
                var book=JSON.parse(body);
        
                console.log(book)
        
                res.render('books',{book,title:'Books'});
        

            });   
  });

app.get('/authors',(req,res)=>{
    res.render('authors',{author,title:'Authors'});
});

app.get('/authorsingle/:id',(req,res)=>{
    const x= req.params.id;
    res.render('authorsingle',{author:author[x]});
});
 
app.get('/bookone',(req,res)=>{
    var y=req.query.q;
    var result=add.findOne({_id:y},(error,data)=>{
        if(error){
            throw error;
            res.send(error);
        }
        else{
            res.send(data);
        }
    });
})

const singleapi="http://localhost:3456/bookone";


app.get('/booksingle/:id',(req,res)=>{
    const x= req.params.id;
    request(singleapi+"/q="+x,(error,response,body)=>{
        var book=JSON.parse(body);
        res.render('booksingle',{books:book});
    });
   // res.render('booksingle',{books:book[x]});
});

const getdataapi="http://localhost:3456/getdata";

app.get('/view',(req,res)=>{
   
    request(getdataapi,(error,response,body)=>{
        var data=JSON.parse(body);

        console.log(data);

        res.render('books',{nav :data});


    });

});


app.get('/getdata',(req,res)=>{
    value=add.find((error,data)=>{
        if(error){
            throw error;
        }
        else{
            res.send(data);
        }
    }

    )});



app.listen(process.env.PORT || 3456,()=>{
    console.log("Working Server...::3456...");
});


