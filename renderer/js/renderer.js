const form = document.querySelector('#img-form');
const imgInput = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

function loadImage() {
  const [file] = imgInput.files;
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

function sendImage(e) {
  e.preventDefault();

  const [file] = imgInput.files;

  if (!file) {
    alertError('Please upload an image');
    return;
  }

  const width = +widthInput.value;
  const height = +heightInput.value;

  if (!width || !height) {
    alertError('Please fill in a height and width');
    return;
  }

  const { path: src } = file;
  const { innerText: dest } = outputPath;
  ipcRenderer.send('image:resize', { src, dest, width, height });
}

ipcRenderer.on('image:done', () => {
  alertSuccess(`Image resized to ${widthInput.value} x ${heightInput.value}`);
});

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'red',
      color: 'white',
      textAlign: 'center',
    },
  });
}

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'green',
      color: 'white',
      textAlign: 'center',
    },
  });
}

imgInput.addEventListener('change', loadImage);
form.addEventListener('submit', sendImage);
