const {fontFamily}  = require("tailwindcss/defaultTheme")
 
module.exports = {
    content: ["./src/**/*.jsx", "./src/**/.js"],
    theme: {
        extend: {
            fontFamily: {
              ...fontFamily,
                sans: ["poppins", ...fontFamily.sans],
            },
        },
    },
    plugins: [],
};
