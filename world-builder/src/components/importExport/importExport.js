import React, { useEffect, useContext } from "react";
import styles from "./importExport.module.css"; // Import your CSS module
import { Button } from "@mui/material";
import { WorldDataContext } from "../../context/worldDataContext";
import { useFilePicker } from "use-file-picker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImportExport = () => {
  const { worldData, loading, setWorldData } = useContext(WorldDataContext);
  const { openFilePicker, filesContent, load } = useFilePicker({
    accept: ".json",
  });

  const notifySuccess = (message) => toast.success(message);

  const downloadJSON = () => {
    if (worldData) {
      const jsonData = JSON.stringify(worldData);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const date = new Date().toISOString();
      const a = document.createElement("a");
      a.href = url;
      a.download = "worldData-" + date + ".json";
      a.click();
      window.URL.revokeObjectURL(url);
      notifySuccess("Successfully exported JSON file");
    }
  };

  useEffect(() => {
    if (filesContent.length > 0) {
      let content = JSON.parse(filesContent[0].content);
      setWorldData(content, false);
      notifySuccess("Successfully imported JSON file");
    }
  }, [filesContent]);

  if (load) {
    setWorldData(worldData, true);
  }

  return (
    <div className={styles.body}>

      <div className={styles.configContent}>
      <ToastContainer autoClose={2000}/>

        <h2><b>IMPORT / EXPORT</b></h2>
        <div className={styles["button-container"]}>
          <div className={styles.button}>
            <Button variant="outlined" onClick={downloadJSON}>
              EXPORT
            </Button>
          </div>
          <div className={styles.button}>
            <Button variant="outlined" onClick={() => openFilePicker()}>
              IMPORT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExport;
