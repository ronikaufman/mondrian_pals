let contentDiv;
let palettes;
let permutations = [];
let count = 0;

window.onload = function() {
  heap_algo(["#0a0a0a", "#f7f3f2", "#0872db", "#f5d216", "#f43809"], 5)
  contentDiv = document.getElementById("content");
  let myp5 = new p5((sketch) => {
    //palettes = sketch.loadJSON("palettes.json", makePalettes);
    palettes = permutations;
    makePalettes();
  });
};

function makePalettes() {
  for (let i = 0; i < 120; i++) {
    createPalette(palettes[i]);
  }

  //let uselessCanvas = document.getElementById("defaultCanvas0");
  //uselessCanvas.parentNode.removeChild(uselessCanvas);
}

function createPalette(p) {
  let palettep5 = new p5((sketch) => {
    sketch.setup = () => {
      let container = sketch.createDiv();
      container.class("palette");

      let title = sketch.createP("Mondrian " + (++count));
      title.class("palette_name");
      title.parent(container);

      let canvas = sketch.createCanvas(500, 100);
      sketch.noStroke();
      let w = canvas.width/p.length;
      let x = 0;
      for (let c of p) {
        sketch.fill(c);
        sketch.rect(x, 0, w+1, canvas.height);
        x += w;
      }
      sketch.strokeWeight(4);
      sketch.noFill();
      sketch.stroke(255);
      sketch.rect(2, 2, canvas.width-4, canvas.height-4, 0);
      sketch.stroke(0);
      sketch.rect(2, 2, canvas.width-4, canvas.height-4, 4);
      canvas.parent(container);

      let codeString = "[\"";
      for (let c of p) {
        codeString += c + "\", \"";
      }
      codeString = codeString.substring(0, codeString.length-3) + "]";
      let codeP = sketch.createP(codeString);
      codeP.class("code");
      codeP.parent(container);
    };
  }, contentDiv);
}

function heap_algo(word, n) {
  if (n == 1) {
    permutations.push(word);
    return;
  }
  heap_algo(word, n-1);
  for (let i = 0; i < n-1; i++) {
    heap_algo(swap(word, i, n-1), n-1);
  }
}

// Swap the characters at indices i and j (with i<j) in str, and return it
function swap(str, i, j) {
  let a = str[i], b = str[j];
	return str.slice(0, i).concat(b, str.slice(i+1, j), a, str.slice(j+1));
}
