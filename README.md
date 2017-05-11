# d3CirclePackAPI
Assignment 3 for Info474

## Usage
#### Setup
First things first, here are some tags to include in your html file to get you started. If you decide to store these files in a nested directory, be sure to update the filepaths.
``````````
<script src="CirclePack.js"></script>
<script src="tip.js">
<link rel="stylesheet" href="pack.css" />
``````````
#### Format Data
Use the d3 nest function to format the data that is read in from your csv file. Specify as many keys to nest by as you like. If your dataset does not have a sole parent node, be sure to define your own in the first key to nest on by writing the following `.key((d) => "Name of root node")`. Alternatively, by not providing a parent node, each secondary key will be placed in its own chart.
#### What to Display
##### count
Specify the variable in your dataset that you want to be used in calculating the size of the circles. This needs be a numeric value in the data, and the string passed in to the `.count()` function should exactly match the header from the csv file.
##### leafTitle
Specify the variable in your dataset that represents the individual leaf nodes of the chart. This is used to title the leaf nodes. The string passed in to the `.leafTitle()` function should exactly match the header from the csv file.
##### rootTitle
Define the title of the head root by passing a string into the `.rootTitle()` function. This should be the same as the first key you nested your data on.
#### Look and Feel
Use the following functions of `CirclePack()` to customize the chart. Any options that are not defined by you will use the default settings.
##### diameter
Use this to set the diameter of chart. Just pass in a positive integer to the `.diameter()` function.
##### colorDomain
Pass in a integer to the `.colorDomain()` function to customize the range of colors that is used. This option is fun to mess with. See what you can come up with.
##### showCount
Want the count shown for leaf nodes on hover? Or maybe you don't? No problem, just pass a boolean to the `.showCount()` function.
##### opacity
You can customize the opacity of the fill on the circles by passing a positive integer to the `.opacity()` function.
##### transitionTime
To change the duration of the transition pass a positive integer to the `.transitionTime()` function. The time value is in milliseconds.
##### colorScheme
Don't like the default color scheme? You can change it to any of the following d3 scale schemes:
- Viridis
- Inferno
- Magma
- Plasma
- Warm
- Cool
- Rainbow
- CubehelixDefault

To change the scheme, just pass in one of the above options as a string to the `.colorScheme()` function.

## Putting it all together
After you have customized the `CirclePack()`, follow the standard d3 format of enter, update, and remove.
