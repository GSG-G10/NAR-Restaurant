const request = (url, callback, load) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    let loading = true;

    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        loading = false;
        load(loading);
        callback(null, data);
      } else {
        callback("Error");
      }
    } else {
      load(loading);
    }
  };
  xhr.open("GET", url);
  xhr.send();
};
