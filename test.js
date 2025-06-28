const { data = {}, result } = ruleExecutionResult;
const checkpointName = entity.checkpointEntry.checkpointName;
if (
  (checkpointName === "WSD_WB04_Entry1" ||
    checkpointName === "WSD_WB04_Entry2" ||
    checkpointName === "WSD_WB03_Entry1" ||
    checkpointName === "WSD_WB03_Entry2" ||
    checkpointName === "WSD_WB02_Entry1" ||
    checkpointName === "WSD_WB02_Entry2" ||
    checkpointName === "WSD_WB01_Entry1" ||
    checkpointName === "WSD_WB01_Entry2") &&
  result === "SUCCESS"
) {
  return true;
} else {
  return false;
}
