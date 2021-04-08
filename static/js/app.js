d3.json('samples.json').then(function(data) {

console.log(data);

//Read all data from the json file
let demographics = data.metadata;
console.log(demographics);

let samples = data.samples;
console.log(samples);

let names = data.names;

//use d3 to grab the select element
const menu = d3.select("#selDataset");

for (let i = 0; i < names.length; i++) {

   //for every name, append an option tag
   let label = menu.append("option");

   //set the valeu of the option tag to each name
   label.text(names[i]);
};


//Initial plot on page load
genPlots('940');

//genPlots is where the work will be done to generate each piece based on an id
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

   //Use data in a trace for the bar chart
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
   let demo_labels = Object.keys(personalData[0]);
   console.log(demo_labels);

   let demo_info = Object.values(personalData[0]);
   console.log(demo_info);

   //Use d3 to grab the tbody element
   const tbody = d3.select("#sample-metadata");

   //Reset table html
   tbody.html("");

   //for loop for array length
   for (let i = 0; i < demo_labels.length; i++) {

      //append a row for each object
      let row = tbody.append("tr");
      
      //Append the left cell (label) first to a td element, with bold styling and padding
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
   let trace3 ={
         domain: { x: [0, 1], y: [0, 1] },
         value: demo_info[6],
         title: { text: "Wash Frequency" },
         type: "indicator",
         mode: "gauge+number",
         gauge: {
            axis: {range: [0, 10]}
         }
      };

   let gaugeLayout = { 
      width: 600, 
      height: 400, 
      margin: { t: 0, b: 0 } 
   };

   gaugeData = [trace3];

   Plotly.newPlot('gauge', gaugeData, gaugeLayout);

   //Bubble Chart

   let trace2 = {
      x: otu_ids,
      y: sample_values, 
      mode: 'markers',
      marker: { size: sample_values, color: otu_ids },
      text: otu_labels
   };

   let bubbleLayout = {
      title: "All OTU's By Sample Count",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "OTU Count"}
   };

   let bubbleData = [trace2];

   Plotly.newPlot('bubble', bubbleData, bubbleLayout);
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

//When the selector is changed, it grabs the id number, then generates the plot in the above function
d3.selectAll("#selDataset").on("change", runID);

}); 