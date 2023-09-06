# Campsite Algorithm Plan

To generate camps, campsite artifacts need to be laid out in a manner that makes logical sense, such that:

- Tents aren't randomly placed on the map but are instead in a camp formation
- Camps are oriented around features such as fires or logs
- Camps are a sensible size

To achieve all of this, the algorithm for generating camps should be separate from the section generator, and instead return a 2D array to the generator should it decide to place a campsite on the map.

A camp builder class will be added, which randomly generates a camp size, and places tents within the site around its perimeter. An object should be placed at the centre such as a firepit. This logic will be similar to the random section generator but housed as a step further down for added specificity.
