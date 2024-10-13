export const themes = {
  Light: {
    name: 'Light',
    background: '#f5f7fa', // Light blue-grey instead of pure white
    navBarBackground: '#dfe3e8', // Light grey with a blue hint
    navBarTextColor: '#2e3a45', // Dark blue-grey for contrast
    buttonBackground: '#42a5f5', // Soft blue for button color
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#1e88e5', // Darker blue for hover
    buttonHoverTextColor: '#ffffff',
    inputBackground: '#ffffff',
    inputTextColor: '#2e3a45', // Dark blue-grey for input text
    inputBorderColor: '#b0bec5', // Softer blueish-grey for borders
    headerBackground: '#dfe3e8', // Match navbar with light blue-grey
    headerTextColor: '#2e3a45', // Darker blue-grey for text
    modalBackground: '#ffffff', // Keep modals white
    modalTextColor: '#495057',
    border: '#cfd8dc', // Softer grey for borders
    scrollBarThumb: '#90caf9', // Light blue for scrollbar thumb
    scrollBarTrack: '#e0e0e0',
    chartColors: ['#42a5f5', '#29b6f6', '#66bb6a', '#ef5350'], // Blue-focused chart colors
  },
  
  Dark: {
    name: 'Dark',
    background: '#2f2f2f', // Brightened dark grey background
    navBarBackground: '#474747', // Slightly brighter grey for the navbar
    navBarTextColor: '#f1f1f1', // Light grey for contrast
    buttonBackground: '#666666', // Medium grey for buttons
    buttonTextColor: '#ffffff',
    buttonHoverBackground: '#777777', // Brightened hover color
    buttonHoverTextColor: '#222222',
    inputBackground: '#424242', // Slightly brighter input background
    inputTextColor: '#e4e6eb',
    inputBorderColor: '#666666', // Brighter border color
    headerBackground: '#474747', // Match navbar with brighter grey
    headerTextColor: '#f1f1f1', // Light grey for contrast
    modalBackground: '#3a3a3a', // Brighter modal background
    modalTextColor: '#d3d3d3',
    border: '#777777', // Brighter borders to match the theme
    scrollBarThumb: '#888888', // Lighten the scrollbar thumb
    scrollBarTrack: '#474747', // Brighter scrollbar track
    chartColors: ['#66bb6a', '#29b6f6', '#ef5350', '#ffca28'], // Keep vibrant chart colors for contrast
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
    chartColors: ['#388e3c', '#66bb6a', '#81c784', '#a5d6a7'],
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
    chartColors: ['#1e88e5', '#42a5f5', '#90caf9', '#bbdefb'],
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
    chartColors: ['#e53935', '#ef5350', '#ff7043', '#ff8a65'],
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
    chartColors: ['#ab47bc', '#ce93d8', '#ba68c8', '#8e24aa'],
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
    chartColors: ['#00796b', '#00897b', '#4db6ac', '#80cbc4'],
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
    chartColors: ['#ff5722', '#ff7043', '#ff8a65', '#ffab91'],
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
    chartColors: ['#004D40', '#FF7043', '#00897B'],
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
    chartColors: ['#1A237E', '#FFD600', '#4FC3F7'],
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
    chartColors: ['#424242', '#EC407A', '#29B6F6'],
  },
};

export const getTheme = (themeName) => themes[themeName] || themes.Light;
