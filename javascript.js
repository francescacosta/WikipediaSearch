var offset = 0;

function loadResults (resetResults) {
  var input = document.getElementsByClassName('searchForm-input')[0].value

  var url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${input}&prop=info&inprop=url&utf8=&format=json&origin=*&sroffset=${offset}&srlimit=15`;

  fetch(url)
  .then(function (response) {
    return response.json()
  })
  .then(json => {
    var results = document.getElementsByClassName('resultsContainer')[0]

    if (resetResults) {
      results.innerHTML = ''
    }

    json.query.search.forEach(function(obj) {
      const url = `https://en.wikipedia.org/wiki/${obj.title.replace(/ /g, "_")}`;

      results.innerHTML = `
        ${results.innerHTML}
        <a href=${url}
           target='_blank'
           class='title'>${obj.title.toUpperCase()}</a>
        <br>
        <span class='snippet'>${obj.snippet}</span>
        <br />
      `

      var load = document.getElementsByClassName('load-more')[0].style.display = "unset"
    });
  })
};


document.getElementsByClassName('search-button')[0].onclick = function () {
  loadResults(true)
  offset = 15;
};

document.getElementsByClassName('load-more')[0].onclick = function () {
  loadResults(false)

  offset += 15;
};
