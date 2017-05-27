document.getElementById('loadMore').onclick = function () {
  var input = document.getElementsByClassName('searchForm-input')[0].value


  var url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${input}&prop=info&inprop=url&utf8=&format=json&origin=*&sroffset=&srlimit=15`;

  fetch(url)
  .then(function (response) {
    return response.json()
  })
  .then(json => {
    var results = document.getElementsByClassName('resultsContainer')[0]
    json.query.search.forEach(function(obj) {
      results.innerHTML = `
        ${results.innerHTML}
        <br>
        <span class='snippet'>${obj.snippet}</span>
        <br />
      `
    });
  })
};
