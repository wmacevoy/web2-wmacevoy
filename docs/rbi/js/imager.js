// 'People' -> ['Person',...]
// Person -> DOM,
//        -> State (email, name, etc) 

# 'Maps' -> ['Map']


class Map {
	config(div,id) {
		this.div=div
		this.id=id

	}

	createMapAddBefore(i) {
		const element = document.createElement('button');
		element.innerText = '<+';
		const me = this;
		element.addEventListener('click', (event) => {
			me.add(i);
		});
		return element;
	}

	createMapAddAfter(i) {
		const element = document.createElement('button');
		element.innerText = '+>';
		const me = this;
		element.addEventListener('click', (event) => {
			me.add(i + 1);
		});
		return element;
	}

	createMapRemove(i) {
		const element = document.createElement('button');
		element.innerText = 'x';
		const me = this;
		element.addEventListener('click', (event) => {
			me.remove(i);
		});
		return element;
	}

	mapTextId(i) {
		return this.id + '-map-' + i + '-text';
	}

	createMapText(i) {
		const element = document.createElement('input');
		element.setAttribute('id', this.mapTextId(i));
		element.setAttribute('type', 'text');
		element.setAttribute('size', '3');
		element.setAttribute('maxlength', '3');
		const value = i < this.maps.length ? this.maps[i][0] : "";
		element.setAttribute('value', value);
		const me = this;
		element.addEventListener('change', (event) => {
			me.maps[i][0] = element.value;
			me.onchange();
		});
		if (this.args.debug) {
			console.log('created ' + this.mapTextId(i));
		}
		return element;
	}

	mapColorId(i) {
		return this.id + '-map-' + i + '-color';
	}

	createMapColor(i) {
		const element = document.createElement('input');
		element.setAttribute('id', this.mapColorId(i));
		element.setAttribute('type', 'color');
		const value = i < this.maps.length ? this.maps[i][1] : "";
		element.setAttribute('value', value);
		const me = this;
		element.addEventListener('change', (event) => {
			me.maps[i][1] = element.value;
			me.onchange();
		});
		if (this.args.debug) {
			console.log('created ' + this.mapColorId(i));
		}
		return element;
	}
	add(i) {
		const mapsNode = document.getElementById(this.mapsId());
		const referenceNode = (i < this.maps.length) ? mapsNode.childNodes.item(i) : null;
		this.maps.splice(i, 0, ["", "#000000"]);
		mapsNode.insertBefore(this.createMap(i), referenceNode);
		for (let j = i + 1; j < this.maps.length; ++j) {
			mapsNode.replaceChild(this.createMap(j), mapsNode.childNodes.item(j));
		}
	}

	remove(i) {
		this.maps.splice(i, 1);
		const mapsNode = document.getElementById(this.mapsId());
		for (let j = i; j < this.maps.length; ++j) {
			mapsNode.replaceChild(this.createMap(j), mapsNode.childNodes.item(j));
		}
		mapsNode.removeChild(mapsNode.childNodes.item(this.maps.length));
	}

	mapId(i) {
		return this.id + '-map-' + i;
	}

	createMap(i) {
		const element = document.createElement('div');
		element.classList.add('map');
		element.setAttribute('id', this.mapId(i));
		const addBefore = this.createMapAddBefore(i);
		const addAfter = this.createMapAddAfter(i);
		const remove = this.createMapRemove(i);
		const text = this.createMapText(i);
		const color = this.createMapColor(i);
		element.appendChild(addBefore);
		element.appendChild(text);
		element.appendChild(color);
		element.appendChild(addAfter);
		element.appendChild(remove);
		if (this.args.debug) {
			console.log('created ' + this.mapId(i));
		}
		return element;
	}


	
}

class Imager {


	mapsId() {
		return this.id + '-maps';
	}

	createMaps() {
		const element = document.createElement('div');
		element.setAttribute('id', this.mapsId())
		for (let i = 0; i < this.maps.length; ++i) {
			const map = this.createMap(i);
			element.appendChild(map);
		}
		if (this.args.debug) {
			console.log('created ' + this.mapsId());
		}
		return element;
	}

	nameId() {
		return this.id + '-name';
	}
	get name() {
		return document.getElementById(this.nameId()).value;
	}

	createNameInput() {
		const element = document.createElement('input');
		element.setAttribute('id', this.id + '-name');
		element.setAttribute('name', 'name');
		element.value = this.args.name;
		return element;
	}

	createSave() {
		const element = document.createElement('button');
		element.innerText = 'save';
		const me = this;
		element.addEventListener('click', (event) => {
			me.save();
		});
		return element;
	}

	createLoad() {
		const element = document.createElement('button');
		element.innerText = 'load';
		const me = this;
		element.addEventListener('click', (event) => {
			me.load();
		});
		return element;
	}

	messageId() {
		return this.id + '-message';
	}
	messageElement() {
		return document.getElementById(this.messageId());
	}
	get message() {
		return this.messageElement().innerText;
	}
	set message(value) {
		return this.messageElement().innerText = value;
	}


	createMessage() {
		const element = document.createElement('span');
		element.setAttribute('id', this.messageId());
		return element;
	}

	createName() {
		const element = document.createElement('div');
		element.classList.add("name");
		const input = this.createNameInput();
		const save = this.createSave();
		const load = this.createLoad();
		const message = this.createMessage();
		element.appendChild(input);
		element.appendChild(save);
		element.appendChild(load);
		element.appendChild(message);
		return element;
	}


	createTextarea() {
		const element = document.createElement('textarea');
		element.setAttribute('id', this.id + '-textarea');
		element.value = this.args.text;
		const me = this;
		element.addEventListener('change', (event) => {
			me.onchange();
		});
		return element;
	}

	createCanvas() {
		const element = document.createElement('canvas');
		element.setAttribute('id', this.id + '-canvas');
		element.setAttribute('style', 'border:1px solid');
		return element;
	}

	get textarea() {
		return document.getElementById(this.id + '-textarea');
	}

	get canvas() {
		return document.getElementById(this.id + '-canvas');
	}

	get context() {
		return this.canvas.getContext("2d");
	}

	get text() {
		return this.textarea.value;
	}

	set text(value) {
		this.textarea.value = value;
	}

	get lines() {
		const lines = this.text.split(/\r?\n/);
		for (let row = 0; row < lines.length; ++row) {
			lines[row] = lines[row].trim();
		}
		if (lines.length > 0 && lines[lines.length - 1].length == 0) {
			lines.pop();
		}
		if (this.debug) {
			console.log('lines: ' + lines);
		}
		return lines;
	}

	decode(line) {
		let rest = line;
		let codes = []
		while (rest.length > 0) {
			let matchIndex = -1;
			let matchLength = 0;
			for (let index = 0; index < this.maps.length; ++index) {
				const text = this.maps[index][0];
				if (text.length > 0 &&
					matchLength < text.length &&
					rest.substring(0, text.length) === text) {
					matchIndex = index;
					matchLength = text.length;
				}
			}
			codes.push(matchIndex);
			matchLength = Math.max(matchLength, 1);
			rest = rest.substring(matchLength);
		}

		if (this.debug) {
			console.log('' + line + ' -> ' + codes);
		}

		return codes;
	}

	get codes() {
		const lines = this.lines;
		const codes = new Array(lines.length);
		for (let row = 0; row < lines.length; ++row) {
			codes[row] = this.decode(lines[row])
		}
		if (this.debug) {
			console.log('codes: ' + JSON.stringify(codes));
		}
		return codes;
	}


	onchange() {
		console.log('onchange()')
		const context = this.context;
		const codes = this.codes;
		let rows = codes.length;
		let cols = 0;
		for (let row = 0; row < rows; ++row) {
			cols = Math.max(cols, codes[row].length);
		}

		const dy = Math.floor(context.canvas.height / Math.max(1, rows));
		const dx = Math.floor(context.canvas.width / Math.max(1, cols));
		const maps = this.maps;

		context.canvas.width = context.canvas.width;
		context.font = 0.80 * Math.min(dx, dy) + "px Arial";
		for (let row = 0; row < rows; ++row) {
			for (let col = 0; col < codes[row].length; ++col) {
				const code = codes[row][col];
				if (code >= 0) {
					context.beginPath();
					context.rect(col * dx, row * dy, dx - 1, dy - 1);
					context.fillStyle = maps[code][1];
					context.fill();
					context.fillStyle = "black";
					context.fillText(maps[code][0], (col + 0.1) * dx, (row + 0.9) * dy);
				}
			}
		}
	}

	config(div, id) {
		this.div = div;
		this.id = id;
		this.args = JSON.parse(this.div.getAttribute("data-args"));
		this.debug = this.args.debug
		this.maps = new Array(this.args.maps.length);
		for (let i = 0; i < this.maps.length; ++i) {
			this.maps[i] = [this.args.maps[i][0], tinycolor(this.args.maps[i][1]).toHexString()];
		}

		const name = this.createName();
		const textarea = this.createTextarea();
		const canvas = this.createCanvas();
		const maps = this.createMaps();

		this.div.appendChild(name);
		this.div.appendChild(textarea);
		this.div.appendChild(canvas);
		this.div.appendChild(maps);
		this.div.classList.add("imager");

		console.log('configured ' + this.id)

		this.onchange();
	}

	save() {
		const text = this.text;
		const maps = this.maps;
		const name = this.name;
		const args = { 'name': name, 'text': text, 'maps': maps };
		const argsJSON = JSON.stringify(args);
		window.localStorage.setItem(name, argsJSON);
		this.message = 'saved as ' + name
		console.log("data-args='" + argsJSON + "'");
	}

	load() {
		const name = this.name;
		const stateJSON = window.localStorage.getItem(name);
		if (stateJSON) {
			const state = JSON.parse(stateJSON);
			this.maps = state.maps;
			this.text = state.text;
			this.div.replaceChild(this.createMaps(), document.getElementById(this.mapsId()));
			this.message = '' + name + ' loaded.';
			this.onchange();
		} else {
			this.message = '' + name + ' not found.';
		}
	}
}

$(document).ready(() => {
	const divs = document.getElementsByClassName("imager")
	for (let i = 0; i < divs.length; ++i) {
		const div = divs[i];
		const obj = new Imager();
		obj.config(div, 'imager-' + i)
	}
});
