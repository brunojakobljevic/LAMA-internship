const app = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');

const PORT = 8080;

var data = JSON.parse(fs.readFileSync('./data.json'));
const posts = data.posts;
const users = data.users;

app.use(bodyparser.json());

app.get('/users/:id', (req, res) => {
    let id = req.params;

    for(let user of users)
        if(user.id == id)
            return res.status(200).send(user);

    res.status(404).send("User not found");
})

app.get('/posts/:id', (req, res) => {
    let id = req.params;

    for(let post of posts)
        if(post.id == id)
            return res.status(200).send(post);
        
    res.status(404).send("Post not found");
})

app.get('/posts', (req, res) => {
    let startDate = new Date(req.params.datumOd).toJSON().slice(0,10);
    let stopDate = new Date(req.params.datumDo).toJSON().slice(0,10);

    if(startDate > stopDate) 
        return res.status(400).send('Wrong date range');

    fs.readFile(__dirname + '/' + 'data.json', (err, data) => {
        if(err) 
            console.log(err);

        let allData = JSON.parse(data);
        let arr = [];

        for (let i = 0; i < allData.posts.length; i++)
            if(allData.posts[i]['last_update'] > startDate && allData.posts[i]['last_update'] < endDate)
                arr.push(allData.posts[i]);
        
        res.end(JSON.stringify(arr));
    });
})

app.post('/users/changeEmail', (req, res) => {
    let id = req.body.userID;
    let newEmail = req.body.noviEmail;

    fs.readFile('./data.json', (err, data) => {
        if(err)
            return res.status(404).send(err);
        
        data = JSON.parse(data);
        const user = data.users.find((user) => user.id == id);
        if(user){
            user.email = newEmail;
            fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
                return res.status(200).send("New e-mail set");
            })
        }
        else
            return res.status(404).send("UserID not found");
    });
})

app.put('/posts/addPost', (req, res) => {
    let now = new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0];
    let userId = parseInt(req.body.userID);
    let id = posts[posts.length -1].id + 1;

    let newPost = {
        id : id,
        title : req.body.title,
        body : req.body.body,
        user_id : userId,
        last_update : now
    }

    data.posts.push(newPost);
    
    try {
        fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
        res.status(200).send("New post added");
    }
    catch(err)
    {
        res.status(400).send("Bad request");
    }
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });