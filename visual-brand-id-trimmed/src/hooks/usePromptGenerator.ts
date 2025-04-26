// src/hooks/usePromptGenerator.ts
import { useState, useCallback } from 'react';
import {
  subjectTypes,
  productAttributes,
  actionTypes,
  lightingTypes,
  studioLightingAttributes,
  cameraTypes,
  cameraAttributes,
  styleTypes,
  styleAttributes,
  settingTypes,
  settingAttributes,
} from '@/types/prompt';

/** shared shape for each prompt section */
interface ComponentState {
  type: string;
  attributes: Record<string, string>;
  custom: string;
}

/** weights for each section */
export interface Weights {
  subject: number;
  action: number;
  setting: number;
  lighting: number;
  camera: number;
  style: number;
}

/** overall hook state */
interface PromptState {
  subject: ComponentState;
  action: ComponentState;
  setting: ComponentState;
  lighting: ComponentState;
  camera: ComponentState;
  style: ComponentState;
  customPrompt: string;  // if you still need a global custom
  finalPrompt: string;
  weights: Weights;
}

export function usePromptGenerator() {
  const [state, setState] = useState<PromptState>({
    subject:  { type: subjectTypes[0].value,  attributes: {}, custom: '' },
    action:   { type: actionTypes[0].value,   attributes: {}, custom: '' },
    setting:  { type: settingTypes[0].value,  attributes: {}, custom: '' },
    lighting: { type: lightingTypes[0].value, attributes: {}, custom: '' },
    camera:   { type: cameraTypes[0].value,   attributes: {}, custom: '' },
    style:    { type: styleTypes[0].value,    attributes: {}, custom: '' },
    customPrompt: '',
    finalPrompt: '',
    weights: { subject: 100, action: 100, setting: 100, lighting: 100, camera: 100, style: 100 },
  });

  const updateType = useCallback((section: keyof Omit<PromptState, 'customPrompt'|'finalPrompt'|'weights'>, type: string) => {
    setState(s => ({
      ...s,
      [section]: { ...s[section], type },
    } as any));
  }, []);

  const updateAttribute = useCallback((section: keyof Omit<PromptState, 'customPrompt'|'finalPrompt'|'weights'>, key: string, label: string) => {
    setState(s => {
      const attrs = { ...s[section].attributes };
      if (attrs[key]) delete attrs[key];
      else attrs[key] = label;
      return {
        ...s,
        [section]: { ...s[section], attributes: attrs },
      } as any;
    });
  }, []);

  const updateCustom = useCallback((section: keyof Omit<PromptState, 'customPrompt'|'finalPrompt'|'weights'>, text: string) => {
    setState(s => ({
      ...s,
      [section]: { ...s[section], custom: text },
    } as any));
  }, []);

  const updateGlobalCustom = useCallback((text: string) => {
    setState(s => ({ ...s, customPrompt: text }));
  }, []);

  const updateWeight = useCallback((key: keyof Weights, value: number) => {
    setState(s => ({
      ...s,
      weights: { ...s.weights, [key]: value },
    }));
  }, []);

  const generatePrompt = useCallback(() => {
    const { subject, action, setting, lighting, camera, style } = state;
    const parts: string[] = [];

    function sectionText(comp: ComponentState) {
      const base = comp.custom || comp.type;
      const attrs = Object.values(comp.attributes).join(', ');
      return attrs ? `${attrs} ${base}` : base;
    }

    parts.push(sectionText(subject));
    parts.push(sectionText(action));
    parts.push(`in ${sectionText(setting)}`);
    parts.push(`with ${sectionText(lighting)} lighting`);
    parts.push(`shot with ${sectionText(camera)}`);
    parts.push(`in ${sectionText(style)} style`);

    const final = parts.filter(Boolean).join(', ');
    setState(s => ({ ...s, finalPrompt: final }));
    return final;
  }, [state]);

  const exportSettings = useCallback(() => JSON.stringify(state, null, 2), [state]);
  const importSettings = useCallback((text: string) => {
    try {
      const obj = JSON.parse(text) as PromptState;
      setState(obj);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    promptState: state,
    updateSubjectType: (t: string) => updateType('subject', t),
    updateActionType:  (t: string) => updateType('action', t),
    updateSettingType: (t: string) => updateType('setting', t),
    updateLightingType:(t: string) => updateType('lighting', t),
    updateCameraType:  (t: string) => updateType('camera', t),
    updateStyleType:   (t: string) => updateType('style', t),

    updateSubjectAttribute:  (k, l) => updateAttribute('subject', k, l),
    updateActionAttribute:   (k, l) => updateAttribute('action', k, l),
    updateSettingAttribute:  (k, l) => updateAttribute('setting', k, l),
    updateLightingAttribute: (k, l) => updateAttribute('lighting', k, l),
    updateCameraAttribute:   (k, l) => updateAttribute('camera', k, l),
    updateStyleAttribute:    (k, l) => updateAttribute('style', k, l),

    updateSubjectCustom:  c => updateCustom('subject', c),
    updateActionCustom:   c => updateCustom('action', c),
    updateSettingCustom:  c => updateCustom('setting', c),
    updateLightingCustom: c => updateCustom('lighting', c),
    updateCameraCustom:   c => updateCustom('camera', c),
    updateStyleCustom:    c => updateCustom('style', c),

    updateGlobalCustom,
    updateComponentWeight: updateWeight,
    generatePrompt,
    exportSettings,
    importSettings,
    weights: state.weights,
  };
}
