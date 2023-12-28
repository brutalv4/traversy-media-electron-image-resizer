const form = document.querySelector('#img-form');
const imgInput = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

function loadImage({ target }) {
  const [file] = target.files;
  filename.innerText = file.name;
  form.classList.remove('hidden');
}

imgInput.addEventListener('change', loadImage);
