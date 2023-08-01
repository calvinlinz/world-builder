# Exploring Algorithmic Approaches for Random Map Generation

Outlining some approaches to random dungeon generation that have been done before and how we could apply these to our project.

Algorithim must be able to create random maps where:
- it makes sense for the map to be a mediaeval dungeon
- All rooms are traversable
- the final product is able to be mapped to a 2d grid


**<span style="font-size: larger;">Procedural Dungeon Generation Approach (Cellular Automata) 1</span>**

This approach involves initialising a 2D array of Cells. The cells in this 2D array can either be dead or alive, for our purposes this means either a wall (alive) or a cell a player can explore (dead) . We determine the rules for each of the cells on whether they should be alive or dead based on the state of their neighbours.The final result of the map is based on how we choose to implement these rules.

This algorithm is relatively simple and is something that some of our group members have already had experience with in previous projects. However, one Issue I have with this algorithm is that it can create maps that don't really make sense. The rooms/areas it creates are very random and a lot of the time have odd deviations that are difficult to explain.

Here is an example of a map generated with cellular automata. It is good at creating cave/island like patterns but is not very strong at creating well defined rooms. Creating well defined rooms is something that will be key as we have a dungeon theme.

[Cellular Automata - Caves](https://blog.jrheard.com/procedural-dungeon-generation-cellular-automata)

[![Cave Map Image](https://www.google.com/url?sa=i&url=https%3A%2F%2Fabitawake.com%2Fnews%2Farticles%2Fprocedural-generation-with-godot-creating-caves-with-cellular-automata&psig=AOvVaw3YNhm__z7xANMmfy12OpjM&ust=1690954605366000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOCW8PbeuoADFQAAAAAdAAAAABAE)


[![Island Map Image](https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.emanueleferonato.com%2Fwp-content%2Fuploads%2F2011%2F05%2Fautomatatrue.png&tbnid=6ptTPaTd2GjEEM&vet=12ahUKEwii2vj13rqAAxXopWMGHVdxCSwQMygLegUIARDjAQ..i&imgrefurl=https%3A%2F%2Fwww.emanueleferonato.com%2F2011%2F05%2F17%2Fusing-cellular-automata-to-generate-random-land-and-water-maps-with-flash%2F&docid=ex8-Cd29i-8SRM&w=640&h=480&q=cellular%20automata%20map%20generation&client=safari&ved=2ahUKEwii2vj13rqAAxXopWMGHVdxCSwQMygLegUIARDjAQ)


**<span style="font-size: larger;">Procedural Dungeon Generation Approach 2</span>**

Procedural generation involves generating a certain number of randomly sized rooms. The rooms are initially generated within a radius in the centre of the screen. Meaning they will all be on top of each other. The rooms are then spaced out so they are no longer cluttered in the middle of the screen. We would then analyse the rooms to see what rooms will become the “main” rooms based on a threshold we have set of size/area. Once we have done this we go about linking the rooms together with paths, we can do this by treating the main rooms as nodes and identifying the minimum spanning tree that will reach all of the main rooms.

The result of this looks like the image below, the red squares being the “main” rooms and the blue squares making up the corridors and paths. A detailed explanation of how this can be implemented can be found [here](https://www.gamedeveloper.com/programming/procedural-dungeon-generation-algorithm)
, also where I got all information for this Technique.

[![Procedural Generation Map (Bottom of Page !!)](https://www.gamedeveloper.com/programming/procedural-dungeon-generation-algorithm)

I think we could use this idea, but expand on it by having a group of predefined rooms, things like treasure rooms, libraries, armoury etc. We could then randomly generate a cluster of these predefined rooms just as they have done above then space them out and create paths between them. We could use a free online dungeon tile set ([e.g](https://petricakegames.itch.io/sewer-blue-dungeon-tileset)) which would allow us to create our own unique rooms. The downfall to this method is it is quite complex and no group members have any experience with this approach.

**<span style="font-size: larger;"> Binary Space Partitioning 3</span>**

Binary space partitioning involves splitting up an initial area into smaller spaces/rooms. This involves creating the space for the rooms first then worrying about the paths that connect the rooms second. 
This creates fairly simple maps that are very similar to approach number 2. However, I think this map design suits the dungeon very well. Rooms are of square shapes and are well defined. There are not any random walls sitting in the middle of corridors/rooms and I think this is a big positive as this helps the map make sense. 

[Binary Partitioning Map Example](https://www.google.com/imgres?imgurl=https%3A%2F%2Frepository-images.githubusercontent.com%2F316506019%2F57c69380-46c7-11eb-9d93-7d97c81d33dc&tbnid=AsH1Hg2JaT6SaM&vet=12ahUKEwjh0Zn54LqAAxUm5TgGHdqFDnsQMygBegUIARDFAQ..i&imgrefurl=https%3A%2F%2Fgithub.com%2Ftopics%2Fbinary-space-partition&docid=Z53Gy__weVom_M&w=3064&h=1782&q=binary%20partitioning%20map&client=safari&ved=2ahUKEwjh0Zn54LqAAxUm5TgGHdqFDnsQMygBegUIARDFAQ)


**<span style="font-size: larger;"> Random Walk 4</span>**

[Tutorial on random walk map generation](https://www.freecodecamp.org/news/how-to-make-your-own-procedural-dungeon-map-generator-using-the-random-walk-algorithm-e0085c8aa9a/)

The random walk technique is concerned with creating the corridors between rooms first and then creating rooms at the ends of these corridors. The maps involve an agent going on a  random walk and the trail made by the agent is what the map's playable areas will be. We get to specify how far the agent can walk as well as how often the agent makes turns 

Below is an image of some maps created by random walk and I personally think these maps are too random for what we are trying to achieve. This for me does not resemble the layout of a fictional dungeon and looks more like an ant colony or deep cave system. For our dungeon generator we want an approach that produces well defined rooms.


[![Random walk map example #1](https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Fcontent%2Fimages%2F2020%2F09%2FScreen-Shot-2020-09-12-at-11.30.55-PM.png&tbnid=lhCfdddHGm3FTM&vet=12ahUKEwi4kJy64bqAAxWPm2MGHeNcC2MQMygAegUIARC2AQ..i&imgrefurl=https%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Fhow-to-make-your-own-procedural-dungeon-map-generator-using-the-random-walk-algorithm-e0085c8aa9a%2F&docid=J8JIYnpYI6c3XM&w=2000&h=988&q=random%20walk%20map%20generation&client=safari&ved=2ahUKEwi4kJy64bqAAxWPm2MGHeNcC2MQMygAegUIARC2AQ)


[![Random walk map example #2](https://www.google.com/imgres?imgurl=https%3A%2F%2Fmiro.medium.com%2Fv2%2Fresize%3Afit%3A1400%2F1*7J_P2uV6v2p4-LRBS7pRAg.png&tbnid=t2V26oBpz0mPrM&vet=12ahUKEwi4kJy64bqAAxWPm2MGHeNcC2MQMygZegUIARDxAQ..i&imgrefurl=https%3A%2F%2Fmedium.com%2F%40mihailstumkins%2Fhow-to-create-random-levels-with-unity-3d-2219c4d39ea8&docid=o0SF18EJIjjEoM&w=1400&h=870&q=random%20walk%20map%20generation&client=safari&ved=2ahUKEwi4kJy64bqAAxWPm2MGHeNcC2MQMygZegUIARDxAQ)


**<span style="font-size: larger;">Current Thoughts</span>**

I think approaches 2 and 3 are our best bet at this point, they are both able to create well defined rooms that suit the dungeon theme. Approach 2 is a lot more complicated that approach 3 but approach 2 is able to produce better looking maps in terms of detail and variation. Approach 3 would be the simpler approach to implement but I can see the maps that are produced using this approach possibly becoming repetitive due to the nature of the algorithm.
