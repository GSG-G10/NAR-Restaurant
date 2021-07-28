const request = (url, callback, load) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    let loading = true;
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      loading = false;
      load(loading);
      callback(null, data);
    } else if (xhr.readyState != 4) {
      load(loading);
    } else {
      callback("Error");
    }
  };
  xhr.open("GET", url);
  xhr.send();
};
