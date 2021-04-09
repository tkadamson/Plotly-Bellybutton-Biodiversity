# hw12-plotly-bellybutton-biodiversity

### Solution WriteUp | GRADE: -

To complete this assignment, I first had to read in the data from the given samples.json file. I used d3.json to grab the file, and then wrote the rest of the program inside of this function. 

Inside the json file were three individual datasets: a "names" array containing every id, a "metadata" array of objects, with an object for every individual's demographic data, and a "samples" array of objects, containing the belly button data for each id. I read each of these into a variable for later use. 

Next, I used d3 to populate my dropdown menu. This could have been done directly into index.html, but this was a more consise way. Within a loop set to run for the length of the names array, I appended an option to the select tag. Setting the text equal to the name created a dropdown selection for each id. 
  
The next piece of the program is a function called genPlots() which takes an id and uses it to filter the data and uses it to build a demogrphics table and the charts. I set an id of 940 first so that the page would load with the first id in samples.json. Later, theres a function that finds the user's selected id and uses it instead. 

Inside genPlots(), I first used filter functions to narrow the data down to only the id passed into genPlots(). I also used .slice() to grab only the top 10 results for the bar graph, while the full set was used in the bubble chart. I also used .reverse() to make sure the data was properly arranged for the horizonal bar chart. 

Once I had the filtered data, I passed the data for the bar chart into trace1, and created a layout opject for the Plotly call. See below for the exact parameters used. I then used Plotly.newPlot() to generate the plot on the "bar" id in index.html. 

(Note: index.html was already created in the sample code. I slightly modified it to better fit the data, but it reamined mostly the same.)

Next I worked on getting demogrphic data to disply on the page. I used Object.values and Object.keys to grab each key-value pair in the filtered metadata. I then used d3 to first erase the existing tbody tag and replace it with a new row with the key on the left and the valeu on the right. I did some in-line styling as well to make the key bold and padded slightly. 
  
After the table, I created the gauge chart. I copied the basic gauge from the plotly javascript page, and replced the value feild with the wash frequency number. I also set the gauge range to 0-10 so that it was static and the gauge filled up to 10 with more washes. 

Lastly, I creaed the bubble chart, very similarly to the bar chart. See below for the exact parameters:

Once I finished the genPlots() function, I need to create a function that grabbed the id that the user selected. This function, runID() was set to run when an event listener detected a change on the select tag. I used d3 to grab that select element and se the id equal to the user's selection. it then calls genPlots() and passes in the new id. 
  
The last line is the creation of the event listener, which calls runID() on a change to the select tag.
