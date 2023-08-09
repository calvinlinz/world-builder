# Back-end Meeting on 3/8/23

Wednesday 3rd August. 1pm till 2pm.

Updated on 9th August.

## High-Level Plan for Map Generation

- Create pre-generated rooms and features (i.e. a mountain or a lake) of specific sizes (6 by 4, 3 by 3, et cetera).
- Divide a landscape map of the dimensions 1920 by 1080 (1080p) into 8 sections of equal sizes.
- Each section is populated with the pre-generated items.
- Use a path finding algorithm to link all the pre-generated features across the sections.
- Ensure the map makes sense. As in don't mix features that don't look right next to each other (deserts, lakes, ice). Instead these could be different map options entirely.
- Potentially have an option to add mobs overtop of the generated map in places such as rooms.
- This will all be formed into a composite tree structure.
- Structure our sprint items around forming the skelton code to implement this. 

## Resolution and Array Sizing

- The map resolution will be 1620 x 1080
- We will divide this into six individual sections, sized as (540 x 540).
- An individual tile will be 20 by 20 pixels
- This gives us 27 by 27 tiles per section

