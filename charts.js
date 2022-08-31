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

// Deliv1 Step 1. Create the buildCharts function.
function buildCharts(sample) {
  // Deliv1 Step 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    
    // Deliv1 Step 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    
    // Deliv1 Step 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    
    // Deliv3 Step 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metaArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    // Deliv1 Step 5. Create a variable that holds the first sample in the array.
    var result = sampleArray[0];

    // Deliv3 Step 2. Create a variable that holds the first sample in the metadata array.
    var result1 = metaArray[0];

    // Deliv1 Step 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;
    
    // Deliv3 Step 3. Create a variable that holds the washing frequency.
    var washFreq = parseFloat(result1.wfreq);
    
    // Deliv1 Step 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order
    // so the otu_ids with the most bacteria are last. 
    var yticks = otuIDs.slice(0,10).map(id => `OTU ${id}`).reverse();

    // D1 Step 8. Create the trace for the bar chart. 
    var barData = [ {
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }
      
    ];
    // Deliv1 Step 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
    };

    // Deliv1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    
    // Deliv 2: Bubble Chart
    // Deliv2 Step 1. Create the trace for the bubble chart.
    var bubbleData = [ {
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: "Earth"
      } 
    }
   
    ];

    // Deliv2 Step 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: {title: "OTU ID"},
      hovermode: "closest" 
      
    };

    // Deliv2 Step 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    // Deliv 3: Gauge Chart (Steps 1-3 further up)
    // Deliv3 Step 4. Create the trace for the gauge chart.
    var gaugeData = [ {
      domain: {x: [0,1], y: [0,1]},
      value: washFreq,
      gauge: {
        axis: {range: [null,10]},
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "limegreen"},
          {range: [8,10], color: "green"}
        ]
      },
      title: "Belly Button Washing Frequency <br><sup>Scrubs per Week</sup>",
      type: "indicator",
      mode: "gauge+number"
    }
    
    ];

    // Deliv3 Step 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width: 600,
      height: 500,
      margin: {t: 0, b: 0}
    };

    // Deliv3 Step 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);


  });
}
