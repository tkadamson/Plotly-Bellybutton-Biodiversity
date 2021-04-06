d3.json('samples.json').then(function(data) {

console.log(data);

//Read demographic and sample data
let demographics = data.metadata;
console.log(demographics);

let samples = data.samples;
console.log(samples);

//Initial plot on page load
genPlots('940');

function genPlots(id) {

   //Filter the json data to match the id
   let personalData = demographics.filter(function (person) {
      return person.id === Number(id);
   });

   console.log(personalData);

   let sampleData = samples.filter(function (person) {
      return person.id === id;
   });
   
   console.log(sampleData);

   //Get individual components out of the sampleData object
   //Both full dataset (for bubble) and top 10 (for bar)
   let otu_ids = sampleData[0].otu_ids;
   let otu_ids10 = otu_ids.slice(0,10).reverse();
   console.log(otu_ids10);

   let sample_values = sampleData[0].sample_values;
   let sample_values10 = sample_values.slice(0,10).reverse();
   console.log(sample_values10);

   let otu_labels = sampleData[0].otu_labels;
   let otu_labels10 = otu_labels.slice(0, 10);
   console.log(otu_labels10);

   //Use data in a trace
   let trace1 = {
         x: sample_values10,
         y: otu_ids10,
         text: otu_labels10,
         type: "bar",
         orientation: "h"
   };

   let barLayout = {
      title: "Most Commonly Found OTU's",
      xaxis: {title: "OTU Count"},
      yaxis: {type: "category", title: "OTU ID Number"}
   }

   let barData = [trace1];

   Plotly.newPlot("bar", barData, barLayout);

   //Place demographic info in a table
   //Get keys and values separately

   const tbody = d3.select("#sample-metadata");

   let demo_labels = Object.keys(personalData[0]);
   console.log(demo_labels);

   let demo_info = Object.values(personalData[0]);
   console.log(demo_info);

   //Reset table html
   tbody.html("");

   //for loop for array length
   for (let i = 0; i < demo_labels.length; i++) {

      let row = tbody.append("tr");
      
      //Append the left cell (label) first, with bold
      let cell1 = row.append("td");
      cell1.text(demo_labels[i]); 
      cell1.style("font-weight", "bold");
      cell1.style("padding-left", "10px");
      cell1.style("padding-right", "30px");

      //Append data to the right
      let cell2 = row.append("td");
      cell2.text(demo_info[i]);
   };

   //Gauge Chart
   //Copied from https://code.tutsplus.com/tutorials/create-interactive-charts-using-plotlyjs-pie-and-gauge-charts--cms-29216
   //with modifications to needle positioning and color scheme

   let trace3 = {
      type: 'pie',
      hole: 0.4,
      rotation: 90,
      showlegend: false,
      values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
      text: ['0','1','2','3','4','5','6','7','8+'],
      direction: 'clockwise',
      textinfo: 'text',
      textposition: 'inside',
      marker: {
         colors: ['rgba(61, 193, 67, 0.2)', 'rgba(61, 193, 67, 0.3)', 'rgba(61, 193, 67, 0.4)', 'rgba(61, 193, 67, 0.5)', 'rgba(61, 193, 67, 0.6)', 'rgba(61, 193, 67, 0.7)', 'rgba(61, 193, 67, 0.8)', 'rgba(61, 193, 67, 0.9)', 'rgb(61, 193, 67)', 'white'],
        labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      }
   };
 
let gaugeLayout = {
   width: 750, 
   height: 500,
   shapes:[{
      type: 'line',
      x0: 0.5,
      y0: 0.5,
      x1: 0.5,
      y1: 0.8,
      line: {
        color: 'black',
        width: 3
      }
    }]
   };

   let gaugeData = [trace3];

   Plotly.newPlot('gauge', gaugeData, gaugeLayout); 
   //Bubble Chart

   let trace2 = {
      x: otu_ids,
      y: sample_values, 
      mode: 'markers',
      marker: { size: sample_values, color: otu_ids },
      text: otu_labels
   };

   let bubbleData = [trace2];

   Plotly.newPlot('bubble', bubbleData);
   };

// This function is called when a dropdown menu item is selected
function runID() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let id = dropdownMenu.property("value");

  //Generate a new plot based on new id
  genPlots(id);
}

d3.selectAll("#selDataset").on("change", runID);

}); 