import { createApp } from 'vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCaretDown,
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import App from './App.vue'

library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faCaretDown);
library.add(faPlay);
library.add(faPause);
library.add(faUndo);

// Vue.component("font-awesome-icon", FontAwesomeIcon);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app')
