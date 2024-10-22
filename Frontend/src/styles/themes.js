export const themes = {
  Light: {
    name: 'Light',
    background: '#f5f7fa',
    navBarBackground: '#dfe3e8',
    navBarTextColor: '#2e3a45',
    buttonBackground: '#2563EB',
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#1e88e5',
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#2e3a45',
    inputBorderColor: '#b0bec5',
    headerBackground: '#dfe3e8',
    headerTextColor: '#2e3a45',
    modalBackground: '#ffffff',
    modalTextColor: '#495057',
    border: '#cfd8dc',
    scrollBarThumb: '#90caf9',
    scrollBarTrack: '#e0e0e0',
    chartColors: [
      '#FFB6C1',  // Light Pink
      '#FFD700',  // Gold
      '#87CEFA',  // Light Sky Blue
      '#98FB98',  // Pale Green
      '#FF69B4',  // Hot Pink
      '#FFA07A',  // Light Salmon
      '#BA55D3',  // Medium Orchid
      '#F0E68C',  // Khaki
      '#ADD8E6',  // Light Blue
      '#FFDAB9'   // Peach Puff
   ],
    tagBackground: '#42a5f5',
    tagColor: '#FFFFFF',
  },
   Dark : {
    name: 'Dark',
    background: '#1a1a1a',  // Matches BoardContainer background
    navBarBackground: '#2a2a2a',  // Slightly darker for the nav bar
    navBarTextColor: '#f1f1f1',  // White for clarity
    buttonBackground: '#00A86B',  // Matches the green CreateBoardButton
    buttonTextColor: '#ffffff',  // White text
    buttonHoverBackground: '#008080',  // Matches CreateBoardButton hover state
    buttonHoverTextColor: '#ffffff',  // White text on hover
    inputBackground: '#2a2a2a',  // Matches Input field background
    inputTextColor: '#ffffff',  // White input text for contrast
    inputBorderColor: '#00A86B',  // Matches focus state of Input field
    headerBackground: '#1a1a1a',  // Matches BoardContainer background for header
    headerTextColor: '#f1f1f1',  // White for text contrast
    modalBackground: '#3a3a3a',  // Matches BoardItem hover background
    modalTextColor: '#d3d3d3',  // Light grey text for modals
    border: '#777777',  // A general border color
    scrollBarThumb: '#888888',  // Medium grey for scrollbar thumb
    scrollBarTrack: '#474747',  // Dark grey for the track
    chartColors: [
      '#FF6347',  // Tomato
      '#1E90FF',  // Dodger Blue
      '#32CD32',  // Lime Green
      '#FFD700',  // Gold
      '#FF1493',  // Deep Pink
      '#00FA9A',  // Medium Spring Green
      '#FFA500',  // Orange
      '#DA70D6',  // Orchid
      '#20B2AA',  // Light Sea Green
      '#FF4500'   // Orange Red
    ],   
    tagBackground: '#42a5f5',  // Blue for tag background
    tagColor: '#FFFFFF',  // White text for tags
  },

  Green: {
    name: 'Green',
    background: '#f0f8f5', // Softer light green
    navBarBackground: '#66bb6a', // Green navbar
    navBarTextColor: '#ffffff',
    buttonBackground: '#388e3c', // Darker green buttons
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#2e7d32', // Dark green hover
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#2e7d32',
    inputBorderColor: '#a5d6a7',
    headerBackground: '#e0f0e9', // Lighter green for header
    headerTextColor: '#1b5e20',
    modalBackground: '#e8f5e9',
    modalTextColor: '#2e7d32',
    border: '#a5d6a7',
    scrollBarThumb: '#66bb6a',
    scrollBarTrack: '#f0f8f5',
    chartColors: [
      '#32CD32',  // Lime Green
      '#7CFC00',  // Lawn Green
      '#ADFF2F',  // Green Yellow
      '#00FF7F',  // Spring Green
      '#9ACD32',  // Yellow Green
      '#3CB371',  // Medium Sea Green
      '#66CDAA',  // Medium Aquamarine
      '#8FBC8F',  // Dark Sea Green
      '#2E8B57',  // Sea Green
      '#7FFF00'   // Chartreuse
   ],
    tagBackground: '#42a5f5',
    tagColor: '#FFFFFF',
  },
  Blue: {
    name: 'Blue',
    background: '#e3f2fd',
    navBarBackground: '#42a5f5',
    navBarTextColor: '#ffffff',
    buttonBackground: '#1e88e5',
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#1565c0',
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#1565c0',
    inputBorderColor: '#90caf9',
    headerBackground: '#bbdefb',
    headerTextColor: '#0d47a1',
    modalBackground: '#e1f5fe',
    modalTextColor: '#1565c0',
    border: '#90caf9',
    scrollBarThumb: '#42a5f5',
    scrollBarTrack: '#e3f2fd',
    chartColors: [
      '#1E90FF',  // Dodger Blue
      '#87CEEB',  // Sky Blue
      '#00BFFF',  // Deep Sky Blue
      '#4682B4',  // Steel Blue
      '#5F9EA0',  // Cadet Blue
      '#ADD8E6',  // Light Blue
      '#40E0D0',  // Turquoise
      '#7B68EE',  // Medium Slate Blue
      '#6495ED',  // Cornflower Blue
      '#00CED1'   // Dark Turquoise
   ],   
    tagBackground: '#42a5f5',
    tagColor: '#FFFFFF',
  },
  Red: {
    name: 'Red',
    background: '#ffebee',
    navBarBackground: '#ef5350',
    navBarTextColor: '#ffffff',
    buttonBackground: '#e53935',
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#c62828',
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#c62828',
    inputBorderColor: '#ef9a9a',
    headerBackground: '#ffcdd2',
    headerTextColor: '#b71c1c',
    modalBackground: '#ffebee',
    modalTextColor: '#c62828',
    border: '#ef9a9a',
    scrollBarThumb: '#ef5350',
    scrollBarTrack: '#ffebee',
    chartColors: [
      '#FF6347',  // Tomato
      '#FF4500',  // Orange Red
      '#FF7F50',  // Coral
      '#DC143C',  // Crimson
      '#FF6A6A',  // Light Coral
      '#FF1493',  // Deep Pink
      '#FF69B4',  // Hot Pink
      '#FF4040',  // Bright Red
      '#FF8C00',  // Dark Orange
      '#FA8072'   // Salmon
   ],   
    tagBackground: '#42a5f5',
    tagColor: '#FFFFFF',
  },
  Purple: {
    name: 'Purple',
    background: '#f3e5f5',
    navBarBackground: '#8e24aa',
    navBarTextColor: '#ffffff',
    buttonBackground: '#ab47bc',
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#7b1fa2',
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#4a148c',
    inputBorderColor: '#ce93d8',
    headerBackground: '#e1bee7',
    headerTextColor: '#6a1b9a',
    modalBackground: '#f3e5f5',
    modalTextColor: '#6a1b9a',
    border: '#ce93d8',
    scrollBarThumb: '#8e24aa',
    scrollBarTrack: '#f3e5f5',
    chartColors: [
      '#DA70D6',  // Orchid
      '#BA55D3',  // Medium Orchid
      '#9932CC',  // Dark Orchid
      '#9400D3',  // Dark Violet
      '#8A2BE2',  // Blue Violet
      '#DDA0DD',  // Plum
      '#EE82EE',  // Violet
      '#FF00FF',  // Magenta
      '#9370DB',  // Medium Purple
      '#C71585'   // Medium Violet Red
   ],   
    tagBackground: '#42a5f5',
    tagColor: '#FFFFFF',
  },
  Teal: {
    name: 'Teal',
    background: '#e0f7fa',
    navBarBackground: '#00897b',
    navBarTextColor: '#ffffff',
    buttonBackground: '#00796b',
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#004d40',
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#004d40',
    inputBorderColor: '#80cbc4',
    headerBackground: '#b2dfdb',
    headerTextColor: '#004d40',
    modalBackground: '#e0f2f1',
    modalTextColor: '#004d40',
    border: '#80cbc4',
    scrollBarThumb: '#00897b',
    scrollBarTrack: '#e0f7fa',
    chartColors: [
      '#008080',  // Teal
      '#20B2AA',  // Light Sea Green
      '#40E0D0',  // Turquoise
      '#48D1CC',  // Medium Turquoise
      '#00CED1',  // Dark Turquoise
      '#5F9EA0',  // Cadet Blue
      '#AFEEEE',  // Pale Turquoise
      '#7FFFD4',  // Aquamarine
      '#66CDAA',  // Medium Aquamarine
      '#4682B4'   // Steel Blue
   ],
    tagBackground: '#42a5f5',
    tagColor: '#FFFFFF',
  },
  Orange: {
    name: 'Orange',
    background: '#fff3e0',
    navBarBackground: '#ff7043',
    navBarTextColor: '#ffffff',
    buttonBackground: '#ff5722',
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#e64a19',
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#bf360c',
    inputBorderColor: '#ffab91',
    headerBackground: '#ffe0b2',
    headerTextColor: '#bf360c',
    modalBackground: '#ffccbc',
    modalTextColor: '#d84315',
    border: '#ffab91',
    scrollBarThumb: '#ff7043',
    scrollBarTrack: '#fff3e0',
    chartColors: [
      '#FFA500',  // Orange
      '#FF8C00',  // Dark Orange
      '#FF7F50',  // Coral
      '#FF6347',  // Tomato
      '#FFD700',  // Gold
      '#FFA07A',  // Light Salmon
      '#FF4500',  // Orange Red
      '#FFDAB9',  // Peach Puff
      '#FFB347',  // Yellow Orange
      '#FFAE42'   // Yellow Orange (Deep)
   ],   
    tagBackground: '#42a5f5',
    tagColor: '#FFFFFF',
  },
  TealOrangeGrey: {
    name: 'TealOrangeGrey',
    background: '#f7f7f7',
    navBarBackground: '#004D40',
    navBarTextColor: '#ffffff',
    buttonBackground: '#FF7043',
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#FF5722',
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#004D40',
    inputBorderColor: '#80CBC4',
    headerBackground: '#E0F2F1',
    headerTextColor: '#004D40',
    modalBackground: '#F7F7F7',
    modalTextColor: '#004D40',
    border: '#80CBC4',
    scrollBarThumb: '#FF7043',
    scrollBarTrack: '#f7f7f7',
    chartColors: [
      '#008080',  // Teal
      '#20B2AA',  // Light Sea Green
      '#40E0D0',  // Turquoise
      '#00CED1',  // Dark Turquoise
      '#FFA500',  // Orange
      '#FF8C00',  // Dark Orange
      '#FF7F50',  // Coral
      '#FF6347',  // Tomato
      '#D3D3D3',  // Light Gray
      '#B0C4DE'   // Light Steel Blue (touch of gray)
   ],    
    tagBackground: '#42a5f5',
    tagColor: '#FFFFFF',
  },
  BlueWhiteYellow: {
    name: 'BlueWhiteYellow',
    background: '#FFFFFF',
    navBarBackground: '#1A237E',
    navBarTextColor: '#ffffff',
    buttonBackground: '#FFD600',
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#FFEB3B',
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#1A237E',
    inputBorderColor: '#4FC3F7',
    headerBackground: '#E3F2FD',
    headerTextColor: '#1A237E',
    modalBackground: '#F3F4F6',
    modalTextColor: '#1A237E',
    border: '#BBDEFB',
    scrollBarThumb: '#FFD600',
    scrollBarTrack: '#ffffff',
    chartColors: [
      '#1E90FF',  // Dodger Blue
      '#00BFFF',  // Deep Sky Blue
      '#87CEEB',  // Sky Blue
      '#4682B4',  // Steel Blue
      '#FFD700',  // Gold
      '#FFFF00',  // Yellow
      '#FFA500',  // Orange Yellow
      '#FFEB3B',  // Bright Yellow
      '#6495ED',  // Cornflower Blue
      '#F0E68C'   // Khaki (Yellowish)
   ],   
    tagBackground: '#42a5f5',
    tagColor: '#FFFFFF',
  },
  DarkGreyPinkBlue: {
    name: 'DarkGreyPinkBlue',
    background: '#FAFAFA',
    navBarBackground: '#424242',
    navBarTextColor: '#ffffff',
    buttonBackground: '#EC407A',
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#E91E63',
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#424242',
    inputBorderColor: '#BDBDBD',
    headerBackground: '#F8BBD0',
    headerTextColor: '#E91E63',
    modalBackground: '#FAFAFA',
    modalTextColor: '#424242',
    border: '#BDBDBD',
    scrollBarThumb: '#EC407A',
    scrollBarTrack: '#FAFAFA',
    chartColors: [
      '#FF69B4',  // Hot Pink
      '#FF1493',  // Deep Pink
      '#FFC0CB',  // Pink
      '#DB7093',  // Pale Violet Red
      '#1E90FF',  // Dodger Blue
      '#87CEEB',  // Sky Blue
      '#00BFFF',  // Deep Sky Blue
      '#6495ED',  // Cornflower Blue
      '#ADD8E6',  // Light Blue
      '#FFB6C1'   // Light Pink
   ],   
    tagBackground: '#42a5f5',
    tagColor: '#FFFFFF',
  },
};

export const getTheme = (themeName) => themes[themeName] || themes.Light;
