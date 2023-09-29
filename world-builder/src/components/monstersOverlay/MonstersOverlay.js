import "./MonsterOverlay.css";
import { allImages } from "../../grids/Constants";

const MonstersOverlay = ({monsterName, monsterRank, monsterSTR, monsterDEX, monsterCON, monsterINT, monsterWIS, monsterCHA, enviro, rankInt, optionOne, optionTwo, strText, dex1Text, dex2Text, 
                        con1Text, con2Text, fillerText, int1Text, int2Text, wis1Text, wis2Text, cha1Text, cha2Text}) => {

    const houseMonsters = {
        1: allImages.houseMonsterImages.house4,
        2: allImages.houseMonsterImages.house3,
        3: allImages.houseMonsterImages.house2,
        4: allImages.houseMonsterImages.house1,
    };

    const forestMonsters = {
        1: allImages.monsterImages.snake,
        2: allImages.monsterImages.monkey,
        3: allImages.monsterImages.cat,
        4: allImages.monsterImages.fairy,
    };

    const caveMonsters = {
        1: allImages.monsterImages.skeleton,
        2: allImages.monsterImages.bat,
        3: allImages.monsterImages.rat,
        4: allImages.monsterImages.insect,
    };

    const monsterImageMaps = [houseMonsters, caveMonsters, forestMonsters];

    const paragraphStyle = {
        fontSize: '12.7px',
        fontWeight: 'normal',
        margin: '18px',
      };

    return (
        <div className="body">
            <div className="monster-container" id="monsterBox">
                <img
                    src={allImages.monsterImages.shadow}
                    alt={`Monster Image`}
                    style={{
                        height: '20vh',
                        opacity: '0.8',
                        }}
                />

                <img
                    src={monsterImageMaps[enviro][rankInt]}
                    alt={`Monster Image`}
                    class="overlay-image"
                    style={{
                        height: '15vh',
                        }}
                />

                <h1>{monsterName}</h1>
                <h2>{monsterRank}</h2>

                <hr></hr>
                <div style={{
                        margin: '0px 5px',
                        }}>
                    <h3>STR</h3>
                    <h3>DEX</h3>
                    <h3>CON</h3>
                    <h3>INT</h3>
                    <h3>WIS</h3>
                    <h3>CHA</h3>
                </div>

                <div style={{
                        margin: '0px 5px',
                        }}>
                    <h4>{monsterSTR}</h4>
                    <h4>{monsterDEX}</h4>
                    <h4>{monsterCON}</h4>
                    <h4>{monsterINT}</h4>
                    <h4>{monsterWIS}</h4>
                    <h4>{monsterCHA}</h4>
                </div>

                <hr></hr>
                
                <p style={paragraphStyle}>{monsterName}. A {optionOne} creature that {optionTwo}. 
                    Its strength is {strText}, so watch your back. This {dex1Text} monster is {dex2Text}. When it comes to constitution, {monsterName} is 
                    exceptionally {con1Text}, with ability to endure {con2Text}. {fillerText}. The monster exhibits {int1Text} intellect, 
                    allowing it to devise {int2Text} strategies in an attempt to mislead you. Its {wis1Text} wisdom also makes this {wis2Text} opponent. 
                    Lastly, its {cha1Text} nature is a defining trait of this monster. It’s presence {cha2Text}.
                </p>
            </div>

            
        </div>
    )
};

export default MonstersOverlay;