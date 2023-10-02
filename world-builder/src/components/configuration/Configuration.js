import React, { useState, useContext,useEffect } from "react";
import styles from "./configuration.module.css"; // Import your CSS module
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import "../../grids/Grid.css";
import MonstersOverlay from "../monstersOverlay/MonstersOverlay";
import { WorldDataContext } from "../../context/worldDataContext";
import { getMonsterCords } from "../../grids/CalculatePositions";
import emailjs, { send } from "@emailjs/browser";
emailjs.init("VDupAfE4CYPyVT2Ry");

const ConfigDropdown = ({
  gridSize,
  setGridSize,
}) => {
  const { worldData, roofOpacity, caveOpacity, setRoofOpacity, setCaveOpacity} = useContext(WorldDataContext);
  const [selectedMonsterOption, setSelectedMonsterOption] = useState("none");

  // -- Handle Monster Change -------
  const handleSelectChange = (e) => {
    setSelectedMonsterOption(e.target.value);
  };

  const handleRoofs = (e) =>{
    const newValue = roofOpacity == 1 ? 0 : 1;
    setRoofOpacity(newValue)
  }

  const handleCaves = (e) =>{
    const newValue = caveOpacity == 1 ? 0 : 1;
    setCaveOpacity(newValue);
  }

  let contentToRender;
  const allMonsterCords = getMonsterCords(worldData);


  const bossOptionOneMap = {
    0: 'formidable', 
    1: 'terrifying', 
    2: 'daunting', 
    3: 'disturbing', 
    4: 'powerful',
};

const hardOptionOneMap = {
    0: 'forceful', 
    1: 'vigorous', 
    2: 'resilient', 
    3: 'hardy', 
    4: 'daunting',
};

const mediumOptionOneMap = {
    0: 'energetic', 
    1: 'durable', 
    2: 'mighty', 
    3: 'monstrous', 
    4: 'strong',
};

const easyOptionOneMap = {
    0: 'simple', 
    1: 'feisty', 
    2: 'mild', 
    3: 'alarming', 
    4: 'eerie',
};

const optionOneMap = {
    '1': bossOptionOneMap[Math.floor(Math.random() * 5)],
    '2': hardOptionOneMap[Math.floor(Math.random() * 5)],
    '3': mediumOptionOneMap[Math.floor(Math.random() * 5)],
    '4': easyOptionOneMap[Math.floor(Math.random() * 5)],
};

const optionTwoMap = {
    '1': 'you definitely do not want to cross paths with',
    '2': 'you definitely do not want to cross paths with',
    '3': 'will prove a challenge to overcome',
    '4': 'will prove a challenge to overcome',
};

const strMap = {
  0: 'middling, but its strengths lie in its other skills',
  1: 'middling, but its strengths lie in its other skills',
  2: 'middling, but its strengths lie in its other skills',
  3: 'middling, but its strengths lie in its other skills',
  4: 'middling, but its strengths lie in its other skills',
  5: 'immense, and allows it to put up a vicious fight',
  6: 'immense, and allows it to put up a vicious fight',
  7: 'immense, and allows it to put up a vicious fight',
  8: 'immense, and allows it to put up a vicious fight',
  9: 'immense, and allows it to put up a vicious fight',
};

const lrgDexMap = {
  0: 'quick', 
  1: 'agile', 
  2: 'swift', 
  3: 'nimble',
};

const smlDexMap = {
  0: 'clumsy', 
  1: 'heavy-footed', 
  2: 'slow', 
  3: 'steady',
};

const dex1Map = {
  0: smlDexMap[Math.floor(Math.random() * 4)],
  1: smlDexMap[Math.floor(Math.random() * 4)],
  2: smlDexMap[Math.floor(Math.random() * 4)],
  3: smlDexMap[Math.floor(Math.random() * 4)],
  4: smlDexMap[Math.floor(Math.random() * 4)],
  5: lrgDexMap[Math.floor(Math.random() * 4)],
  6: lrgDexMap[Math.floor(Math.random() * 4)],
  7: lrgDexMap[Math.floor(Math.random() * 4)],
  8: lrgDexMap[Math.floor(Math.random() * 4)],
  9: lrgDexMap[Math.floor(Math.random() * 4)],
};

const dex2Map = {
  0: 'on the slower side, but a formidable opponent regardless',
  1: 'on the slower side, but a formidable opponent regardless',
  2: 'on the slower side, but a formidable opponent regardless',
  3: 'on the slower side, but a formidable opponent regardless',
  4: 'on the slower side, but a formidable opponent regardless',
  5: 'surprisingly fast, and can easily dodge attacks',
  6: 'surprisingly fast, and can easily dodge attacks',
  7: 'surprisingly fast, and can easily dodge attacks',
  8: 'surprisingly fast, and can easily dodge attacks',
  9: 'surprisingly fast, and can easily dodge attacks',
};

const lrgConMap = {
  0: 'tough', 
  1: 'resilient', 
};

const smlConMap = {
  0: 'soft', 
  1: 'inflexible', 
};

const con1Map = {
  0: smlConMap[Math.floor(Math.random() * 2)],
  1: smlConMap[Math.floor(Math.random() * 2)],
  2: smlConMap[Math.floor(Math.random() * 2)],
  3: smlConMap[Math.floor(Math.random() * 2)],
  4: smlConMap[Math.floor(Math.random() * 2)],
  5: lrgConMap[Math.floor(Math.random() * 2)],
  6: lrgConMap[Math.floor(Math.random() * 2)],
  7: lrgConMap[Math.floor(Math.random() * 2)],
  8: lrgConMap[Math.floor(Math.random() * 2)],
  9: lrgConMap[Math.floor(Math.random() * 2)],
};

const con2Map = {
  0: 'several attacks before defeat',
  1: 'several attacks before defeat',
  2: 'several attacks before defeat',
  3: 'several attacks before defeat',
  4: 'several attacks before defeat',
  5: 'physical and magical assaults like a tank',
  6: 'physical and magical assaults like a tank',
  7: 'physical and magical assaults like a tank',
  8: 'physical and magical assaults like a tank',
  9: 'physical and magical assaults like a tank',
};

const fillerMap = {
  0: 'Look into its eyes and gather the courage for battle (or friendship, if you dare)',
  1: 'You are a versatile fighter but this monster is still a threat',
  2: 'Do not take this monster lightly; it might prove to be a more formidable opponent than expected',
  3: 'Do not get complacent; this monster has tricks up its sleeve'
};

const lrgIntMap = {
  0: 'remarkable', 
  1: 'astonishing', 
  2: 'impressive', 
  3: 'terrifying', 
  4: 'applaudable',
};

const smlIntMap = {
  0: 'below-average', 
  1: 'decent', 
  2: 'fair', 
  3: 'smart', 
};

const int1Map = {
  0: smlIntMap[Math.floor(Math.random() * 4)],
  1: smlIntMap[Math.floor(Math.random() * 4)],
  2: smlIntMap[Math.floor(Math.random() * 4)],
  3: smlIntMap[Math.floor(Math.random() * 4)],
  4: smlIntMap[Math.floor(Math.random() * 4)],
  5: lrgIntMap[Math.floor(Math.random() * 5)],
  6: lrgIntMap[Math.floor(Math.random() * 5)],
  7: lrgIntMap[Math.floor(Math.random() * 5)],
  8: lrgIntMap[Math.floor(Math.random() * 5)],
  9: lrgIntMap[Math.floor(Math.random() * 5)],
};

const lrgIntMap2 = {
  0: 'cunning', 
  1: 'sly', 
  2: 'manipulative', 
  3: 'mind-numbing', 
};

const smlIntMap2 = {
  0: 'tricky', 
  1: 'dishonest', 
  2: 'cheeky', 
  3: 'bold', 
};

const int2Map = {
  0: smlIntMap2[Math.floor(Math.random() * 4)],
  1: smlIntMap2[Math.floor(Math.random() * 4)],
  2: smlIntMap2[Math.floor(Math.random() * 4)],
  3: smlIntMap2[Math.floor(Math.random() * 4)],
  4: smlIntMap2[Math.floor(Math.random() * 4)],
  5: lrgIntMap2[Math.floor(Math.random() * 4)],
  6: lrgIntMap2[Math.floor(Math.random() * 4)],
  7: lrgIntMap2[Math.floor(Math.random() * 4)],
  8: lrgIntMap2[Math.floor(Math.random() * 4)],
  9: lrgIntMap2[Math.floor(Math.random() * 4)],
};

const smlWisMap = {
  0: 'a knowledgeable',
  1: 'an astute',  
  2: 'a clever',
  3: 'an experienced',
  4: 'an insightful',
};

const lrgWisMap = {
  0: 'a unseemingly perceptive', 
  1: 'a rash', 
  2: 'a reckless', 
  3: 'a short-sighted',

};

const wis1Map = {
  0: 'low',
  1: 'low',
  2: 'low',
  3: 'low',
  4: 'low',
  5: 'high',
  6: 'high',
  7: 'high',
  8: 'high',
  9: 'high',
};

const wis2Map = {
  0: smlWisMap[Math.floor(Math.random() * 5)],
  1: smlWisMap[Math.floor(Math.random() * 5)],
  2: smlWisMap[Math.floor(Math.random() * 5)],
  3: smlWisMap[Math.floor(Math.random() * 5)],
  4: smlWisMap[Math.floor(Math.random() * 5)],
  5: lrgWisMap[Math.floor(Math.random() * 5)],
  6: lrgWisMap[Math.floor(Math.random() * 5)],
  7: lrgWisMap[Math.floor(Math.random() * 5)],
  8: lrgWisMap[Math.floor(Math.random() * 5)],
  9: lrgWisMap[Math.floor(Math.random() * 5)],

};

const smlChaMap = {
  0: 'apathetic', 
  1: 'uninspired', 
  2: 'bland', 
  3: 'repellent', 
  4: 'avoidant',
};

const lrgChaMap = {
  0: 'magnetic', 
  1: 'charming', 
  2: 'charismatic', 
  3: 'compelling', 
  4: 'persuasive',
};

const cha1Map = {
  0: smlChaMap[Math.floor(Math.random() * 5)],
  1: smlChaMap[Math.floor(Math.random() * 5)],
  2: smlChaMap[Math.floor(Math.random() * 5)],
  3: smlChaMap[Math.floor(Math.random() * 5)],
  4: smlChaMap[Math.floor(Math.random() * 5)],
  5: lrgChaMap[Math.floor(Math.random() * 5)],
  6: lrgChaMap[Math.floor(Math.random() * 5)],
  7: lrgChaMap[Math.floor(Math.random() * 5)],
  8: lrgChaMap[Math.floor(Math.random() * 5)],
  9: lrgChaMap[Math.floor(Math.random() * 5)],
};

const smlChaMap2 = {
  0: 'is unassuming and lacks an air of authority. It may go unnoticed, hidden, in a crowd',
  1: 'does not inspire respect. Instead, this monster might be met with indifference when encountered',
  2: 'lacks the ability to manipulate others, so this monster may rely on more straightforward methods, or even brute force..',
};

const lrgChaMap2 = {
  0: 'is commanding and exudes an aura of authority',
  1: 'instills fear or respect in those who encounter it',
  2: 'allows it to manipulate or charm others to achieve its goals',
};

const cha2Map = {
  0: smlChaMap2[Math.floor(Math.random() * 3)],
  1: smlChaMap2[Math.floor(Math.random() * 3)],
  2: smlChaMap2[Math.floor(Math.random() * 3)],
  3: smlChaMap2[Math.floor(Math.random() * 3)],
  4: smlChaMap2[Math.floor(Math.random() * 3)],
  5: lrgChaMap2[Math.floor(Math.random() * 3)],
  6: lrgChaMap2[Math.floor(Math.random() * 3)],
  7: lrgChaMap2[Math.floor(Math.random() * 3)],
  8: lrgChaMap2[Math.floor(Math.random() * 3)],
  9: lrgChaMap2[Math.floor(Math.random() * 3)],
};


  if (selectedMonsterOption === "none") {
    contentToRender = <div></div>;
  } else {
    let rankVal = "Easy Monster";

    if (selectedMonsterOption.rank === 1) {
      rankVal = "Boss Monster";
    } else if (selectedMonsterOption.rank === 2) {
      rankVal = "Hard Monster";
    } else if (selectedMonsterOption.rank === 3) {
      rankVal = "Medium Monster";
    }

    contentToRender = (
      <MonstersOverlay
        className={styles.monsterContent} 
        monsterName={selectedMonsterOption.name}
        monsterRank={rankVal}
        monsterSTR={"0." + selectedMonsterOption.str}
        monsterDEX={"0." + selectedMonsterOption.dex}
        monsterCON={"0." + selectedMonsterOption.con}
        monsterINT={"0." + selectedMonsterOption.int}
        monsterWIS={"0." + selectedMonsterOption.wis}
        monsterCHA={"0." + selectedMonsterOption.cha}
        enviro={selectedMonsterOption.environment}
        rankInt={selectedMonsterOption.rank}
        optionOne={optionOneMap[selectedMonsterOption.rank]}
        optionTwo={optionTwoMap[selectedMonsterOption.rank]}
        strText={strMap[selectedMonsterOption.str]}
        dex1Text={dex1Map[selectedMonsterOption.dex]}
        dex2Text={dex2Map[selectedMonsterOption.dex]}
        con1Text={con1Map[selectedMonsterOption.con]}
        con2Text={con2Map[selectedMonsterOption.con]}
        fillerText={fillerMap[Math.floor(Math.random() * 4)]}
        int1Text={int1Map[selectedMonsterOption.int]}
        int2Text={int2Map[selectedMonsterOption.int]}
        wis1Text={wis1Map[selectedMonsterOption.wis]} 
        wis2Text={wis2Map[selectedMonsterOption.wis]} 
        cha1Text={cha1Map[selectedMonsterOption.cha]} 
        cha2Text={cha2Map[selectedMonsterOption.cha]} 
        setSelectedMonsterOption={setSelectedMonsterOption}
      />
    );
  }

  return (
    <div className={styles.body}>
      <div className={styles.configContent}>
      <h2><b>CONFIGURATION</b></h2>
        <div className={styles.sliderComponent}>
          <p><b>GRID SIZE</b></p>
          <div className={styles.slider}>
            <Slider
              defaultValue={gridSize}
              aria-label="Small"
              valueLabelDisplay="auto"
              min={27}
              max={45}
              onChange={(e) => setGridSize(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="SHOW/HIDE ROOFS"
              onChange={handleRoofs}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="SHOW/HIDE CAVES"
              onChange={handleCaves}
            />
          </FormGroup>
        </div>
        <FormControl>
          <p><b>VIEW MONSTER STATS</b></p>
          <Select
            value={selectedMonsterOption}
            onChange={handleSelectChange}
            style={{
              color: "#000000",
              borderColor: "#000000",
              borderWidth: "1px",
              margin: "0px 0px 30px 0px",
            }}
          >
            <MenuItem value="none">None</MenuItem>
            {allMonsterCords.map((monsterCord, index) => (
              <MenuItem key={index} value={monsterCord}>
                {monsterCord.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {contentToRender}
    </div>
  );
};

export default ConfigDropdown;
