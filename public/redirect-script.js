// This script handles GitHub Pages redirects for SPAs
(function() {
  // Redirect script for Single Page Apps on GitHub Pages
  var pathSegmentsToKeep = 1;
  var redirectLocation = localStorage.getItem('redirect-location');
  
  if (redirectLocation) {
    localStorage.removeItem('redirect-location');
    var hashPath = redirectLocation.replace(/^\//, '');
    window.history.replaceState(null, null, hashPath || '/');
  }
  
  // Handle 404 redirects from GitHub Pages
  var l = window.location;
  if (l.search.match(/^\?\//) && l.pathname.match(/^\/[^\/]+\/?$/)) {
    var decodedSearchPath = l.search.slice(2).split('&').map(function(s) { 
      return s.replace(/~and~/g, '&');
    }).join('?');
    window.history.replaceState(null, null, 
      l.pathname.slice(0, -1) + (decodedSearchPath ? '/' + decodedSearchPath : '') + l.hash
    );
  }
})();