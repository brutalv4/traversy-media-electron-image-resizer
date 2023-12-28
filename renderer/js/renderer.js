const form = document.querySelector('#img-form');
const imgInput = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

function loadImage({ target }) {
  const [file] = target.files;
  filename.innerText = file.name;

  // Get original dimensions
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = () => {
    widthInput.value = image.width;
    heightInput.value = image.height;
  };

  outputPath.innerText = path.join(os.homedir, 'imageresizer');

  form.classList.remove('hidden');
}

imgInput.addEventListener('change', loadImage);
