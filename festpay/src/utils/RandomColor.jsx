// Utility function to generate a random light color
export function generateRandomLightColor() {
    const r = Math.floor(Math.random() * 128 + 128); // Light red
    const g = Math.floor(Math.random() * 128 + 128); // Light green
    const b = Math.floor(Math.random() * 128 + 128); // Light blue

    return `rgb(${r}, ${g}, ${b})`;
}

// Utility function to generate a random dark color
export function generateRandomDarkColor() {
    const r = Math.floor(Math.random() * 128); // Dark red
    const g = Math.floor(Math.random() * 128); // Dark green
    const b = Math.floor(Math.random() * 128); // Dark blue

    return `rgb(${r}, ${g}, ${b})`;
}

