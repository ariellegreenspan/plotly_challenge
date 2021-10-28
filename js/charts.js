function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    console.log(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
  }

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildBarCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = samples.filter(sampleObject => sampleObject.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = filteredSamples[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = firstSample.otu_ids.slice(0, 10).reverse();
    var otu_labels = firstSample.otu_labels.slice(0, 10).reverse();
    var sampleValues = firstSample.sample_values.slice(0, 10);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otu_ids;  
    // 8. Create the trace for the bar chart. 
    var trace = {
      x: sampleValues,
      y: otu_ids,
      type: "bar"
    };
    
    var barData = [trace];
  
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top Ten Bacteria Cutltures Found",
      xaxis: {title: "sample values"},
      yaxis: {title: "OTU IDs"} 
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot(("bar", barData, barLayout));
  })};
   // Bar and Bubble charts
// Create the buildCharts function.
function buildBubbleChart(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  //d3.json("samples.json").then((data) => {

    // 1. Create the trace for the bubble chart.
    var trace1 = {
      x: samples.otu_ids,
      y: samples.sample_values,
      text: samples.otu_labels,
      mode: 'markers',
      marker: {
        color: samples.otu_labels,
        size: samples.sample_values
      }
    };
    var bubbleData = [trace1]
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 600
      };
          
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
  };

// Create the buildChart function.
function buildGaugeCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = samples.filter(sampleObject => sampleObject.id == sample)
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var filteredMetadata = metadata.filter(meta => meta.id.toString() === id)[0];
    // Create a variable that holds the first sample in the array.
    var firstSample = filteredSamples[0];
    // 2. Create a variable that holds the first sample in the metadata array.
    var firstMetadata = filteredMetadata[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = firstSample.otu_ids.slice(0, 10).reverse();
    var otu_labels = firstSample.otu_labels.slice(0, 10).reverse();
    var sampleValues = firstSample.sample_values.slice(0, 10);

    // 3. Create a variable that holds the washing frequency.
    var washingFrequency = data.metadata.map(data => data.washingFrequency);
    // Create the yticks for the bar chart.
    var yticks = washingFrequency;
    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot('bubble', bubbledata, bubblelayout);
   
    
    // 4. Create the trace for the gauge chart.    
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: 270,
      title: { text: "Belly Button Washing " },
      type: "indicator",
      mode: "gauge+number"
    }
];
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 }};
    

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
};

