const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

function generateHTML(data,colour) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script> 
    <style>
    .card-body{
      background-color: ${colour};
      color:white;
    }
  
    img{
      width: 200px;
      height: 200px;
      z-index: 1;
      display: block;
    }
    </style> 
    <title>Document</title>
  </head>
    <body>
      <div class="container-fluid vw-100 vh-100 bg-light">
      <!--main card body-->
          <div class="row justify-content-center">
              <div class="col-lg-8 card-body d-block border shadow rounded-lg p-3 m-3">
                  <img class="rounded-circle justify-content-center" src="${data.avatar_url}" alt="...">
                  <h2 class="text-center">Hi! </h2>
                  <h2 class="text-center"> My name is ${data.name}</h2>
                  <h4 class="text-center"> Location Git Blog</h4>
              </div>
          </div>
          <div class="row justify-content-center">
            <h3>${data.bio}</h3>
          </div>
          <div class="row justify-content-center">
              <div class="col-lg-3 card-body d-block border shadow rounded-lg p-3 m-3">
                <h2 class="text-center">Public Respositories</h2>
                <h4 class="text-center">${data.public_repos}</h4>
              </div>
              <div class="col-lg-3 card-body d-block border shadow rounded-lg p-3 m-3">
                  <h2 class="text-center">Followers</h2>
                  <h4 class="text-center">${data.followers}</h4>
                </div> 
          </div>
          <div class="row justify-content-center">
              <div class="col-lg-3 card-body d-block border shadow rounded-lg p-3 m-3">
                <h2 class="text-center">Github Stars</h2>
                <h4 class="text-center">${data.followers}</h4>
              </div>
              <div class="col-lg-3 card-body d-block border shadow rounded-lg p-3 m-3">
                  <h2 class="text-center">Following</h2>
                  <h4 class="text-center">${data.following}</h4>
                </div> 
          </div>
      </div>
  </body>
  </html>`
}

function promptUser() {
  inquirer
    .prompt([
      {
        message: "Enter your GitHub username:",
        name: "username"
      },
      {
        name: "colour",
        message: "Enter your favourite colour."
      }
    ])
    .then(function ({username,colour}) {
      const queryUrl = `https://api.github.com/users/${username}`;

      axios
        .get(queryUrl)
        .then(function (res) {
          console.log(colour);
          const profile = generateHTML(res.data,colour);

          fs.writeFile("profile.html", profile, function (err) {
            if (err) {
              throw err;
            }

            console.log('Saved html');
          });
        });
    })
  //   .then(() => {
  //     /* read from file system */
  //     var html = fs.readFileSync('./index.html', 'utf8');
  //     var options = { format: 'Letter' };
  //     /* convert to pdf */
  //     pdf.create(html, options).toFile('./touchdown.pdf', function(err, res) {
  //         if (err) return console.log(err);
  //         console.log(res);
  //       });
  // });

}

promptUser();