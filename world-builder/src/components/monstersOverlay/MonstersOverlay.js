import "./MonsterOverlay.css";
import { allImages } from "../../grids/Constants";

const MonstersOverlay = ({monsterName, monsterRank, monsterSTR, monsterDEX, monsterCON, monsterINT, enviro, rankInt}) => {

    const houseMonsters = {
        1: allImages.houseMonsterImages.house1,
        2: allImages.houseMonsterImages.house2,
        3: allImages.houseMonsterImages.house3,
        4: allImages.houseMonsterImages.house4,
    };

    const forestMonsters = {
        1: allImages.monsterImages.cat,
        2: allImages.monsterImages.fairy,
        3: allImages.monsterImages.monkey,
        4: allImages.monsterImages.snake,
    };

    const caveMonsters = {
        1: allImages.monsterImages.skeleton,
        2: allImages.monsterImages.skeleton,
        3: allImages.monsterImages.skeleton,
        4: allImages.monsterImages.skeleton,
    };

    const monsterImageMaps = [houseMonsters, caveMonsters, forestMonsters];


    return (
        <div className="body">
            <div className="monster-container">
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
                    <h4>0.1</h4>
                    <h4>0.4</h4>
                </div>

                <hr></hr>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
            </div>

            
        </div>
    )
};

export default MonstersOverlay;