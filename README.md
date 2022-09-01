# Belly Button Biodiversity Analysis

The deployed dashboard can be found at: https://bfox87.github.io/plotly_deployment/

## Overview:
Rosa, a biological researcher at a lab, is trying to find bacteria that a food startup, Improbable Beef, could use to help create a beef taste in its plant-based products. Rosa thinks belly buttons might contain the right bacteria and she's taken samples from many different people. She now needs to create an interactive dashboard to display her findings.

## Process:
The data from all the people sampled is housed in a JSON file. Functions in a javascript file (charts.js) read in the data for the subject ID that is selected in the webpage dropdown. The data is visualized with the use of three Plotly charts and an info panel. Finally, the front-end of the webpage is built and styled with the index.html and style.css files.

#### Issues Encountered:
My deployed Gituhub webpage was not displaying any data when my json and javascript files were housed in the static subfolder. Not sure of the error cause because my links were correct and the webpage worked on my local host. Resolved by changing the links and moving the files to the same main folder as the index.html.

### Customizations Added:
I linked a style.css file to the html file so I could add webpage customizations:
- A solid blue border around the entire webpage.
- A light blue background color for the Demographic Info panel.
- An image of bacteria found on nih.gov to the jumbotron and adjustments to the fonts within the jumbotron in the html file to Times New Roman and the color white.
- Also made a slight size adjustment in the html file to the div class containing the gauge chart so it fit better.

![webpage_screenshot](https://github.com/bfox87/plotly_deployment/blob/main/images/webpage_screenshot.PNG)