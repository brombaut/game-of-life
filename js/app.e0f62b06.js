(function(){"use strict";var e={1721:function(e,i,t){var n=t(9242),o=t(8125),r=t(7749),l=t(8321),s=t(3396);function a(e,i,t,n,o,r){const l=(0,s.up)("GameHeader"),a=(0,s.up)("GameGrid"),h=(0,s.up)("GameFooter");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(l),(0,s.Wm)(a,{mGameGrid:e.mGameGrid,approximateCellSize:e.approximateCellSize,onToggleCell:e.manuallyToggleCell},null,8,["mGameGrid","approximateCellSize","onToggleCell"]),(0,s.Wm)(h,{playing:e.playing,generation:e.mGameGrid.generation,onNextGenerationClicked:e.setNextGeneration,onPreviousGenerationClicked:e.setPreviousGeneration,onPlayOrPauseButtonClicked:e.togglePlaying,onReset:e.reset,onClear:e.clear,onZoomIn:e.zoomIn,onZoomOut:e.zoomOut,onSpeedChanged:e.updateMsBetweenGenerations},null,8,["playing","generation","onNextGenerationClicked","onPreviousGenerationClicked","onPlayOrPauseButtonClicked","onReset","onClear","onZoomIn","onZoomOut","onSpeedChanged"])],64)}function h(e,i,t,n,o,r){const l=(0,s.up)("GridCell");return(0,s.wg)(),(0,s.iD)("div",{id:"game-grid",onMousedown:i[1]||(i[1]=i=>e.setMouseIsDragging(!0)),onMouseup:i[2]||(i[2]=i=>e.setMouseIsDragging(!1))},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.numberOfCellRows,(t=>((0,s.wg)(),(0,s.iD)("div",{key:`row-${t}`,class:"grid-row"},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.numberOfCellCols,(n=>((0,s.wg)(),(0,s.j4)(l,{key:`cell-${t}-${n}`,i:t-Math.floor(e.numberOfCellRows/2),j:n-Math.floor(e.numberOfCellCols/2),isLive:e.cellIsLive(t-Math.floor(e.numberOfCellRows/2),n-Math.floor(e.numberOfCellCols/2)),mouseIsDragging:e.mouseIsDragging,onToggleCell:i[0]||(i[0]=i=>e.$emit("toggleCell",i))},null,8,["i","j","isLive","mouseIsDragging"])))),128))])))),128))],32)}var u=t(7139);function d(e,i,t,n,o,r){return(0,s.wg)(),(0,s.iD)("div",{class:(0,u.C_)(["cell",{live:e.isLive}]),onMousedown:i[0]||(i[0]=(...i)=>e.handleCellClick&&e.handleCellClick(...i)),onMouseenter:i[1]||(i[1]=(...i)=>e.handleMouseEnter&&e.handleMouseEnter(...i))},null,34)}var c=t(2482);class m{constructor(e,i){(0,c.Z)(this,"x",void 0),(0,c.Z)(this,"y",void 0),this.x=e,this.y=i}isNeighbour(e){const i=Math.abs(e.x-this.x),t=Math.abs(e.y-this.y);return i<=1&&t<=1}isSameCell(e){return this.x===e.x&&this.y===e.y}liveNeighbours(e){const i=e.filter((e=>!this.isSameCell(e)));return i.filter((e=>this.isNeighbour(e)))}}class g{constructor(e){(0,c.Z)(this,"liveCells",void 0),(0,c.Z)(this,"generation",void 0),(0,c.Z)(this,"previousGenerations",void 0),this.liveCells=e,this.generation=0,this.previousGenerations=[]}cellIsLive(e){return this.liveCells.some((i=>e.isSameCell(i)))}nextGeneration(){this.previousGenerations.push([...this.liveCells]);const e=this.getLiveCellsWithTwoOrThreeLiveNeighbours(),i=this.getDeadCellsWithThreeLiveNeighbours();this.liveCells=[...e,...i],this.generation++}previousGeneration(){0!==this.previousGenerations.length&&(this.liveCells=this.previousGenerations.pop(),this.generation--)}reset(){0!==this.previousGenerations.length&&(this.liveCells=this.previousGenerations[0],this.resetGenerationHistory())}resetGenerationHistory(){this.generation=0,this.previousGenerations=[]}removeLiveCell(e){this.liveCells=this.liveCells.filter((i=>!i.isSameCell(e)))}addLiveCell(e){this.liveCells.find((i=>i.isSameCell(e)))||this.liveCells.push(e)}getLiveCellsWithTwoOrThreeLiveNeighbours(){const e=[];return this.liveCells.forEach((i=>{const t=i.liveNeighbours(this.liveCells);2!==t.length&&3!==t.length||e.push(i)})),e}getDeadCellsWithThreeLiveNeighbours(){const e=[];return this.liveCells.forEach((i=>{const t=this.getAdjacentDeadCells(i);t.forEach((i=>{const t=i.liveNeighbours(this.liveCells),n=-1===e.findIndex((e=>e.isSameCell(i)));3===t.length&&n&&e.push(i)}))})),e}getAdjacentDeadCells(e){const i=[],t=[-1,0,1];return t.forEach((n=>{t.forEach((t=>{if(0===n&&0===t)return;const o=new m(e.x+n,e.y+t),r=-1===this.liveCells.findIndex((e=>e.isSameCell(o))),l=-1===i.findIndex((e=>e.isSameCell(o)));r&&l&&i.push(o)}))})),i}}var p=(0,s.aZ)({name:"GridCell",props:{i:{type:Number,required:!0},j:{type:Number,required:!0},isLive:{type:Boolean,required:!0},mouseIsDragging:{type:Boolean,required:!0}},methods:{handleCellClick(){this.$emit("toggleCell",new m(this.i,this.j))},handleMouseEnter(){this.mouseIsDragging&&this.handleCellClick()}}}),v=t(89);const f=(0,v.Z)(p,[["render",d]]);var C=f,G=(0,s.aZ)({name:"GameGrid",components:{GridCell:C},props:{mGameGrid:{type:Object,required:!0},approximateCellSize:{type:Number,required:!0}},data(){return{gameGridHeight:null,gameGridWidth:null,mouseIsDragging:!1}},computed:{numberOfCellRows(){if(!this.gameGridHeight)return 0;const e=Math.floor(this.gameGridHeight/this.approximateCellSize);return e},numberOfCellCols(){if(!this.gameGridWidth)return 0;const e=Math.floor(this.gameGridWidth/this.approximateCellSize);return e}},methods:{setGameGridDimensions(){const e=this.$el.getBoundingClientRect();this.gameGridHeight=e.height,this.gameGridWidth=e.width},cellIsLive(e,i){const t=new m(e,i);return this.mGameGrid.cellIsLive(t)},setMouseIsDragging(e){this.mouseIsDragging=e}},mounted(){this.setGameGridDimensions()},created(){window.addEventListener("resize",this.setGameGridDimensions)},unmounted(){window.removeEventListener("resize",this.setGameGridDimensions)}});const w=(0,v.Z)(G,[["render",h]]);var y=w;const b={id:"game-header"},x=(0,s._)("h1",{class:"title"},"Conway's Game of Life",-1);function I(e,i,t,n,o,r){const l=(0,s.up)("RulesPane");return(0,s.wg)(),(0,s.iD)("header",b,[x,(0,s.Wm)(l)])}const S={id:"rules-pane"},k=(0,s.Uk)(" Rules "),O=(0,s.uE)('<p>The <b>Game of Life</b> is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.</p><p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square <i>cells</i>, each of which is in one of two possible states, <i>live</i> or <i>dead</i> (or populated and unpopulated, respectively). Every cell interacts with its eight <i>neighbours</i>, which are the cells that are horizontally, vertically, or diagonally adjacent.</p><p>At each step in time, the following transitions occur:</p><ol><li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li><li>Any live cell with two or three live neighbours lives on to the next generation.</li><li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li><li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li></ol><p>Read more <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">here</a>.</p>',5),_=[O];function z(e,i,t,n,o,r){const l=(0,s.up)("font-awesome-icon");return(0,s.wg)(),(0,s.iD)("div",S,[(0,s._)("button",{class:"dropbtn",onClick:i[0]||(i[0]=(...i)=>e.toggleShow&&e.toggleShow(...i))},[k,(0,s.Wm)(l,{class:(0,u.C_)(["caret",{"rotate-180":e.show}]),icon:["fas","caret-down"]},null,8,["class"])]),(0,s._)("div",{class:(0,u.C_)(["dropdown-content",{show:e.show}])},_,2)])}var D=(0,s.aZ)({name:"RulesPane",data(){return{show:!1}},methods:{toggleShow(){this.show=!this.show}}});const L=(0,v.Z)(D,[["render",z]]);var M=L,W=(0,s.aZ)({name:"GameHeader",components:{RulesPane:M}});const Z=(0,v.Z)(W,[["render",I]]);var N=Z;const j={id:"game-footer"},P={class:"controls"},$={class:"control-group"},B={class:"control-group"},T=["min","max"],H={class:"control-group"},E={class:"control-group"},q={class:"control-group"},R={class:"control"};function A(e,i,t,n,o,r){const l=(0,s.up)("font-awesome-icon");return(0,s.wg)(),(0,s.iD)("footer",j,[(0,s._)("div",P,[(0,s._)("div",$,[(0,s._)("h1",null,[(0,s.Wm)(l,{class:"control control-button",icon:["fas","chevron-left"],onClick:i[0]||(i[0]=i=>e.$emit("previousGenerationClicked"))})]),(0,s._)("h1",null,[e.playing?((0,s.wg)(),(0,s.j4)(l,{key:0,class:"control control-button",icon:["fas","pause"],onClick:i[1]||(i[1]=i=>e.$emit("playOrPauseButtonClicked"))})):((0,s.wg)(),(0,s.j4)(l,{key:1,class:"control control-button",icon:["fas","play"],onClick:i[2]||(i[2]=i=>e.$emit("playOrPauseButtonClicked"))}))]),(0,s._)("h1",null,[(0,s.Wm)(l,{class:"control control-button",icon:["fas","chevron-right"],onClick:i[3]||(i[3]=i=>e.$emit("nextGenerationClicked"))})])]),(0,s._)("div",B,[(0,s._)("input",{type:"range",min:e.minSliderSpeed,max:e.maxSliderSpeed,value:"500",class:"slider",onInput:i[4]||(i[4]=i=>e.handleSliderChange(i.target.value)),id:"speed-slider"},null,40,T)]),(0,s._)("div",H,[(0,s._)("h1",null,[(0,s.Wm)(l,{class:"control control-button",icon:["fas","undo"],onClick:i[5]||(i[5]=i=>e.$emit("reset"))})]),(0,s._)("h1",null,[(0,s.Wm)(l,{class:"control control-button",icon:["fas","trash"],onClick:i[6]||(i[6]=i=>e.$emit("clear"))})])]),(0,s._)("div",E,[(0,s._)("h1",null,[(0,s.Wm)(l,{class:"control control-button",icon:["fas","magnifying-glass-minus"],onClick:i[7]||(i[7]=i=>e.$emit("zoomOut"))})]),(0,s._)("h1",null,[(0,s.Wm)(l,{class:"control control-button",icon:["fas","magnifying-glass-plus"],onClick:i[8]||(i[8]=i=>e.$emit("zoomIn"))})])]),(0,s._)("div",q,[(0,s._)("h1",null,[(0,s._)("div",R,"Generation: "+(0,u.zw)(e.generation),1)])])])])}var F=(0,s.aZ)({name:"GameFooter",props:{playing:{type:Boolean,required:!0},generation:{type:Number,required:!0}},data(){return{maxSliderSpeed:1e3,minSliderSpeed:10}},methods:{handleSliderChange(e){const i=this.maxSliderSpeed-e+this.minSliderSpeed;this.$emit("speedChanged",i)}}});const Y=(0,v.Z)(F,[["render",A]]);var K=Y;class X extends g{constructor(){const e=[new m(0,0),new m(1,-1),new m(1,-2),new m(0,-2),new m(-1,-2)];super(e)}}var J=(0,s.aZ)({name:"App",components:{GameGrid:y,GameHeader:N,GameFooter:K},data(){const e=new X,i=[4,6,10,20,30,50,75];return{playing:!1,msBetweenGenerations:100,mGameGrid:e,nextGenerationInterval:0,approximateCellSizeIndex:4,approximateCellSizeOptions:i}},watch:{playing(e){e?this.nextGenerationInterval=setInterval(this.setNextGeneration,this.msBetweenGenerations):clearInterval(this.nextGenerationInterval)}},computed:{approximateCellSize(){return this.approximateCellSizeOptions[this.approximateCellSizeIndex]}},methods:{togglePlaying(){this.playing=!this.playing},setNextGeneration(){this.mGameGrid.nextGeneration()},setPreviousGeneration(){this.mGameGrid.previousGeneration()},reset(){this.mGameGrid.reset()},clear(){this.mGameGrid=new g([])},zoomIn(){this.approximateCellSizeIndex=Math.min(this.approximateCellSizeIndex+1,this.approximateCellSizeOptions.length-1)},zoomOut(){this.approximateCellSizeIndex=Math.max(this.approximateCellSizeIndex-1,0)},manuallyToggleCell(e){this.mGameGrid.resetGenerationHistory(),this.mGameGrid.cellIsLive(e)?this.mGameGrid.removeLiveCell(e):this.mGameGrid.addLiveCell(e)},updateMsBetweenGenerations(e){this.msBetweenGenerations=e,this.playing&&(clearInterval(this.nextGenerationInterval),this.nextGenerationInterval=setInterval(this.setNextGeneration,this.msBetweenGenerations))}}});const Q=(0,v.Z)(J,[["render",a]]);var U=Q;o.vI.add(l.A35),o.vI.add(l._tD),o.vI.add(l.eW2),o.vI.add(l.zc),o.vI.add(l.XQY),o.vI.add(l.X7o),o.vI.add(l.$aW),o.vI.add(l.q9v),o.vI.add(l.Wq6),(0,n.ri)(U).component("font-awesome-icon",r.GN).mount("#app")}},i={};function t(n){var o=i[n];if(void 0!==o)return o.exports;var r=i[n]={exports:{}};return e[n](r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(i,n,o,r){if(!n){var l=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],r=e[u][2];for(var s=!0,a=0;a<n.length;a++)(!1&r||l>=r)&&Object.keys(t.O).every((function(e){return t.O[e](n[a])}))?n.splice(a--,1):(s=!1,r<l&&(l=r));if(s){e.splice(u--,1);var h=o();void 0!==h&&(i=h)}}return i}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,o,r]}}(),function(){t.n=function(e){var i=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(i,{a:i}),i}}(),function(){t.d=function(e,i){for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)}}(),function(){var e={143:0};t.O.j=function(i){return 0===e[i]};var i=function(i,n){var o,r,l=n[0],s=n[1],a=n[2],h=0;if(l.some((function(i){return 0!==e[i]}))){for(o in s)t.o(s,o)&&(t.m[o]=s[o]);if(a)var u=a(t)}for(i&&i(n);h<l.length;h++)r=l[h],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(u)},n=self["webpackChunkgame_of_life"]=self["webpackChunkgame_of_life"]||[];n.forEach(i.bind(null,0)),n.push=i.bind(null,n.push.bind(n))}();var n=t.O(void 0,[998],(function(){return t(1721)}));n=t.O(n)})();
//# sourceMappingURL=app.e0f62b06.js.map