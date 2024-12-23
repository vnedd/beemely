/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: {
        100: "#A29FA9",
        200: "#8D8A94",
        300: "#B88BE2",
        400: "#575360",
        500: "#131118",
        600: "#14111C",
        700: "#4A3AFF",
        "5%": "#F3F3F3",
        "10%": "#E7E7E8",
        "20%": "#D0CFD1",
        "80%": "#424146",
        "90%": "#2B292F",
      },
      secondary: {
        100: "#E1F1BC",
        200: "#CEE993",
        300: "#BCDE6B",
        400: "#AFD751",
        500: "#A3D139",
        600: "#97BD33",
        700: "#88A52A",
        800: "#798D21",
        900: "#626615",
        "5%": "#FAFDF5",
        "10%": "#F6FAEB",
        "20%": "#EDF6D7",
        "80%": "#B5DA61",
        "90%": "#ACD64D",
      },
      tertiary: {
        100: "#F0B0D9",
        200: "#E67BC2",
        300: "#D846AB",
        400: "#CD0D9B",
        500: "#B21589",
        600: "#AF0A87",
        700: "#9B0982",
        800: "#8A087C",
        900: "#6C0772",
        "5%": "#FBF3F9",
        "10%": "#F7E8F3",
        "20%": "#F0D0E7",
        "80%": "#C144A1",
        "90%": "#BA2C95",
      },
      dark: {
        500: "#131118",
        "5%": "#F3F3F3",
        "10%": "#E7E7E8",
        "20%": "#D0CFD1",
        "80%": "#424146",
        "90%": "#2B292F",
      },
      gray: {
        500: "#A4A1AA",
        "5%": "#FAFAFB",
        "10%": "#F6F6F6",
        "20%": "#EDECEE",
        "80%": "#B6B4BB",
        "90%": "#ADAAB3",
      },
      white: {
        500: "#FFFFFF",
        "5%": "#F3F3F3",
        "10%": "#F3F3F3",
        "20%": "#F5F5F5",
        "80%": "#FCFCFC",
        "90%": "#FEFEFE",
      },
      light: {
        500: "#D9E1E1",
        "5%": "#FDFDFD",
        "10%": "#FBFCFC",
        "20%": "#F7F9F9",
        "80%": "#E1E7E7",
        "90%": "#DDE4E4",
      },
      options: {
        1: "#30BE82",
        2: "#30BEB6",
        3: "#5D30BE",
        4: "#304FBE",
        5: "#ff69b4",
        6: "#32cd32",
        7: "#1e90ff",
        8: "#ff6347",
        9: "#ffa500",
      },
      green: {
        50: "#E9FAF7",
        100: "#D3F4EF",
        200: "#A7EADE",
        300: "#7ADFCE",
        400: "#4ED5BD",
        500: "#22CAAD",
        600: "#1A9882",
        700: "#116557",
        800: "#09332B",
        900: "#031411",
      },
      red: {
        50: "#FEECEE",
        100: "#FBD8DB",
        200: "#F7B1B8",
        300: "#F38B94",
        400: "#EF6471",
        500: "#EB3D4D",
        600: "#B02E3A",
        700: "#761F27",
        800: "#3B0F13",
        900: "#180608",
      },
      orange: {
        50: "#FFF0EA",
        100: "#FEE0D3",
        200: "#FCC2A7",
        300: "#FBA37C",
        400: "#F98550",
        500: "#F86624",
        600: "#BA4D1B",
        700: "#7C3312",
        800: "#3E1A09",
        900: "#190A04",
      },
      yellow: {
        50: "#FFFAE7",
        100: "#FEF4CF",
        200: "#FDE99F",
        300: "#FBDE6E",
        400: "#FAD33E",
        500: "#F9C80E",
        600: "#BB960B",
        700: "#7D6407",
        800: "#3E3204",
        900: "#191401",
      },
      cyan: {
        50: "#EAF8FF",
        100: "#D5F0FF",
        200: "#AAE0FF",
        300: "#80D1FE",
        400: "#55C1FE",
        500: "#2BB2FE",
        600: "#2086BF",
        700: "#16597F",
        800: "#0B2D40",
        900: "#041219",
      },
      blue: {
        50: "#EBEEFF",
        100: "#D6DCFF",
        200: "#ADB9FF",
        300: "#8496FF",
        400: "#5B73FF",
        500: "#3250FF",
        600: "#263CBF",
        700: "#192880",
        800: "#0D1440",
        900: "#05081A",
      },
    },
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "checkbox-checked": "#000000",
        },
      },
    },
    variants: {
      extend: {
        backgroundColor: ["checked"],
      },
    },
    extend: {
      aspectRatio: {
        "5/6": "5 / 6",
      },
    },
    plugins: [],
  },
  plugins: [],
};
