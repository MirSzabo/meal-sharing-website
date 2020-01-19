function mealsId(req, router) {
  console.log(req.param.id);
  /*document.body.innerHTML = `
  <input type="text" id_"title" name="title" placeholder="title">
  <input type="text" id_"description" name="description" placeholder="description">
  <input type="button" onclick="fetchData" value="send" >
  <p id="message"></p>
  `
}

const title = document.getElementById("title").value;
const description = document.getElementById("description").value;

const data = {
  title,
  description
}

const fetchData = () => {
  return fetch ("/meal", {
    method: "POST",
    headers: {
      "Content Type": "application/json"
    },
    body: JSON.stringify(data)
    
  })
  .then(res => {
    return res.text()
  })
  .then((text) => {
const message = document.getElementById("message")});
    message.innerHTML = text
  })
    */
}

export default mealsId;
