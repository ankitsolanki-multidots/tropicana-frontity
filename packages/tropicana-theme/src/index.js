// const Root = () => {
//   return (
//     <>
//       You can edit your package in:
//       <pre>packages/tropicana-theme/src/index.js</pre>
//     </>
//   );
// };

// export default {
//   name: "tropicana-theme",
//   roots: {
//     tropicanaTheme: Root
//   },
//   state: {
//     tropicanaTheme: {}
//   },
//   actions: {
//     tropicanaTheme: {}
//   }
// }; 

import Root from "./theme-files";

const tropicana = {
  name: "tropicana-theme",
  roots: {
    theme: Root
  },
  state: {
    theme: {
      isMenuOpen: true
    }
  },
  actions: {
    theme: {
    }
  }
};

export default tropicana
