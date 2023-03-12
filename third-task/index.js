const app = require('express')();
const fs = require('fs');
const bodyparser = require('body-parser');

const PORT = 8080;

var data = JSON.parse(fs.readFileSync('./data.json'));
const posts = data.posts;
const users = data.users;

app.use(bodyparser.json());

app.get('/users', (req, res) => {
    return res.status(200).send(users);
})

app.get('/posts', (req, res) => {
    return res.status(200).send(posts);
})

app.put('/users/editUser', (req, res) => {
    let id = req.body.id;
    let newName = req.body.name;
    let newEmail = req.body.email;
    
    fs.readFile('./data.json', (err, data) => {
        if(err)
            return res.status(404).send(err);
        
        data = JSON.parse(data);
        let user = data.users.find((user) => user.id == id);

        if(user) {
            user.name = newName;
            user.email = newEmail;
            fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
                return res.status(200).send("New user data set");
            })
        }
        else
            return res.status(404).send("UserID not found");
    });
})


app.post('/users/addUser', (req, res) => {
    let id = users[users.length -1].id + 1;
    let name = req.body.name;
    let email = req.body.email;

    let newUser = {
        id: id,
        name: name,
        email: email
    }

    data.users.push(newUser);

    try {
        fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
        res.status(200).send("New user added");
    }
    catch(err)
    {
        res.status(400).send("Bad request");
    }
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });