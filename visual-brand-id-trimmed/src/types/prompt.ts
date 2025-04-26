// Subject types
export const subjectTypes = [  
    { value: "person", label: "person", description: "person" },
    { value: "product", label: "product", description: "product" },
    { value: "landscape", label: "landscape", description: "landscape" },
    { value: "architecture", label: "architecture", description: "architecture" },
    { value: "food", label: "food", description: "food" },
    { value: "animal", label: "animal", description: "animal" }
  ];
  
  export const productAttributes = [
    { value: "metal", label: "metal", category: "material" },
    { value: "wood", label: "wood", category: "material" },
    { value: "plastic", label: "plastic", category: "material" },
    { value: "glass", label: "glass", category: "material" },
    { value: "ceramic", label: "ceramic", category: "material" },
    { value: "leather", label: "leather", category: "material" },
    { value: "fabric", label: "fabric", category: "material" },
    { value: "matte", label: "matte", category: "finish" },
    { value: "glossy", label: "glossy", category: "finish" },
    { value: "textured", label: "textured", category: "finish" },
    { value: "polished", label: "polished", category: "finish" },
    { value: "brushed", label: "brushed", category: "finish" },
    { value: "distressed", label: "distressed", category: "finish" },
    { value: "red", label: "red", category: "color" },
    { value: "blue", label: "blue", category: "color" },
    { value: "green", label: "green", category: "color" },
    { value: "white", label: "white", category: "color" },
    { value: "black", label: "black", category: "color" },
    { value: "silver", label: "silver", category: "color" },
    { value: "gold", label: "gold", category: "color" },
    { value: "natural", label: "natural", category: "color" },
    { value: "small", label: "small", category: "size" },
    { value: "medium", label: "medium", category: "size" },
    { value: "large", label: "large", category: "size" },
  ];
  
  // Action types
  export const actionTypes = [  
    { value: "static", label: "static", description: "static" },
    { value: "moving", label: "moving", description: "moving" },
    { value: "floating", label: "floating", description: "floating" },
    { value: "spinning", label: "spinning", description: "spinning" },
    { value: "exploding", label: "exploding", description: "exploding" },
    { value: "jumping", label: "jumping", description: "jumping" }
  ];
  
  // Lighting types
  export const lightingTypes = [
    { value: "natural", label: "natural", description: "natural" },
    { value: "studio", label: "studio", description: "studio" },
    { value: "dramatic", label: "dramatic", description: "dramatic" },
    { value: "backlit", label: "backlit", description: "backlit" },
    { value: "sidelit", label: "sidelit", description: "sidelit" },
    { value: "soft", label: "soft", description: "soft" },
    { value: "harsh", label: "harsh", description: "harsh" },
  ]
  
  export const studioLightingAttributes = [
    { value: "low", label: "low", category: "intensity" },
    { value: "medium", label: "medium", category: "intensity" },
    { value: "high", label: "high", category: "intensity" },
    { value: "warm", label: "warm", category: "color" },
    { value: "cool", label: "cool", category: "color" },
    { value: "neutral", label: "neutral", category: "color" },
    { value: "colored", label: "colored", category: "color" },
    { value: "front", label: "front", category: "direction" },
    { value: "side", label: "side", category: "direction" },
    { value: "back", label: "back", category: "direction" },
    { value: "overhead", label: "overhead", category: "direction" },
    { value: "underneath", label: "underneath", category: "direction" },
  ];



  
  // Camera types
  export const cameraTypes = [  
    { value: "close-up", label: "close-up", description: "close-up" },
    { value: "medium shot", label: "medium shot", description: "medium shot" },
    { value: "wide shot", label: "wide shot", description: "wide shot" },
    { value: "aerial", label: "aerial", description: "aerial" },
    { value: "macro", label: "macro", description: "macro" },
    { value: "fisheye", label: "fisheye", description: "fisheye" }
  ];
  
  export const cameraAttributes = [
    { value: "f/1.4", label: "f/1.4", category: "aperture" },
    { value: "f/2.8", label: "f/2.8", category: "aperture" },
    { value: "f/5.6", label: "f/5.6", category: "aperture" },
    { value: "f/11", label: "f/11", category: "aperture" },
    { value: "f/22", label: "f/22", category: "aperture" },
    { value: "16mm", label: "16mm", category: "focalLength" },
    { value: "35mm", label: "35mm", category: "focalLength" },
    { value: "50mm", label: "50mm", category: "focalLength" },
    { value: "85mm", label: "85mm", category: "focalLength" },
    { value: "200mm", label: "200mm", category: "focalLength" },
    { value: "eye level", label: "eye level", category: "perspective" },
    { value: "high angle", label: "high angle", category: "perspective" },
    { value: "low angle", label: "low angle", category: "perspective" },
    { value: "bird's eye", label: "bird's eye", category: "perspective" },
    { value: "worm's eye", label: "worm's eye", category: "perspective" },
  ];
  
  // Style types
  export const styleTypes = [  
    { value: "photorealistic", label: "photorealistic", description: "photorealistic" }, // 3D rendered
    { value: "cinematic", label: "cinematic", description: "cinematic" }, // digital art, film grain
    { value: "artistic", label: "artistic", description: "artistic" }, // painterly, sketched, watercolor
    { value: "vintage", label: "vintage", description: "vintage" }, //film grain
    { value: "minimalist", label: "minimalist", description: "minimalist" }, // flat colors
    { value: "abstract", label: "abstract", description: "abstract" }, // blend of colors and shapes
  ]

  export const styleAttributes = [
    { value: "vibrant", label: "vibrant", category: "colorGrading" },
    { value: "muted", label: "muted", category: "colorGrading" },
    { value: "monochrome", label: "monochrome", category: "colorGrading" },
    { value: "pastel", label: "pastel", category: "colorGrading" },
    { value: "high contrast", label: "high contrast", category: "colorGrading" },
    { value: "bright", label: "bright", category: "mood" },
    { value: "dark", label: "dark", category: "mood" },
    { value: "cheerful", label: "cheerful", category: "mood" },
    { value: "moody", label: "moody", category: "mood" },
    { value: "mysterious", label: "mysterious", category: "mood" },
    { value: "energetic", label: "energetic", category: "mood" },
    { value: "painterly", label: "painterly", category: "artistic" },
    { value: "sketched", label: "sketched", category: "artistic" },
    { value: "watercolor", label: "watercolor", category: "artistic" },
    { value: "digital art", label: "digital art", category: "artistic" },
    { value: "3D rendered", label: "3D rendered", category: "artistic" },
  ];
  
  // Setting types
  export const settingTypes = [  
    { value: "indoor", label: "indoor", description: "indoor" },
    { value: "outdoor", label: "outdoor", description: "outdoor" },
    { value: "urban", label: "urban", description: "urban" },
    { value: "nature", label: "nature", description: "nature" },
    { value: "studio", label: "studio", description: "studio" },
    { value: "fantasy", label: "fantasy", description: "fantasy" }
  ];
  
  export const settingAttributes = [
    { value: "day", label: "day", category: "time" },
    { value: "night", label: "night", category: "time" },
    { value: "dawn", label: "dawn", category: "time" },
    { value: "dusk", label: "dusk", category: "time" },
    { value: "clear", label: "clear", category: "weather" },
    { value: "cloudy", label: "cloudy", category: "weather" },
    { value: "rainy", label: "rainy", category: "weather" },
    { value: "snowy", label: "snowy", category: "weather" },
    { value: "foggy", label: "foggy", category: "weather" },
    { value: "spring", label: "spring", category: "season" },
    { value: "summer", label: "summer", category: "season" },
    { value: "autumn", label: "autumn", category: "season" },
    { value: "winter", label: "winter", category: "season" },
  ];