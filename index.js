const fs = require("fs");
const axios = require("axios");
var pdf = require('html-pdf');
const inquirer = require("inquirer");

function generateHTML(data, colour, starCount) {
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
    a{
      cursor:pointer;
      text-decoration: none;
      color:white;
    }
    img{
      width: 200px;
      height: 200px;
    }
    </style> 
    <title>Document</title>
  </head>
    <body>
      <div class="container-fluid vh-100 bg-light">
      <!--main card body-->
          <div class="row text-center">
          <div class="col-lg-9 card-body d-block border shadow rounded-lg m-3">
                  <img class="rounded-lg justify-content-center p-2" src="${data.avatar_url}" alt="...">
                  <h2> Hi! </h2>
                  <h2> My name is ${data.name}</h2>
                  <h5> Currently @ ${data.company}</h5>
                  <h6> 
                    <a class="p-3"  href="https://www.google.com/maps/place/${data.location}" target="_blank"><svg id="i-location" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                      <circle cx="16" cy="11" r="4" />
                      <path d="M24 15 C21 22 16 30 16 30 16 30 11 22 8 15 5 8 10 2 16 2 22 2 27 8 24 15 Z" />
                  </svg> ${data.location}</a>
                    <a class="p-3" href=${data.html_url} target="_blank">
                      <svg id="i-github" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32">
                        <path stroke-width="0" fill="currentColor" d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z" />
                    </svg> Git</a>
                    <a class="p-3" href=${data.blog} target="_blank">
                      <svg id="i-feed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <circle cx="6" cy="26" r="2" fill="currentColor" />
                        <path d="M4 15 C11 15 17 21 17 28 M4 6 C17 6 26 15 26 28" />
                    </svg> Blog</a>
                  </h6>
              </div>
          </div>
          <div class="row text-center">
            <h3>${data.bio}</h3>
          </div>
          <div class="row text-center">
              <div class="col-lg-4 card-body d-block border shadow rounded-lg m-3">
                <h2>Public Respositories</h2>
                <h4>${data.public_repos}</h4>
              </div>
              <div class="col-lg-4 card-body d-block border shadow rounded-lg m-3">
                  <h2>Followers</h2>
                  <h4>${data.followers}</h4>
                </div> 
          </div>
          <div class="row text-center">
              <div class="col-lg-4 card-body d-block border shadow rounded-lg m-3">
                <h2>Github Stars</h2>
                <h4>${starCount}</h4>
              </div>
              <div class="col-lg-4 card-body d-block border shadow rounded-lg m-3">
                  <h2>Following</h2>
                  <h4>${data.following}</h4>
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
        message: "Enter your favourite colour:",
        name: "colour"
      }
    ])
    .then(function ({ username, colour }) {
      const queryUrl = `https://api.github.com/users/${username}`;

      axios
        .get(queryUrl)
        .then(function (res) {
          // const starCount = (username) => {
          //   const queryUrl = `https://api.github.com/users/${username}/repos`
          //   axios
          //   .get(queryUrl)
          //   .then(function (response) {
          //      let result = response.data.map(repo => repo.stargazers_count);
          //      let count = result.reduce((a, b) => a + b, 0);
          //      console.log(count)
          //      return count;
          //     });
          // }

          const count = 4;
          const profile = generateHTML(res.data, colour, count);

          fs.writeFile("profile.html", profile, function (err) {
            if (err) {
              throw err;
            }

            console.log('Saved html');
          });
        });
    })
    .then(() => {
      /* read from file system */
      var html = fs.readFileSync('profile.html', 'utf8');
      var options = {
        format: 'Letter', 
        fitToPage: false, 
        viewportSize: {
          width: 600,
          height: 600
        },
      };
      /* convert to pdf */
      pdf.create(html, options).toFile('profile.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res);
      });
    });
}




promptUser();