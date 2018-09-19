var h2Handle = document.getElementById('result');
var btnHandle = document.getElementById('btn');

btnHandle.addEventListener('click', function(){
  h2Handle.innerHTML = ""
  axios.get('http://localhost:3000/students').then((response) => {
    let students = response.data;
    var result = []
    students.forEach((student) => {
      result.push(student.name);
    })
    let text = document.createTextNode(result[Math.floor(Math.random()*result.length)])
    h2Handle.appendChild(text)

  }).catch((err) => {
    console.log(err);
  })
})
