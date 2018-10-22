(function() {
  'use strict';

  const attachBtn = document.querySelector('#attachFiles'),
    modal = document.querySelector('upload-modal'),
    uploadInfo = document.querySelector('#info'),
    realUploadInput = document.querySelector('input[type="file"]'),
    target = document.querySelector('#progressContainer'),
    uploadTitle = document.querySelector('#uploadTitle');

  let status = {
    'done': 0,
    'progress': 0
  };

  function buildMarkup (file, progressEvent, total) {

    if (total === 100) {
      status.done = status.done + 1;
      if (status.progress > 0){
        status.progress = status.progress - 1
      }
    }

    function formatBytes(bytes,decimals) {
      if (bytes == 0) return '0 Bytes';
      const k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function toggleCheckmark (total) {
      if (total !== 100) {
        return `
            <span>${total}%</span>
        `
      } else {
        return `
            <span>
                <svg focusable="false" class="pe-icon--check-sm-24" role="img">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#check-sm-24"></use>
                </svg>  
            </span>
        `
      }
    }

    modal.dispatchEvent(
      new CustomEvent('xhrLoading', {detail: {done: status.done, progress: status.progress} })
    );

    uploadTitle.innerHTML = `Uploading  (${status.done} done, ${status.progress} in progress)`;
    return `
        <div class="group">
          <div class="indicator">
       	       <progress-ring stroke="3" radius="25" progress=${total}></progress-ring>
       	        ${toggleCheckmark(total)}
          </div>
          <div class="text">
            <strong>${file.name}</strong>
            <p class="info">${formatBytes(progressEvent.loaded)} / ${formatBytes(progressEvent.total)}</p>
          </div>
        </div>
        <div class="upload-actions">
          <button class="pe-icon--btn" aria-label="remove ${file.name} from uploads" onclick>
            <svg focusable="false" class="pe-icon--delete-18" role="img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete-18"></use>
            </svg>
          </button>
        </div>
    `
  }

  function renderProgressItems (data, target, xhr) {

    if (modal.footer !== true) {
      modal.footer = true;
      uploadInfo.style.display = 'block';
    }
    const div = document.createElement('DIV');
    div.classList.add('progress');
    target.appendChild(div);

    xhr(function(event) {
      let percentLoaded = Math.round((event.loaded / event.total) * 100);
      div.innerHTML = buildMarkup(data, event, percentLoaded)

    });
  }

  // highlight function to outline drop area when a file is over area
  function highlight(event) {
    preventDefaults(event);
    dropArea.classList.add('highlight')
  }

  // removes highlight from drop area when file has left area
  function unhighlight(event) {
    preventDefaults(event);
    dropArea.classList.remove('highlight');
  }

  // prevents the file from opening in the browser
  function preventDefaults (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // adds functionality when item is dropped over target
  function handleDrop(event) {
    unhighlight(event);
    let dt = event.dataTransfer;
    let files = dt.files;
    handleFiles(files);
  }

  // takes the files, loops over them, and uploads them
  function handleFiles(files) {
    ([...files]).forEach(uploadFile);
  }

  // processes and uploads files
  function uploadFile(file) {
    const url = 'https://pearson-file-upload.s3.amazonaws.com/',
          xhr = new XMLHttpRequest(),
          formData = new FormData();

    function uploadProgress (callback) {
      status.progress = status.progress + 1
      xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
          callback(event)
        }
      };
    }

    renderProgressItems(file, target, uploadProgress);
    xhr.open('POST', url, true);
    formData.append('key', file.name);
    formData.append('file', file);
    xhr.send(formData);
  }

  // remove item
  target.addEventListener('click', event => {
    preventDefaults(event);
    if (event.target.className === 'pe-icon--btn') {
      status.done = status.done - 1
      uploadTitle.innerHTML = `Uploading  (${status.done} done, ${status.progress} in progress)`;
      event.target.parentNode.parentNode.remove();
      if (target.children.length === 0) {
        uploadInfo.style.display = "none";
        modal.footer = false;
      }
    }
  });


  attachBtn.addEventListener('click', event => {
    realUploadInput.click();
  });

  realUploadInput.addEventListener('change', event=> {
    handleFiles(event.srcElement.files)
  });

  // setup drag and drop area
  let dropArea = document.querySelector('#drop');

  dropArea.addEventListener('dragenter', event => {
   highlight(event)
  });

  dropArea.addEventListener('dragover', event => {
    highlight(event)
  });

  dropArea.addEventListener('dragleave', event => {
    unhighlight(event)
  });

  dropArea.addEventListener('drop', event => {
    handleDrop(event);
  });

})();

