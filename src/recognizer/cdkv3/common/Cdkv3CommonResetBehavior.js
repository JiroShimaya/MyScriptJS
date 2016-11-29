import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

function isResetRequired(model, recognizerContext) {
  let ret = false;
  if (recognizerContext.lastRecognitionPositions) {
    ret = recognizerContext.lastRecognitionPositions.lastSendPosition >= model.lastRecognitionPositions.lastSendPosition;
  }
  return ret;
}

const resolvedPromise = Promise.resolve();
export function manageResetState(paperOptionsParam, modelParam, recognizer, recognizerContextParam) {
  const modelReference = modelParam;
  let ret = resolvedPromise;
  if (isResetRequired(modelParam, recognizerContextParam)) {
    logger.debug('Reset is needed');
    modelReference.lastRecognitionPositions.lastSendPosition = 0;
    ret = recognizer.reset(paperOptionsParam, modelParam, recognizerContextParam);
  }
  return ret;
}