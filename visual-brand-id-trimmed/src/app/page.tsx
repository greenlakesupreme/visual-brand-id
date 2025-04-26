// src/app/page.tsx
"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePromptGenerator } from "@/hooks/usePromptGenerator";
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
} from "@/types/prompt";

type Option = { value: string; label: string };
const renderOptionCards = (
  options: Option[],
  selectedValue: string,
  onSelect: (v: string) => void
) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    {options.map((opt) => (
      <Card
        key={opt.value}
        className={`cursor-pointer p-4 border rounded-md ${
          selectedValue === opt.value
            ? "border-primary bg-primary/10"
            : "hover:border-primary/50"
        }`}
        onClick={() => onSelect(opt.value)}
      >
        <CardTitle className="text-lg">{opt.label}</CardTitle>
      </Card>
    ))}
  </div>
);

type Attribute = { value: string; label: string; category: string };
const renderAttributeCards = (
  attributes: Attribute[],
  selected: Record<string, string>,
  onToggle: (k: string, label: string) => void
) => {
  const grouped: Record<string, Attribute[]> = {};
  attributes.forEach((a) => {
    if (!grouped[a.category]) grouped[a.category] = [];
    grouped[a.category].push(a);
  });

  return (
    <div className="space-y-6 mt-4">
      {Object.entries(grouped).map(([category, attrs]) => (
        <div key={category}>
          <h3 className="text-lg font-medium mb-2">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {attrs.map((attr) => (
              <div
                key={attr.value}
                className={`p-3 border rounded-md cursor-pointer transition-all ${
                  selected[attr.value]
                    ? "border-primary bg-primary/10"
                    : "hover:border-primary/50"
                }`}
                onClick={() => onToggle(attr.value, attr.label)}
              >
                {attr.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function HomePage() {
  // UI state
  const [selectedModel, setSelectedModel] = useState<string>("gemini-pro");
  const [apiKey, setApiKey] = useState<string>("");
  const [activeTab, setActiveTab] = useState<React.ComponentProps<typeof Tabs>["value"]>(
    "intro"
  );
  const [promptText, setPromptText] = useState<string>("");
  const [jsonFile, setJsonFile] = useState<File | null>(null);

  // Prompt hook
  const {
    promptState,

    // pickers & attributes
    updateSubjectType,
    updateSubjectAttribute,
    updateActionType,
    updateActionAttribute,
    updateSettingType,
    updateSettingAttribute,
    updateLightingType,
    updateLightingAttribute,
    updateCameraType,
    updateCameraAttribute,
    updateStyleType,
    updateStyleAttribute,

    // custom text
    updateSubjectCustom,
    updateActionCustom,
    updateSettingCustom,
    updateLightingCustom,
    updateCameraCustom,
    updateStyleCustom,

    updateComponentWeight,
    generatePrompt,
    exportSettings,
    importSettings,
  } = usePromptGenerator();

  // Sync preview
  useEffect(() => {
    setPromptText(generatePrompt());
  }, [promptState, generatePrompt]);

  // Import/export
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJsonFile(e.target.files?.[0] ?? null);
  };
  const handleImport = () => {
    if (!jsonFile) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const ok = importSettings(reader.result as string);
        alert(ok ? "Imported!" : "Invalid format");
      } catch {
        alert("Error parsing JSON");
      }
    };
    reader.readAsText(jsonFile);
  };
  const handleExport = () => {
    const json = exportSettings();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prompt_settings.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const modelOptions: Option[] = [
    { value: "gemini-pro", label: "Gemini Pro" },
    { value: "gemini-2.5-pro-preview-03-25", label: "Gemini Pro Preview" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Model & API Key */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <Label htmlFor="model-select">Model:</Label>
          <Select
            defaultValue={selectedModel}
            onValueChange={setSelectedModel}
          >
            <SelectTrigger id="model-select" className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label htmlFor="api-key">API Key:</Label>
          <Input
            id="api-key"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-64"
          />
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-8 mb-8">
                <TabsTrigger value="intro">Intro</TabsTrigger>
                <TabsTrigger value="subject">Subject</TabsTrigger>
                <TabsTrigger value="action">Action</TabsTrigger>
                <TabsTrigger value="setting">Setting</TabsTrigger>
                <TabsTrigger value="lighting">Lighting</TabsTrigger>
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="finalize">Finalize</TabsTrigger>
              </TabsList>

              {/* Intro */}
              <TabsContent value="intro">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome</CardTitle>
                    <CardDescription>
                      Build your brand-aligned AI prompt step by step.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Follow each tab to configure your prompt.</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={() => setActiveTab("subject")}>
                      Start
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Subject */}
              <TabsContent value="subject">
                <Card>
                  <CardHeader>
                    <CardTitle>Subject</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderOptionCards(
                      subjectTypes,
                      promptState.subject.type,
                      updateSubjectType
                    )}
                    {promptState.subject.type &&
                      renderAttributeCards(
                        productAttributes,
                        promptState.subject.attributes,
                        updateSubjectAttribute
                      )}
                    <Label className="block mt-4">Custom Subject</Label>
                    <Textarea
                      placeholder="e.g. ‘a red sports car’"
                      value={promptState.subject.custom}
                      onChange={(e) =>
                        updateSubjectCustom(e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("intro")}
                    >
                      Back
                    </Button>
                    <Button onClick={() => setActiveTab("action")}>
                      Next: Action
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Action */}
              <TabsContent value="action">
                <Card>
                  <CardHeader>
                    <CardTitle>Action</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderOptionCards(
                      actionTypes,
                      promptState.action.type,
                      updateActionType
                    )}
                    <Label className="block mt-4">Custom Action</Label>
                    <Textarea
                      placeholder="e.g. ‘zooming towards camera’"
                      value={promptState.action.custom}
                      onChange={(e) =>
                        updateActionCustom(e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("subject")}
                    >
                      Back
                    </Button>
                    <Button onClick={() => setActiveTab("setting")}>
                      Next: Setting
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Setting */}
              <TabsContent value="setting">
                <Card>
                  <CardHeader>
                    <CardTitle>Setting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderOptionCards(
                      settingTypes,
                      promptState.setting.type,
                      updateSettingType
                    )}
                    {promptState.setting.type &&
                      renderAttributeCards(
                        settingAttributes,
                        promptState.setting.attributes,
                        updateSettingAttribute
                      )}
                    <Label className="block mt-4">Custom Setting</Label>
                    <Textarea
                      placeholder="e.g. ‘on a deserted beach at sunrise’"
                      value={promptState.setting.custom}
                      onChange={(e) =>
                        updateSettingCustom(e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("action")}
                    >
                      Back
                    </Button>
                    <Button onClick={() => setActiveTab("lighting")}>
                      Next: Lighting
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Lighting */}
              <TabsContent value="lighting">
                <Card>
                  <CardHeader>
                    <CardTitle>Lighting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderOptionCards(
                      lightingTypes,
                      promptState.lighting.type,
                      updateLightingType
                    )}
                    {promptState.lighting.type &&
                      renderAttributeCards(
                        studioLightingAttributes,
                        promptState.lighting.attributes,
                        updateLightingAttribute
                      )}
                    <Label className="block mt-4">Custom Lighting</Label>
                    <Textarea
                      placeholder="e.g. ‘dramatic rim light’"
                      value={promptState.lighting.custom}
                      onChange={(e) =>
                        updateLightingCustom(e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("setting")}
                    >
                      Back
                    </Button>
                    <Button onClick={() => setActiveTab("camera")}>
                      Next: Camera
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Camera */}
              <TabsContent value="camera">
                <Card>
                  <CardHeader>
                    <CardTitle>Camera</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderOptionCards(
                      cameraTypes,
                      promptState.camera.type,
                      updateCameraType
                    )}
                    {promptState.camera.type &&
                      renderAttributeCards(
                        cameraAttributes,
                        promptState.camera.attributes,
                        updateCameraAttribute
                      )}
                    <Label className="block mt-4">Custom Camera</Label>
                    <Textarea
                      placeholder="e.g. ‘shot at 35mm focal length’"
                      value={promptState.camera.custom}
                      onChange={(e) =>
                        updateCameraCustom(e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("lighting")}
                    >
                      Back
                    </Button>
                    <Button onClick={() => setActiveTab("style")}>
                      Next: Style
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Style */}
              <TabsContent value="style">
                <Card>
                  <CardHeader>
                    <CardTitle>Style</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderOptionCards(
                      styleTypes,
                      promptState.style.type,
                      updateStyleType
                    )}
                    {promptState.style.type &&
                      renderAttributeCards(
                        styleAttributes,
                        promptState.style.attributes,
                        updateStyleAttribute
                      )}
                    <Label className="block mt-4">Custom Style</Label>
                    <Textarea
                      placeholder="e.g. ‘in the style of art deco’"
                      value={promptState.style.custom}
                      onChange={(e) =>
                        updateStyleCustom(e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("camera")}
                    >
                      Back
                    </Button>
                    <Button onClick={() => setActiveTab("finalize")}>
                      Next: Finalize
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Finalize */}
              <TabsContent value="finalize">
                <Card>
                  <CardHeader>
                    <CardTitle>Finalize</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h3 className="text-lg font-medium">Your Prompt</h3>
                    <div className="p-4 bg-muted rounded whitespace-pre-wrap">
                      {promptText}
                    </div>
                    <div className="border-t pt-4 space-y-4">
                      <Label htmlFor="import-json">Import Settings</Label>
                      <div className="flex gap-2">
                        <Input
                          id="import-json"
                          type="file"
                          accept=".json"
                          onChange={handleFileChange}
                        />
                        <Button onClick={handleImport} disabled={!jsonFile}>
                          Import
                        </Button>
                      </div>
                      <Button className="w-full" onClick={handleExport}>
                        Export Settings
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("style")}
                    >
                      Back
                    </Button>
                    <Button onClick={() => setActiveTab("intro")}>
                      Start Over
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="sticky top-8 h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Prompt Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded whitespace-pre-wrap mb-4">
                  {promptText}
                </div>
                <h3 className="text-lg font-medium">Component Weights</h3>
                {Object.entries(promptState.weights).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center mb-2"
                  >
                    <Label className="capitalize">{key}</Label>
                    <Input
                      type="text"
                      value={String(val)}
                      onChange={(e) =>
                        updateComponentWeight(
                          key as keyof typeof promptState.weights,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="w-full ml-4"
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => navigator.clipboard.writeText(promptText)}
                >
                  Copy Prompt
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
