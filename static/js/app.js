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

  //Get individual components out of the sampleData object
  let otu_ids = sampleData[0].otu_ids.slice(0,10).reverse();
  console.log(otu_ids);

  let sample_values = sampleData[0].sample_values.slice(0,10).reverse();
  console.log(sample_values);

  let otu_labels = sampleData[0].otu_labels.slice(0, 10);
  console.log(otu_labels);

  //Use data in a trace
  let trace1 = {
      x: sample_values,
      y: otu_ids,
      text: otu_labels,
      type: "bar",
      orientation: "h"
  };

  let layout = {
    title: "Most Commonly Found OTU's",
    xaxis: {title: "OTU Count"},
    yaxis: {type: "category", title: "OTU ID Number"}
  }

  let barData = [trace1];

  Plotly.newPlot("bar", barData, layout);
}); 