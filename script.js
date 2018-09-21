var selectHandle = document.getElementById('batch');
var btnHandle = document.getElementById('btn');
var rotateHandle = document.getElementById('rotate');
var podiumWheel;
var result = [];
var parts = [];
var style =['#FF3B58', '#79D3B1', '#FEF027', '#E94E77', '#3A8ECF', '#F7752C', '#EB007F', '#DE000F', '#31AE88','#33E46D','#CDFC43','#FF5039','#eae56f','#89f26e']

window.addEventListener('load', function(){
  axios.get('http://localhost:3000/batches').then((response) => {
    let batches = response.data;
    batches.forEach(function(batch){
        var optionHandle = document.createElement('option');
        var optionHandleText = document.createTextNode(batch.name);
        optionHandle.setAttribute("value", batch._id)
        optionHandle.appendChild(optionHandleText);
        selectHandle.appendChild(optionHandle);
    })
  })
})

selectHandle.addEventListener('change', function(){
  result = [];
  parts = [];
  axios.get(`http://localhost:3000/batches/${selectHandle.value}`).then((response) => {
    let batch = response.data;
  batch.students.forEach((student) => {
    if(selectHandle.value == student.batches[student.batches.length-1]){
      result.push(student.name);
    }
  })

  result.forEach(function(result, i){
    parts.push({'fillStyle' : style[i], 'text' : result})
  })

  podiumWheel = new Winwheel({
    'numSegments' : result.length,
    'outerRadius' : 170,
    'segments' : parts,
    'animation' : {
      'type': 'spinToStop',
      'duration': 10,
      'callbackFinished': 'message()',
      'callbackAfter' : 'targetIndicator()'
    }
  });
}).catch((err) => {
  console.log(err);
})
})

function message(){
  var selectedPerson = podiumWheel.getIndicatedSegment();
  alert("Person selected :" + selectedPerson.text);
  podiumWheel.stopAnimation(false);
  podiumWheel.rotationAngle = 0;
  podiumWheel.draw();
  targetIndicator();
}

targetIndicator();
function targetIndicator(){
  var ctx = podiumWheel.ctx;
  ctx.strokeStyle = 'navy';
  ctx.fillStyle = 'red';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(170, 0);
  ctx.lineTo(230, 0);
  ctx.lineTo(200, 40);
  ctx.lineTo(171, 0);
  ctx.stroke();
  ctx.fill();
}
