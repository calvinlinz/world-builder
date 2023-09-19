# World Builder

## Dungeons and Dragons Introduction
Dungeon & Dragons (D&D) is an iconic tabletop role-playing game that combines storytelling and strategy to create a rich gaming experience. Players assume the roles of heroic characters, referred to as “adventurers”, who embark on quests, battle monsters, and explore the fantastical world facilitated by the Dungeon Master (DM). The DM is responsible for the storytelling and narration, controlling both monsters and non-playable characters, and introducing obstacles for the players to conquer.

The D&D map, which serves as a formal representation of the game world, is an indispensable element of a successful and immersive game. Maps are often "dungeons", which are perilous enclosed spaces, such as underground labyrinths, haunted mansions, and complex cave systems. Dungeons are teeming with dangerous monsters and traps, and are designed to challenge adventurers with substantial risk, while offering significant rewards should the players successfully complete their quest. Furthermore, dungeons consist of multiple layers that progressively escalate in danger as they delve deeper. While the DM who facilitates the game possesses knowledge of the entire map, adventurers have limited visibility, meaning they can view only a certain radius of the dungeon. At its core, a rich map — detailed, logical, and open-ended — is a crucial tool that drives the success of the gameplay.

## Document Contents
### 1.0 Project Description
- 1.1 Scope
- 1.2 Stretch Goals
- 1.3 Out of Scope
### 2.0 Back End
- 2.1 Tools and Language Choice
- 2.2 Algorithm
- 2.3 Data Storage
### 3.0 Front End
- 3.1 Tools and Language Choice
- 3.2 Web Features
- 3.3 Graphics
### 4.0 Project Management Methodology
### 5.0 Project Tools
### 6.0 Relevant Risks
### 7.0 Group Roles
- 7.1 Group Contact
- 7.2 Group Responsibilities



## 1.0 Project Description
### 1.1 Scope

- An algorithm to randomly generate maps.
- A web interface to use the algorithm.
- The ability to download a map to an image format.
- The ability to share a map in an image format from within the web interface.
- The ability to select the map size.
- The ability to show monsters on a separate Dungeon Master view (which can also be saved and printed off).
- A “Dungeons and Dragons” theme / narrative.


### 1.2 Stretch Goals

- Ability to overlay a fog-of-war over a map.
- Set parameters e.g. the number of rooms.
- User accounts to store their own saved worlds.

### 1.3 Out of Scope

- A multiplayer web-based game.

## 2.0 Back End
### 2.1 Tools and Language Choice
This backend application is a Maven project that was generated through Springboot with several web/API specific dependencys. These dependencies such as 'spring-boot-starter-web' gives the application the ability to act as an API to our front end React application. Code is written in Java.

### 2.2 Algorithm
Our Map will consist of 6 different quadrants. In each of the quadrants we will randomly generate predefined rooms, natural features and backgrounds. Once we have randomly generated these elements we will ensure they are spaced out and not overlapping. Once this has been achieved we will ensure all elements are accessible by linking them with paths. Every element on the map will have a unique id and this is to ensure the graphics team can determine how to render each tile on the map.

The map will be stored in a 2D array made up of 6 different cells with each cell containing an element id. The pre-defined elements must be limited in size based on the size of the quadrants. By using predefined elements we can ensure that all rooms, natural features and backgrounds fit the theme of dungeons and dragons and look realistic.

The algorithm works by selecting a random building or natural feature, there is a 70 percent chance that element will be a building and a 30 percent chance it will be a natural feature. This is because we want the quadrant to be based around the buildings and not just be filled with natural features. Once it has selected a building or natural feature it will generate a random position for the element to be placed. The random position will be where the top left corner of the element will be placed. Once the position in the array is selected the algorithm then checks whether or not there is space for the element in the current position. If there is space the element will be added to the map and if not we start the process of randomly generating an element at a random position until we find one that fits. This results in diverse quadrants with a good mix of buildings and natural features.

We then generate 6 random quadrants and stitch them together into one array which represents the whole map.

### 2.3 Data Storage
We have decided to use local files such as .csv and .json files to store our data. This is because we are not requring the complexity and features a full fledged database offers and local files allows us to consistently share the latest version of the database within the repository when commiting and pushing.

A map exporter has been developed to enable communication of the map from the back-end to the front-end. The MapExporter class serves as a channel for retrieving data from the MapBuilder, which is responsible for generating the 2D array. By parsing through each element within the map, the MapExporter then proceeds to compile and store this data within a .csv file, which can then be read by the graphics team to determine image placements. The data is written in the same order and dimensions as the map, allowing for easy translation into the graphics which also utilises identical formats and keycodes. Furthermore, this class can be extended to accommodate other map types, such as Monster or Furniture maps, should we decide to integrate them later on. Minor adjustments would allow it to export to different file formats if the need arises.

### 2.4 Controller
The controller configures endpoints with responses and HTTP methods. We have implemented a /world GET endpoint that will generate a new world using the map generating algorithm and returns it in the response. 

### 2.5 Monster Generator

#### 2.5.1 Monster Names

| **BOSS MONSTER**  | **HARD MONSTER**  | **MEDIUM MONSTER**  | **EASY MONSTER**  |
|-----------------------|-----------------------|-------------------------|-----------------------|
| Barbie                | Morgaloth             | Melissa                 | Greb                  |
| Vorluk                | Vorgrak               | Perceptron              | Morph                 |
| Sylvaria              | Azrakarn              | Neuralnet               | Crinkle               |
| Dendrogram            | Cynariel              | Graboost                | Crawler               |
| Ellaquora             | PP-poo’oo             | Stochastion             | Bloblin               |
| Annihilith            | Dread                 | Sloth                   | Bunny                 |
| Haydron               | Maymeens              | Kayenen                 | Ratling               |
| Milandroth            | Drexthul              | Genprog                 | Beebir                |
| Calvorr               | Azrakarm              | Genalg                  | Mothie                |
| Amirax                | Thal’gulon            | Deebeescan              | Ken                   |

#### 2.5.2 Monster Stats
The monsters are passed from the backend to the front end as 7 digit integers, inserted into their position in the 2D grid, e.g. 1673837. From there, they can be interpreted by the graphics team and displayed accordingly. Below are what each digit in the monster integer represents.

##### First Digit
This represents the rank of the monster. Harder monsters will spawn in larger rooms, whereas easier monsters can be found in smaller rooms.
| 1    | 2      | 3      | 4    |
| ---- | ------ | ------ | ---- |
| BOSS | HARD   | MEDIUM | EASY |

##### Second to Seventh Digit
These six digits represent the six primary attributes, often referred to as "stats" or "ability scores," that define a monster's basic capabilities and characteristics. In order, they are: Strength (STR), Dexterity (DEX), Constitution (CON), Intelligence (INT), Wisdom (WIS), and Charisma (CHA). These values are likely to be higher, the greater the rank of the monster. The digits can the values 0-9, which represent:

| 0  | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| -- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 100% | 10% | 20% | 30% | 40% | 50% | 60% | 70% | 80% | 90% |


## 3.0 Front End
The front end of this project will be expressed as a website using React and JavaScript.

### 3.1 Tools and Language Choice
The main tools and languages used in the front-end are: React, HTML, and CSS. 

#### 3.1.1 React
React is a popular JavaScript framework for building user interfaces. React's component-based architecture aligns well with the method in which we have decided to generate the map (in a 2D array) and display the graphics (each element being represented by a component). This also allows for easy addition of new web pages and other components, such as a dropdown menu for adjusting map parameters. While the front-end team is not fully proficient in React, it is a great choice for our project context and it will provide us invaluable knowledge. 

#### 3.1.2 CSS
CSS can also be applied to enhance the visual aesthetic of the web page, which is crucial for an engaging and user friendly final product.

### 3.2 Web Features
Our Dungeons and Dragons random map generator website will incorporate an array of essential features that seamlessly interact with the generated maps. The user interface should prioritize user-friendliness, allowing both novice and seasoned players to effortlessly navigate and manipulate the maps.

This section is split into the following topics:
- 3.2.1 Incorporated Features
- 3.2.2 User Interface and Usability

#### 3.2.1 Incorporated Features
Our website must incorporate the features requested by the stakeholder that our outlined in our MVP. 

#### 3.2.2 Configuration
We have decided to create a configuration dropdown menu that is persistent in the top left corner of the web application. This will allow users to toggle the visibility of the configuration settings as they require. These settings include the fog parameters, map size and download button. This feature also includes a 'generate' button that allows users to generate a new world.


#### 3.3 Data Fetching
Due to having data and business logic such as the map generating algorithm abstracted away in the backend, we are required to make relevant API calls to the Maven Java backend API to retrieve this data. We currently have succesfully configured a connection to retrieve world data. 

**How will the user be able to share the map?**

**How will the dungeon master be able to view the monsters?**

#### 3.2.2 User Interface and Usability

### 3.3 Graphics
For the graphical elements in the map, a mixture of texture packs and elements created on photoshop will be used. The majority of the texture packs will be sourced from 2MinuteTableTop.com, which provides a range of relevant materials. We will need to ensure that we have licensed these resources accordingly.

This graphics section is split into the following topics:
- 3.3.1 Texture Elements Licencing 
- 3.3.2 Texture Element Coding System
- 3.3.3 Graphics Algorithm
- 3.3.4 Hero Animation
- 3.3.5 Relevant Graphics Risk


#### 3.3.1 Texture Elements Licencing 
As mentioned above, free texutre packs will be sourced from 2MinuteTableTop.com. The below table shows the used textures and the relevant links to their source. 


The relevant licence.....



#### 3.3.2 Texture Element Coding System
Due to the nature of the project, there will be a large number of image assets to properly display the map. A image naming convention/system is essential for file organisation and communication between the team. 

**Camp Images:**

| **Image** | **Image Type** | **Image Name** | **Image Dims** | **Source Link**                                  |
|-----------|----------------|----------------|----------------|--------------------------------------------------|
|<img src="world-builder/src/assets/camp/1x2_tent.png" alt="Alt Text" height="60"/> | Tent           | 1x2_tent.png   | 1x2            | https://2minutetabletop.com/product/camp-tokens/ |
|<img src="world-builder/src/assets/camp/2x2_tent_1.png" alt="Alt Text" height="60"/> | Tent           | 2x2_tent_1.png | 2x2            | https://2minutetabletop.com/product/camp-tokens/ |
|<img src="world-builder/src/assets/camp/2x2_tent_2.png" alt="Alt Text" height="60"/> | Tent           | 2x2_tent_2.png | 2x2            | https://2minutetabletop.com/product/camp-tokens/ |
|<img src="world-builder/src/assets/camp/bedroll.png" alt="Alt Text" height="60"/> | Bed            | bedroll.png    | 1x2            | https://2minutetabletop.com/product/camp-tokens/ |
|<img src="world-builder/src/assets/camp/campfire.png" alt="Alt Text" height="60"/> | Campfire       | campfire.png   | 1x1            | https://2minutetabletop.com/product/camp-tokens/ |
|<img src="world-builder/src/assets/camp/fire.png" alt="Alt Text" height="60"/> | Fire           | fire.png       | 1x1            | https://2minutetabletop.com/product/camp-tokens/ |
|<img src="world-builder/src/assets/camp/firewood.png" alt="Alt Text" height="60"/> | Firewood       | firewood.png   | 2x1            | https://2minutetabletop.com/product/camp-tokens/ |


**Forest Images:**
| **Image** | **Image Type**   | **Image Name**          | **Image Dims** | **Source Link**                                              |
|-----------|------------------|-------------------------|----------------|--------------------------------------------------------------|
|<img src="world-builder/src/assets/forest/bush1.png" alt="Alt Text" height="60"/> | Bush             | bush1.png               | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/forest/bush2.png" alt="Alt Text" height="60"/> | Bush             | bush2.png               | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/forest/bush3.png" alt="Alt Text" height="60"/> | Bush             | bush3.png               | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/forest/duff_lrg.png" alt="Alt Text" height="60"/> | Duff             | duff_lrg.png            | 1x1            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/duff_med.png" alt="Alt Text" height="60"/> | Duff             | duff_med.png            | 1x1            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/duff_small.png" alt="Alt Text" height="60"/> | Duff             | duff_small.png            | 0.5x0.5        | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/fallen_tree.png" alt="Alt Text" height="60"/> | Fallen Tree      | fallen_tree.png         | 2x4            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/grass_texture_long.png" alt="Alt Text" height="60"/> | Grass Texture    | grass_texture_long.png  | 2x1            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/grass_texture_rock.png" alt="Alt Text" height="60"/> | Grass Texture    | grass_texture_rock.png  | 2x1            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/grass_texture_short.png" alt="Alt Text" height="60"/> | Grass Texture    | grass_texture_short.png | 1x1            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/grass_texture.png" alt="Alt Text" height="60"/> | Grass Texture    | grass_texture.png       | 2x1            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/grass1.jpg" alt="Alt Text" height="60"/> | Grass Background | grass1.jpg              | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/forest/grass2.jpg" alt="Alt Text" height="60"/> | Grass Background | grass2.jpg              | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/forest/grass3.jpg" alt="Alt Text" height="60"/> | Grass Background | grass3.jpg              | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/forest/leaf_green.png" alt="Alt Text" height="60"/> | Leaf             | leaf_green.png              | 1x1            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/leaf_red1.png" alt="Alt Text" height="60"/> | Leaf             | leaf_red1.png           | 2x2            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/leaf_red2.png" alt="Alt Text" height="60"/> | Leaf             | leaf_red2.png           | 1x1            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/orange_bush1.png" alt="Alt Text" height="60"/> | Orange Bush      | orange_bush1.png        | 1x1            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/orange_bush2.png" alt="Alt Text" height="60"/> | Orange Bush      | orange_bush2.png        | 1x1            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/orange_bush3.png" alt="Alt Text" height="60"/> | Orange Bush      | orange_bush3.png        | 1x2            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/orange_bush4.png" alt="Alt Text" height="60"/> | Orange Bush      | orange_bush4.png        | 1x2            | https://2minutetabletop.com/product/roadside-forest-tokens/  |
|<img src="world-builder/src/assets/forest/tree1.png" alt="Alt Text" height="60"/> | Tree             | tree1.png               | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/forest/tree2.png" alt="Alt Text" height="60"/> | Tree             | tree2.png               | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/forest/tree3.png" alt="Alt Text" height="60"/> | Tree             | tree3.png               | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/forest/tree4.png" alt="Alt Text" height="60"/> | Tree             | tree4.png               | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/forest/tree5.png" alt="Alt Text" height="60"/> | Tree             | tree5.png               | 2x2            | https://2minutetabletop.com/product/camp-tokens/             |
|<img src="world-builder/src/assets/forest/tree6.png" alt="Alt Text" height="60"/> | Tree             | tree6.png               | 2x2            | https://2minutetabletop.com/product/camp-tokens/             |

**Path Images:**
| **Image** | **Image Type** | **Image Name** | **Image Dims** | **Source Link**                                              |
|-----------|----------------|----------------|----------------|--------------------------------------------------------------|
|<img src="world-builder/src/assets/paths/path_dark.jpg" alt="Alt Text" height="60"/> | Path           | path_dark.jpg  | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |
|<img src="world-builder/src/assets/paths/path_light.jpg" alt="Alt Text" height="60"/>           | Path           | path_light.jpg | 1x1            | https://2minutetabletop.com/product/forest-floor-map-assets/ |

**Rock Images:**
| **Image** | **Image Type** | **Image Name**  | **Image Dims** | **Source Link**                                             |
|-----------|----------------|-----------------|----------------|-------------------------------------------------------------|
|<img src="world-builder/src/assets/rocks/clstr_rock1.png" alt="Alt Text" height="60"/> | Rock Cluster   | clstr_rock1.png | 2x1            | https://2minutetabletop.com/product/river-and-water-assets/ |
|<img src="world-builder/src/assets/rocks/clstr_rock2.png" alt="Alt Text" height="60"/> | Rock Cluster   | clstr_rock2.png | 2x1            | https://2minutetabletop.com/product/river-and-water-assets/ |
|<img src="world-builder/src/assets/rocks/clstr_rock3.png" alt="Alt Text" height="60"/> | Rock Cluster   | clstr_rock3.png | 2x1            | https://2minutetabletop.com/product/river-and-water-assets/ |
|<img src="world-builder/src/assets/rocks/lrg_rock1.png" alt="Alt Text" height="60"/> | Large Rock     | lrg_rock1.png   | 1x1            | https://2minutetabletop.com/product/roadside-forest-tokens/ |
|<img src="world-builder/src/assets/rocks/lrg_rock2.png" alt="Alt Text" height="60"/> | Large Rock     | lrg_rock2.png   | 1x1            | https://2minutetabletop.com/product/roadside-forest-tokens/ |
|<img src="world-builder/src/assets/rocks/lrg_rock3.png" alt="Alt Text" height="60"/> | Large Rock     | lrg_rock3.png   | 1x1            | https://2minutetabletop.com/product/roadside-forest-tokens/ |
|<img src="world-builder/src/assets/rocks/lrg_rock4.png" alt="Alt Text" height="60"/> | Large Rock     | lrg_rock4.png   | 2x2            | https://2minutetabletop.com/product/roadside-forest-tokens/ |
|<img src="world-builder/src/assets/rocks/sml_rock1.png" alt="Alt Text" height="60"/> | Small Rock     | sml_rock1.png   | 0.5x0.5        | https://2minutetabletop.com/product/roadside-forest-tokens/ |

**Building Images:**
| **Image** | **Image Type** | **Image Name**    | **Image Dims** | **Source Link**                                     |
|-----------|----------------|-------------------|----------------|-----------------------------------------------------|
|<img src="world-builder/src/assets/village/2x2_building.png" alt="Alt Text" height="60"/> | Building       | 2x2_building.png  | 2x2            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/2x2_roof_blue.png" alt="Alt Text" height="60"/> | Roof Blue      | 2x2_roof_blue.png | 2x2            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/2x2_roof_red.png" alt="Alt Text" height="60"/> | Roof Red       | 2x2_roof_red.png  | 2x2            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/2x3_building.png" alt="Alt Text" height="60"/> | Building       | 2x3_building.png  | 2x3            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/2x3_roof_blue.png" alt="Alt Text" height="60"/> | Roof Blue      | 2x3_roof_blue.png | 2x3            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/2x3_roof_red.png" alt="Alt Text" height="60"/> | Roof Red       | 2x3_roof_red.png  | 2x3            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/3x3_building.png" alt="Alt Text" height="60"/> | Building       | 3x3_building.png  | 3x3            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/3x3_roof_blue.png" alt="Alt Text" height="60"/> | Roof Blue      | 3x3_roof_blue.png | 3x3            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/3x3_roof_red.png" alt="Alt Text" height="60"/> | Roof Red       | 3x3_roof_red.png  | 3x3            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/4x4_building.png" alt="Alt Text" height="60"/> | Building       | 4x4_building.png  | 4x4            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/4x4_roof_blue.png" alt="Alt Text" height="60"/> | Roof Blue      | 4x4_roof_blue.png | 4x4            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/4x4_roof_red.png" alt="Alt Text" height="60"/> | Roof Red       | 4x4_roof_red.png  | 4x4            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/4x6_building.png" alt="Alt Text" height="60"/> | Building       | 4x6_building.png  | 4x6            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/4x6_roof_blue.png" alt="Alt Text" height="60"/> | Roof Blue      | 4x6_roof_blue.png | 4x6            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/4x6_roof_red.png" alt="Alt Text" height="60"/> | Roof Red       | 4x6_roof_red.png  | 4x6            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/5x5_building.png" alt="Alt Text" height="60"/> | Building       | 5x5_building.png  | 5x5            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/5x5_roof_blue.png" alt="Alt Text" height="60"/> | Roof Blue      | 5x5_roof_blue.png | 5x5            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/5x5_roof_red.png" alt="Alt Text" height="60"/> | Roof Red       | 5x5_roof_red.png  | 5x5            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/6x3_building.png" alt="Alt Text" height="60"/> | Building       | 6x3_building.png  | 6x3            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/6x3_roof_blue.png" alt="Alt Text" height="60"/> | Roof Blue      | 6x3_roof_blue.png | 6x3            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/6x3_roof_red.png" alt="Alt Text" height="60"/> | Roof Red       | 6x3_roof_red.png  | 6x3            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/6x8_building.png" alt="Alt Text" height="60"/> | Building       | 6x8_building.png  | 6x8            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/6x8_roof_blue.png" alt="Alt Text" height="60"/> | Roof Blue      | 6x8_roof_blue.png | 6x8            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/6x8_roof_red.png" alt="Alt Text" height="60"/> | Roof Red       | 6x8_roof_red.png  | 6x8            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/7x8_building.png" alt="Alt Text" height="60"/> | Building       | 7x8_building.png  | 7x8            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/7x8_roof_blue.png" alt="Alt Text" height="60"/> | Roof Blue      | 7x8_roof_blue.png | 7x8            | https://2minutetabletop.com/product/buildings-pack/ |
|<img src="world-builder/src/assets/village/7x8_roof_red.png" alt="Alt Text" height="60"/> | Roof Red       | 7x8_roof_red.png  | 7x8            | https://2minutetabletop.com/product/buildings-pack/ |

**Water Images:**
| **Image** | **Image Type** | **Image Name** | **Image Dims** | **Source Link**                                             |
|-----------|----------------|----------------|----------------|-------------------------------------------------------------|
|<img src="world-builder/src/assets/water/bridge.png" alt="Alt Text" height="60"/> | Bridge         | bridge.png     | 2x1            | https://2minutetabletop.com/product/river-and-water-assets/ |
|<img src="world-builder/src/assets/water/water_rock.png" alt="Alt Text" height="60"/> | Water Rock     | water_rock.png | 2x1            | https://2minutetabletop.com/product/river-and-water-assets/ |
|<img src="world-builder/src/assets/water/water.jpg" alt="Alt Text" height="60"/> | Water          | water.jpg      | 1x1            | https://2minutetabletop.com/product/river-and-water-assets/ |
|<img src="world-builder/src/assets/water/waterfall.png" alt="Alt Text" height="60"/> | Waterfall      | waterfall.jpg  | 2x1            | https://2minutetabletop.com/product/river-and-water-assets/ |

#### 3.3.3 Graphics Algorithm

Our React code will receive the map layout from the Java algorithm in the form of a 2D array. We will need to create a method that will interpret the array codes into the relevant images and React components. 

Additionally, we will need to write an algorithm that will ensure the corners, lighting and backgrounds are consistent. For example, if we generate a house, we will need to ensure that the walls are expressed as a line, and corners expressed as a right angle etc. 

Each graphical element could be different dimensions or take up different areas. Including a JSON file with each of the images metadata could make the algorithm easier. 

**How will we display the relevant backgrounds?**

The transparent elements need to have relevant backgrounds displayed behind them. These transparent elements include Trees & Bushes, Stones, Campfires, Flowers, Leaves and Building Edges.

Consider the following 2D array, where 1 = grass and x = a bush:

	[1, 1, 1],
	[1, x, 1],
	[1, 1, 1]

In this example, the obvious choice for x’s background is 1. Therefore, sampling any of the surrounding squares for the background would have sufficed. 

However, considering the following example, where 1 = grass, 2 = path and x = a bush: 

    [1, 1, 1],
	[1, x, 2],
	[1, 1, 2]

The logical background choice would still be 1, but 2 may be chosen. Therefore, although more complicated, a voting system that considers the 8 surrounding squares would create more accurate backgrounds.

Here is an example of a possible algorithm:
	
	const 2dArray;
	const votingMap;
	const transElement;

	for x in len 2dArray:
		for y in len 2dArray[x]:
			If 2dArray[x][y] == transElement:  // If it is the middle element
			        continue
			If 2dArray[x][y] in votingMap: // Key value in map
				votingMap[2dArray[x][y]] ++ 
			else: // Key value not in map
				votingMap[2dArray[x][y]] = 1
	
        const backgroundValue;
        const maxVote = Math.minValue;
        for value in votingMap:
	    If value > maxVote:
		backgroundValue = votingMap[value]

The link for this relevant issue can be seen [here](https://gitlab.ecs.vuw.ac.nz/richeshayd/world-builder/-/issues/6).

**How will we display the corners of buildings and paths?**

Elements such as caves and buildings should have their edges and corners displayed properly. The perimeter of buildings should have walls and appropriate corners at the edges.
There will need to be images for the following: No Wall, Wall on Left, Wall on Right, Wall on Top, Wall on Bottom, Right angle or curve on Top Right, Right angle or curve on Top Left, Right angle or curve on Bottom Right, Right angle or curve on Bottom Left.

Examples of this can be seen in the following where O = grass and X = building. 

    [O, O, X],
    [O, O, X],
    [O, O, X],

In this matrix, all of the building tiles should be displayed as ‘Wall on Left’. 

    [O, O, O],
    [O, **X**, _X_],
    [O, ~~X~~, X],

In this matrix, the **X** should be ‘Right angle or curve on Top Left’, the _X_
should be ‘Wall on Top’, the ~~X~~ should be ‘Wall on Left’ and the regular X should be
‘No Wall’.

The link for this relevant issue can be seen [here](https://gitlab.ecs.vuw.ac.nz/richeshayd/world-builder/-/issues/8).

**How will we display the features at their relevant size?**

Some elements, such as tents, should be displayed over multiple squares. In other words, larger elements that can't be broken into individual repeatable squares should be displayed over many squares. To solve this, a JSON file should be created to record the dimensions that should be used for each of the images.

The link for this relevant issue can be seen [here](https://gitlab.ecs.vuw.ac.nz/richeshayd/world-builder/-/issues/7).

**How will we display a range of e.g. Trees and Bushes?**

To make the graphical interface more interesting, there should be a range of trees, bushes, rocks etc. instead of the same image repeated over and over.
To do this, there should be a range of different tree images that can be selected at random to be displayed. It could also be wise to rotate the images to create diversity.


The link for this relevant issue can be seen [here](https://gitlab.ecs.vuw.ac.nz/richeshayd/world-builder/-/issues/9).

##### 3.3.3.1 Image Codes and Ids

| **Code** | **Image Desc** | **Image Dims** |
|----------|----------------|----------------|
| 0        | Background     | 1x1            |
| 1        | Bush           | 1x1            |
| 2        | Tree           | 2x2            |
| 3        | Rock Small     | 1x1            |
| 4        | Rock Cluster   | 2x1            |
| 5        | 2x2 Building   | 2x2            |
| 6        | 2x3 Building   | 2x3            |
| 7        | 3x3 Building   | 3x3            |
| 8        | 4x4 Building   | 4x4            |
| 9        | 4x6 Building   | 4x6            |
| 10       | 5x5 Building   | 5x5            |
| 11       | 6x3 Building   | 6x3            |
| 12       | 6x8 Building   | 6x8            |
| 13       | 7x8 Building   | 7x8            |
| 14       | Path           | 1x1            |
| 15       | Small Cave     | Refer to 'Cave Dim' table |
| 16       | Medium Cave     | Refer to 'Cave Dim' table |
| 17       | Large Cave     | Refer to 'Cave Dim' table |
| 18       | Massive Cave     | Refer to 'Cave Dim' table |
| 19       | Small Tent     | 1x2            | 
| 20       | Medium Tent    | 2x2            |
| 21       | Camp Fire      | 1x1            | 
| 22       | Camp Accessories  | 1x2         |
| 23       | Large Tent     | 3x3            |

**Cave Dims Table**

In the below table, a zero represents not a cave, and a one represents cave.
| **Code** | **Image Desc** | **Image Dims** |
|----------|----------------|----------------|
| 15        | Small         | [[0, 1, 1, 1, 0, 0, 0],[0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0]]|
| 16        | Med           | [[0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0, 0],[0, 0, 1, 1, 1, 1, 0, 0, 0]]            |
| 17        | Large         | [[0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]]            |
| 18        | Massive       | [[0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 11, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0] ]            |


#### 3.3.4 Hero Animation
For the Home/Welcome page of the website, a simple animation will play as the background. We will need to design a simple animation of a map for this section that helps capture the users attention. This will simply be done by iterating through an array of images in the background. Title text and relevant buttons should be incorporated into this design. 


#### 3.3.5 Relevant Graphics Risk

**Time Risks**

The progress of the front end development can be very dependant on the development of the back end. If the map algorithm takes longer than expected to complete, it will limit the amount of time to work on the graphics. To mitigate this risk, a series of 'test maps' will be manually created to test the graphics.

The following 2D array is an example of one of the 'test maps':

    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,6,1,3,3,3,1,1,1],
    [1,1,1,1,1,5,5,5,1,6,1,1,1,1,1,1,6,1,1,3,3,3,1,1,1],
    [1,1,1,1,5,5,5,5,5,1,1,1,9,9,1,6,1,6,3,3,3,3,3,1,1],
    [1,1,1,1,5,5,5,5,5,1,6,1,9,9,1,1,6,1,3,3,3,3,3,1,1],
    [2,1,1,1,5,5,5,5,5,1,1,1,9,9,1,1,1,6,3,3,3,3,3,1,1],
    [2,2,1,6,1,5,5,5,1,6,1,1,1,1,1,1,6,1,3,3,3,3,3,1,1],
    [1,2,1,1,1,6,4,1,6,1,9,9,1,10,1,1,1,6,1,3,3,3,1,1,1],
    [1,2,1,1,6,1,4,1,1,6,9,9,1,1,1,1,1,1,1,1,2,1,1,1,1],
    [1,2,1,1,1,6,4,6,1,1,1,1,1,1,1,1,1,1,6,1,2,1,1,1,1],
    [1,2,1,6,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1],
    [1,2,1,1,1,1,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1,1,7,1],
    [1,2,1,1,2,2,2,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,7,1,1],
    [1,2,2,2,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,8,1],
    [1,2,1,1,1,1,1,1,2,2,2,1,3,3,1,1,1,1,1,1,1,1,8,8,1],
    [1,2,1,1,1,1,1,1,2,1,1,1,3,3,1,1,1,1,1,1,1,7,8,1,1],
    [1,2,2,1,1,1,2,2,2,1,1,1,3,3,3,3,3,1,1,1,8,8,8,1,1],
    [1,1,2,1,1,1,2,1,1,1,1,1,3,3,3,3,3,1,1,8,8,1,1,1,1],
    [1,1,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

A colour coded visualisation of the above map can been seen [here](https://docs.google.com/spreadsheets/d/1M1OSNw0pPQahYeOznh_cZh4F-n-PmZVOwYIwn-PXrhk/edit?usp=share_link).

**Licencing Risks**

BLAH BLAH BLAH


## 4.0 Project Management Methodology
Our group will work under an Agile project management methodology. This will involve two-week long sprints whereby each team member will work independently on an Issue. We will structure our meetings around Sprints, with each Sprint involving a Sprint Planning, Sprint Retro, and Stand-Ups.

Work items will be structured as Issues in GitLab, with code to be merged into the main branch of the repository through merge requests built off of the Issue. Each Sprint will have a To-Do of Issues to be completed, with Issues to be completed further down the line stored in a Backlog. This will all be structured on a KanBan board in GitLab.

**Meetings:**
- Sprint Planning (2-weekly).
- Sprint Retrospective (2-weekly).
- Stand-Ups (During Sprints as needed).
- Attend weekly meetings with client

**Will the meeting notes be recorded?**

Yes.... 

These can be found here... 

## 5.0 Project Tools
Our group intends to employ a combination of programming languages to complete this map generator project. Java will be utilised for implementing the general algorithm and other backend requirements, while React will serve as the platform for displaying and hosting the website. Depending on the complexity of the interactions between the two languages, we may opt to code purely in React or Java. Ideally, we would host this website once the project is successfully completed. 

Our group will utilise GitLab for version control and task assignment as we have a strong proficiency with GitLab from past experiences and projects. GitLab’s scope and time management tools will help facilitate communication and collaboration within the team, and establish clear milestones that can be easily communicated with stakeholders. 


## 6.0 Relevant Risk

### 6.1 Tools and Techniques Risks
Throughout the project, we will assess the performance of each of the tools chossen. If we are having problems with any of them, we will need to evaluate as a group if the benefits of changing outweigh the cost and risk. There may also be extensions and practices we can incorporate to minimise these limitations. 

Some examples of questions we should reflect on include:
- What are the main limitations we have found with ‘current tool’? How have these limitations affected our goals?
- Do the benefits of changing from ‘current tool’  to ‘new tool’ outweigh the cost of changing?
- If no to the above, how can we change our workflow in the ‘current tool’ to improve our efficiency?
- How can we change how we are using ‘current tool’ to minimise its limitations?


### 6.2 Group Memeber Risks

#### 6.2.1 Group Role Assignment Risks

We may need to re-assign roles according to the progress made in each area. For example, if the majority of the website is completed and the algorithm is behind, we may change a front end developer to back end. 

Some examples of questions we could reflect on include:
- Is ‘current section’ on track and meeting its goals in an expected time frame?
- If no to the above, are there human resources from other sections that we can reassign to help?
- Are there any new sections or challenges that have arisen and would require more human resources than expected?
- Are each of the team members happy with their current role?

#### 6.2.2 Group Involvement Risks

There is a risk of some group members may not be pulling their weight or missing out on important meetings. This could lead to an overall decline in progress on our project goals. 

To mitigate this risk, we should the consider the following:
- Keep detailed meeting notes, so that members who missed it can catch up.
- Have detailed comments and javadocs in our code so that members who missed coding sessions will be able to easily interpret it. 
- If group members repeatably miss sessions, reach out to them and ask if there is anything we can do to help them attend meetings.

### 6.3 Time Management Risks
As a group, we will reflect on our current time management strategy to assess its effectiveness. This involves our experiences with the time sprints, frequency of meeting with the stakeholder, and the agile manifesto as a whole. 

Some examples of questions we could reflect on include:
- Is the current length of the sprints effective? Would we benefit from them being longer/shorter?
- Are the current number of meetings effective? Would we benefit from more/less?
- Are the current number of stakeholder meetings effective? Would we benefit from more/less?
- Overall, does the agile project management methodology work for us as a group? Are there other management methodologies that could be more effective?
- Is GitLab an adequate tool for us to manage our time and tasks? 

### 6.4 Functionality Risk

We will also need to review the overall functionality and progress with the algorithm and website. If we are behind schedule, we will need to prioritise requirements based on stakeholder feedback. Whereas if we are ahead, additional features mentioned above can be chosen to incorporate. 

Some examples of questions we could reflect on include:
- Is ‘current section’ on track and meeting its goals in an expected time frame?
- If yes, what are some new features associated with the ‘current section’ that we can work on once it is completed?
- If no, then as a group, what is preventing us from timely completing our goals and what do we need to prioritise moving forward?


## 7.0 Group Roles
| Name            | Contact                  | Role      |
|-----------------|--------------------------|-----------|
| Calvin Li       | licalv@myvuw.ac.nz       | Full Stack|
| Milan Kriletich | kriletmila@myvuw.ac.nz   | Back End  |
| Ella Wipatene   | wipateella@myvuw.ac.nz   | Front End / Design |
| Amir Mandalawi  | mandalamir@mywuw.ac.nz   | Back End  |
| Hayden Riches   | richeshayd@myvuw.ac.nz   | Back End  |
| Annie Cho       | choanni@myvuw.ac.nz      | Full Stack|
