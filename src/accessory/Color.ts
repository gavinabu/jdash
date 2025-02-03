export function getColor(color: "FG" | "BG") {
  if(localStorage.getItem("dark") === "true") {
    switch (color) {
      case "FG": return '#ffffff';
      case "BG": return '#202020';
    }
  } else {
    switch (color) {
      case "FG": return '#101010';
      case "BG": return '#ffffff';
    }
  }
  
}