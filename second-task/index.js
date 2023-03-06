const app = require('express')();
const fs = require('fs');
const PORT = 8080;

var data = JSON.parse(fs.readFileSync('./data.json'));
const posts = data.posts;
const users = data.users;


app.get('/users/:id', (req, res) => {
    let id = req.params;

    for(let user of users){
        if(user.id == id){
            return res.status(200).send(user);
        }
    }
    res.status(404).send("User not found");
})

app.get('/posts/:id, (req, res) => {
    let id = req.params;

    for(let post of posts){
        if(post.id == id){
            return res.status(200).send(post);
        }
    }
    res.status(404).send("Post not found");
})

app.get('/posts/:datumOd&:datumDo', (req, res) => {
    let startDate = new Date(req.params.datumOd);
    let stopDate = new Date(req.params.datumDo);
    let postsBetween = [];

    for(let post of posts){
        let postTime = new Date(post.last_update)
        if(postTime.getTime() < stopDate.getTime() && postTime.getTime() > startDate.getTime()){
            postsBetween.push(post);
        }
    }

    if(postsBetween.length != 0){
        res.status(200).send(postsBetween);
    }
    else{
        res.status(404).send("Posts not found");
    }
})

app.post('/users/:userID&:noviEmail', (req, res) => {
    let id = req.params.userID;
    let newEmail = req.params.noviEmail;

    data.users.forEach((user) => {
        if(user.id == id){
            user.email = newEmail;
            try{
                fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
                return res.status(200).send("New e-mail set");
            }
            catch(err){
                return res.status(404).send("UserID not found");
            }
        }
    })
})

app.put('/posts/:userID&:title&:body', (req, res) => {
    let now = new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0];
    let userId = parseInt(req.params.userID);
    let id = posts[posts.length -1].id + 1;

    let newPost = {
        id : id,
        title : req.params.title,
        body : req.params.body,
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