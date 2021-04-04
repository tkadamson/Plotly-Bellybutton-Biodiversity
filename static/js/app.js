d3.json('samples.json').then(function(data) {

console.log(data);

//Read demographic and sample data
let demographics = data.metadata;
console.log(demographics);

let samples = data.samples;
console.log(samples);

//Set an id (temporarily static, will use event listener later)
let id = 940;
let strID = String(id);

//Filter the json data to match the id
let personalData = demographics.filter(function (person) {
   return person.id === id;
});

 console.log(personalData);

 let sampleData = samples.filter(function (person) {
    return person.id === strID;
 });
 
  console.log(sampleData);

});