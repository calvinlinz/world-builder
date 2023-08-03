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

### 1.3 Out of Scope

- A multiplayer web-based game.

## 2.0 Back End
### 2.1 Tools and Language Choice

### 2.2 Algorithm
Our Map will consist of 8 diffrent quadrants. In each of the qaudruants we will randomly generate pre defined rooms, natrual features and backgrounds. Once we have randomly generated these elements we will ensure they are spaced out and not overlapping. Once this has been achived we will ensure all elemnts are accesible by linking them with paths. Every element on the map will have a unique id and this is to ensure the graphics team can determine how to render each tile on the map. 

The map will be stored in a 2D array with each cell containing an element id. The pre defined elements must be limited in size based on the size of the qaudruants. By using pre defined elemetns we can ensure that all rooms, natrual features and backgrounds fit the theme of dungeons and dragons and look realistc.


### 2.3 Data Storage

## 3.0 Front End
The front end of this project will be expressed as a website using React. 

### 3.1 Tools and Language Choice

### 3.2 Web Features
Our Dungeons and Dragons random map generator website will incorporate an array of essential features that seamlessly interact with the generated maps. The user interface should prioritize user-friendliness, allowing both novice and seasoned players to effortlessly navigate and manipulate the maps.

This section is split into the following topics:
- 3.2.1 Encourperated Features
- 3.2.2 User Interface and Usability

#### 3.2.1 Encourperated Features
Our website must encourperate the features requested by the stakeholder that our outlined in our MVP. 

**How will the user be able to download the map?**

**How will the user be able to share the map?**

**How will the user be able to select the map size?**

**How will the dungeon master be able to view the monsters?**

**How will the user be able to control the fog parameters?**

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

FIGURE OUT ALGORITHM AND WRITE IT HERE!

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
