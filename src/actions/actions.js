export const STORE_LAYERS = '@Layers/STORE';
export const storeLayers = layers => ({
  type: STORE_LAYERS,
  layers,
});

export const SET_MAP = '@Map/SET';
export const setMap = map => ({
  type: SET_MAP,
  map,
});

export const CHANGE_VIEWPORT = '@Map/CHANGE_VIEWPORT'
export const changeViewport = viewport => ({
  type: CHANGE_VIEWPORT,
  viewport
});

export const CHANGE_CARTO_BOUNDINGBOX = '@Map/CHANGE_CARTO_BOUNDINGBOX'
export const changeCartoBBox = boundingbox => ({
  type: CHANGE_CARTO_BOUNDINGBOX,
  boundingbox
});


export const SET_PRICE = '@Filters/SET_PRICE';
export const setPriceFilter = filter => ({
  type: SET_PRICE,
  filter,
});

export const SET_BBOX = '@Filters/SET_BBOX';
export const setBboxFilter = bbox => ({
  type: SET_BBOX,
  bbox,
});

export const SET_NEIGHBOURHOODS = '@Filters/SET_NEIGHBOURHOODS';
export const setNeighbourhoods = neighbourhoods => ({
  type: SET_NEIGHBOURHOODS,
  neighbourhoods,
});

export const TOGGLE_LAYER = '@Layers/TOGGLE';
export const toggleLayer = name => ({
  type: TOGGLE_LAYER,
  name,
});

export const TOGGLE_THEME = '@Theme/TOGGLE';
export const toggleTheme = active => ({ type: TOGGLE_THEME, active });
