// src/styles/themes.js
`
background-color: ${(props) => props.theme.navBarBackground};
`
export const themes = {

  Light: {
    name: 'Light',
    background: '#ffffff', // Clean white background
    navBarBackground: '#f0f0f0', // Warm light gray to keep it friendly
    navBarTextColor: '#343a40', // Dark gray for strong readability
    buttonBackground: '#b0bec5', // Softer, modern blue for buttons
    buttonTextColor: '#ffffff', // White text for high contrast
    buttonHoverBackground: '#78909c', // Slightly darker blue for hover to give depth
    buttonHoverTextColor: '#ffffff', // White text on hover remains consistent
    inputBackground: '#ffffff', // White for clean input fields
    inputTextColor: '#495057', // Neutral gray text for inputs
    inputBorderColor: '#ced4da', // Subtle gray border for inputs
    headerBackground: '#f3f4f6', // Soft off-white to set headers apart
    headerTextColor: '#212529', // Dark gray to keep header text readable
    modalBackground: '#f7f7f7', // Light gray for a softer, less intense modal
    modalTextColor: '#495057', // Gray text to maintain readability
    border: '#dee2e6', // Light gray borders to separate content subtly
    scrollBarThumb: '#adb5bd', // Neutral gray scroll thumb to match the scheme
    scrollBarTrack: '#f8f9fa', // Light gray scroll track
    chartColors: ['#b0bec5', '#78909c', '#cfd8dc', '#90a4ae'], // Subdued, modern grays and blues for charts
  },
  Dark: {
   name: 'Dark',
    background: '#1b1b1b', // Dark background for a modern, sleek look
    navBarBackground: '#333333', // Deep gray for the navigation bar
    navBarTextColor: '#e4e6eb', // Light gray text for contrast against dark backgrounds
    buttonBackground: '#444444', // Subtle dark gray for buttons
    buttonTextColor: '#ffffff', // White text for high visibility
    buttonHoverBackground: '#555555', // Slightly lighter gray for hover effect
    buttonHoverTextColor: '#222222', // Consistent white text on hover
    inputBackground: '#2c2c2c', // Dark input background for consistency
    inputTextColor: '#e4e6eb', // Light gray input text for readability
    inputBorderColor: '#555555', // Dark gray border to blend with the theme
    headerBackground: '#3b3b3b', // Slightly lighter background for headers
    headerTextColor: '#f1f1f1', // Near white text to keep headers legible
    modalBackground: '#262626', // Very dark background for modals
    modalTextColor: '#d3d3d3', // Soft gray for modal text
    border: '#444444', // Subtle border to define areas without standing out too much
    scrollBarThumb: '#606060', // Darker gray for scrollbar thumb
    scrollBarTrack: '#2e2e2e', // Matching dark gray for scrollbar track
    chartColors: ['#66bb6a', '#29b6f6', '#ef5350', '#ffca28'], // Dark-themed colors for charts
  },
  Green: {
    name: 'Green',
    background: '#e8f5e9', // Soft green background for a fresh feel
    navBarBackground: '#66bb6a', // Medium green for the navigation bar
    navBarTextColor: '#ffffff', // White text to stand out against the green
    buttonBackground: '#388e3c', // Darker green for buttons
    buttonTextColor: '#ffffff', // White text on buttons for contrast
    buttonHoverBackground: '#2e7d32', // Even darker green on hover
    buttonHoverTextColor: '#ffffff', // Consistent white text on hover
    inputBackground: '#ffffff', // White input background for cleanliness
    inputTextColor: '#2e7d32', // Green text to match the theme
    inputBorderColor: '#a5d6a7', // Light green border for subtle theming
    headerBackground: '#c8e6c9', // Light green for headers to keep them distinct
    headerTextColor: '#1b5e20', // Dark green text for readability
    modalBackground: '#dcedc8', // Light greenish background for modals
    modalTextColor: '#2e7d32', // Green text for modals
    border: '#a5d6a7', // Light green borders to tie everything together
    scrollBarThumb: '#66bb6a', // Matching green for scrollbar thumb
    scrollBarTrack: '#e8f5e9', // Light green for scrollbar track
    chartColors: ['#388e3c', '#66bb6a', '#81c784', '#a5d6a7'], // Green-themed colors for charts

  },
  Blue: {
    name: 'Blue',
    background: '#e3f2fd', // Soft light blue background
    navBarBackground: '#42a5f5', // Bright blue for the navigation bar
    navBarTextColor: '#ffffff', // White text to stand out against blue
    buttonBackground: '#1e88e5', // Strong blue for buttons
    buttonTextColor: '#ffffff', // White text on buttons for visibility
    buttonHoverBackground: '#1565c0', // Darker blue on hover to add depth
    buttonHoverTextColor: '#ffffff', // White text on hover
    inputBackground: '#ffffff', // Clean white input fields
    inputTextColor: '#1565c0', // Blue text for input fields
    inputBorderColor: '#90caf9', // Light blue border for subtle theming
    headerBackground: '#bbdefb', // Soft blue header background
    headerTextColor: '#0d47a1', // Dark blue text for headers
    modalBackground: '#e1f5fe', // Very light blue for modals
    modalTextColor: '#1565c0', // Blue text for modals
    border: '#90caf9', // Light blue border for consistency
    scrollBarThumb: '#42a5f5', // Blue scrollbar thumb
    scrollBarTrack: '#e3f2fd', // Light blue scrollbar track
    chartColors: ['#1e88e5', '#42a5f5', '#90caf9', '#bbdefb'], // Blue-themed colors for charts

  },
  Red: {
    name: 'Red',
    background: '#ffebee', // Soft pinkish background to soften the red theme
    navBarBackground: '#ef5350', // Strong red for the navigation bar
    navBarTextColor: '#ffffff', // White text for contrast against the red
    buttonBackground: '#e53935', // Bright red for buttons
    buttonTextColor: '#ffffff', // White text on buttons for visibility
    buttonHoverBackground: '#c62828', // Darker red on hover
    buttonHoverTextColor: '#ffffff', // White text on hover
    inputBackground: '#ffffff', // Clean white input fields
    inputTextColor: '#c62828', // Red text for inputs
    inputBorderColor: '#ef9a9a', // Light red border for inputs
    headerBackground: '#ffcdd2', // Light red for headers to keep them distinct
    headerTextColor: '#b71c1c', // Dark red text for headers
    modalBackground: '#ffebee', // Soft red for modals
    modalTextColor: '#c62828', // Red text for modals
    border: '#ef9a9a', // Light red borders to complement the theme
    scrollBarThumb: '#ef5350', // Matching red for scrollbar thumb
    scrollBarTrack: '#ffebee', // Light red scrollbar track
    chartColors: ['#e53935', '#ef5350', '#ff7043', '#ff8a65'], // Red-themed colors for charts

  },
  Purple: {
    name: 'Purple',
    background: '#f3e5f5', // Soft lavender background for a calm feel
    navBarBackground: '#8e24aa', // Rich purple for the navigation bar
    navBarTextColor: '#ffffff', // White text for contrast
    buttonBackground: '#ab47bc', // Medium purple for buttons
    buttonTextColor: '#ffffff', // White text on buttons for visibility
    buttonHoverBackground: '#7b1fa2', // Darker purple on hover for depth
    buttonHoverTextColor: '#ffffff', // White text on hover
    inputBackground: '#ffffff', // Clean white input fields
    inputTextColor: '#4a148c', // Dark purple text for inputs
    inputBorderColor: '#ce93d8', // Light purple border for inputs
    headerBackground: '#e1bee7', // Light purple header background
    headerTextColor: '#6a1b9a', // Dark purple text for headers
    modalBackground: '#f3e5f5', // Light purple background for modals
    modalTextColor: '#6a1b9a', // Dark purple text for modals
    border: '#ce93d8', // Light purple border to blend with the theme
    scrollBarThumb: '#8e24aa', // Matching purple for scrollbar thumb
    scrollBarTrack: '#f3e5f5', // Light purple for scrollbar track
    chartColors: ['#ab47bc', '#ce93d8', '#ba68c8', '#8e24aa'], // Purple-themed colors for charts
  },
  Teal: {
    name: 'Teal',
    background: '#e0f7fa', // Soft teal background for a fresh and clean look
    navBarBackground: '#00897b', // Rich teal for the navigation bar
    navBarTextColor: '#ffffff', // White text to stand out against teal
    buttonBackground: '#00796b', // Dark teal for buttons
    buttonTextColor: '#ffffff', // White text on buttons for contrast
    buttonHoverBackground: '#004d40', // Darker teal on hover
    buttonHoverTextColor: '#ffffff', // White text on hover
    inputBackground: '#ffffff', // Clean white input fields
    inputTextColor: '#004d40', // Dark teal text for inputs
    inputBorderColor: '#80cbc4', // Light teal border for inputs
    headerBackground: '#b2dfdb', // Light teal header background
    headerTextColor: '#004d40', // Dark teal text for headers
    modalBackground: '#e0f2f1', // Very light teal for modals
    modalTextColor: '#004d40', // Dark teal text for modals
    border: '#80cbc4', // Light teal borders to keep it soft
    scrollBarThumb: '#00897b', // Teal scrollbar thumb
    scrollBarTrack: '#e0f7fa', // Light teal scrollbar track
    chartColors: ['#00796b', '#00897b', '#4db6ac', '#80cbc4'], // Teal-themed colors for charts
  },
  Orange: {
    name: 'Orange',
    background: '#fff3e0', // Light orange background for a warm feel
    navBarBackground: '#ff7043', // Bright orange for the navigation bar
    navBarTextColor: '#ffffff', // White text for contrast
    buttonBackground: '#ff5722', // Strong orange for buttons
    buttonTextColor: '#ffffff', // White text on buttons for high visibility
    buttonHoverBackground: '#e64a19', // Darker orange on hover
    buttonHoverTextColor: '#ffffff', // White text on hover
    inputBackground: '#ffffff', // Clean white input fields
    inputTextColor: '#bf360c', // Dark orange text for inputs
    inputBorderColor: '#ffab91', // Light orange border for inputs
    headerBackground: '#ffe0b2', // Soft orange for headers to keep them distinct
    headerTextColor: '#bf360c', // Dark orange text for headers
    modalBackground: '#ffccbc', // Light orange background for modals
    modalTextColor: '#d84315', // Dark orange text for modals
    border: '#ffab91', // Light orange border to complement the theme
    scrollBarThumb: '#ff7043', // Matching orange for scrollbar thumb
    scrollBarTrack: '#fff3e0', // Light orange for scrollbar track
    chartColors: ['#ff5722', '#ff7043', '#ff8a65', '#ffab91'], // Orange-themed colors for charts
  },
  
  
};
export const getTheme = (themeName) => themes[themeName] || themes.Light;
